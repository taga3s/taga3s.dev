import { Hono } from "hono";
import { cache } from "hono/cache";
import { css, Style } from "hono/css";
import type { FC } from "hono/jsx";
import type { JSX } from "hono/jsx/jsx-runtime";
import { logger } from "hono/logger";
import certification from "./data/certification/data.json";
import photos from "./data/photos/data.json";
import type { IPost, IRawPost } from "./data/posts/model";
import workExperience from "./data/workExperience/data.json";
import { verifyPreview } from "./middlewares/verifyPreview";
import type { ContextSet } from "./type";
import { BlogPage } from "./views/Blog/BlogPage";
import { BlogContentPage } from "./views/Blog/Content/BlogContentPage";
import { HistoryPage } from "./views/History/HistoryPage";
import { Footer } from "./views/shared/Footer";
import { Header } from "./views/shared/Header";
import { TopPage } from "./views/Top/TopPage";

const bodyLayout = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  max-width: 640px;
  min-height: 100vh; 
  margin: 0 auto;
  padding: 16px 20px;
  font-family: "Zen Maru Gothic", sans-serif;
  color: #000000;
  background-color: #ffffff;
  
  > * {
    min-width: 0;
  }
`;

const HTMLLayout: FC<{ children: JSX.Element[]; title: string; description?: string; ogpImage?: string }> = ({
  children,
  title,
  description,
  ogpImage,
}) => {
  const _description = description ?? "taga3s-dev is a personal website of taga3s.";
  const _ogpImage = ogpImage ?? "/ogp.png";
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />

        {/* google fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@3.0.2/destyle.css" />
        <link rel="stylesheet" href="/static/index.css" />
        <link rel="stylesheet" href="/static/markdown.css" />
        <Style />

        <meta property="og:url" content="https://taga3s.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={_description} />
        <meta property="og:site_name" content="taga3s-dev" />
        <meta property="og:image" content={_ogpImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={title} />
        <meta name="twitter:image" content={_ogpImage} />
        <meta name="twitter:description" content={_description} />

        <meta name="description" content={_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes" />
        <title>{title}</title>
      </head>
      <body class={bodyLayout}>{children}</body>
    </html>
  );
};

const app = new Hono<ContextSet>();

app.use(logger());
app.use(verifyPreview());

// TODO: Revise the cache strategy
app.get(
  "*",
  cache({
    cacheName: "taga3s-dev-cache",
    cacheControl: "max-age=3600",
    cacheableStatusCodes: [200, 404],
    vary: ["X-TAGA3S-ENV"], // maybe
  }),
);

app.get("/", (c) => {
  return c.render(
    <HTMLLayout title="taga3s-dev">
      <Header />
      <TopPage photos={photos.content} />
      <Footer />
    </HTMLLayout>,
  );
});

app.get("/history", (c) => {
  return c.render(
    <HTMLLayout title="History - taga3s-dev">
      <Header />
      <HistoryPage workExperience={workExperience.content} certification={certification.content} />
      <Footer />
    </HTMLLayout>,
  );
});

app.get("/blog", async (c) => {
  try {
    const postsJsonPath = c.get("isPreview") ? "blog/preview/outs.json" : "blog/outs.json";
    const rawPostsListJson = await c.env.TAGA3S_DEV_BUCKET.get(postsJsonPath);
    if (!rawPostsListJson) {
      return c.notFound();
    }
    const rawPostsList = await rawPostsListJson.json<Omit<IRawPost, "rawHtml">[]>();

    const posts: Omit<IPost, "rawHtml">[] = rawPostsList
      .map((raw) => ({
        id: raw.id,
        title: raw.title,
        category: raw.category,
        publishedAt: new Date(raw.publishedAt),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : new Date(),
      }))
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    return c.render(
      <HTMLLayout title="Blog - taga3s-dev">
        <Header />
        <BlogPage posts={posts} />
        <Footer />
      </HTMLLayout>,
    );
  } catch (error) {
    console.error(error);
    return c.text("Internal Server Error", 500);
  }
});

app.get("/blog/:name{[a-zA-Z0-9-_]+}", async (c) => {
  const name = c.req.param("name");

  try {
    const blogJsonPath = c.get("isPreview") ? `blog/preview/${name}.json` : `blog/${name}.json`;
    const rawPostJson = await c.env.TAGA3S_DEV_BUCKET.get(blogJsonPath);
    if (!rawPostJson) {
      return c.notFound();
    }
    const rawPost = await rawPostJson.json<IRawPost>();
    const post: IPost = {
      id: rawPost.id,
      title: rawPost.title,
      rawHtml: rawPost.rawHtml,
      category: rawPost.category,
      publishedAt: new Date(rawPost.publishedAt),
      updatedAt: rawPost.updatedAt ? new Date(rawPost.updatedAt) : new Date(),
    };

    return c.render(
      <HTMLLayout
        title={post.title}
        description={post.title}
        ogpImage={`http://taga3s-dev-images.taga3s.workers.dev/api/v1/images/og/${encodeURIComponent(post.title)}`}
      >
        <Header />
        <BlogContentPage
          title={post.title}
          rawHtml={post.rawHtml}
          publishedAt={post.publishedAt}
          updatedAt={post.updatedAt}
        />
        <Footer />
      </HTMLLayout>,
    );
  } catch (error) {
    console.error(error);
    return c.text("Internal Server Error", 500);
  }
});

export default app;
