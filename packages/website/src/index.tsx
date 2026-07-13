import { Hono } from "hono";
import { css, Style } from "hono/css";
import type { FC } from "hono/jsx";
import type { JSX } from "hono/jsx/jsx-runtime";
import { logger } from "hono/logger";
import certification from "./data/certification/data.json";
import photos from "./data/photos/data.json";
import type { IPost } from "./data/posts/model";
import workExperience from "./data/workExperience/data.json";
import { verifyPreview } from "./middlewares/verify-preview";
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

const HTMLLayout: FC<{ children: JSX.Element[]; title: string }> = ({ children, title }) => {
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
        <link rel="stylesheet" href="/static/remark-plugins.css" />
        <Style />

        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes" />
        <title>{title}</title>
      </head>
      <body class={bodyLayout}>{children}</body>
    </html>
  );
};

const app = new Hono();

app.use(logger());
app.use(verifyPreview());

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

app.get("/blog", (c) => {
  // FIXME: sample
  const rawPostsList = [
    {
      id: "2026",
      title: "2026 目標",
      category: ["others"],
      updatedAt: "",
      publishedAt: "2026/04/05",
    },
  ];

  const posts: IPost[] = rawPostsList
    .map((raw) => ({
      id: raw.id,
      title: raw.title ?? "",
      category: raw.category ?? "",
      updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : new Date(),
      publishedAt: raw.publishedAt ? new Date(raw.publishedAt) : new Date(),
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  return c.render(
    <HTMLLayout title="Blog - taga3s-dev">
      <Header />
      <BlogPage posts={posts} />
      <Footer />
    </HTMLLayout>,
  );
});

app.get("/blog/:id", (c) => {
  const id = c.req.param("id");

  const rawPosts = [
    {
      id: "2026",
      title: "2026 目標",
      category: ["others"],
      rawHtml: "<p>本文</p>",
      updatedAt: "",
      publishedAt: "2026/04/05",
    },
  ];

  const post = rawPosts.find((raw) => raw.id === id);
  if (!post) {
    return c.notFound();
  }

  return c.render(
    <HTMLLayout title="Blog - taga3s-dev">
      <Header />
      <BlogContentPage
        title={post.title}
        rawHtml={post.rawHtml}
        updatedAt={post.updatedAt}
        publishedAt={post.publishedAt}
      />
      <Footer />
    </HTMLLayout>,
  );
});

export default app;
