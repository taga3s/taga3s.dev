import { Hono } from "hono";
import { css, Style } from "hono/css";
import type { FC } from "hono/jsx";
import certification from "./data/certification/data.json";
import photos from "./data/photos/data.json";
import workExperience from "./data/workExperience/data.json";
import { HistoryPage } from "./views/History/HistoryPage";
import { PostsPage } from "./views/Posts/PostsPage";
import { Footer } from "./views/shared/Footer";
import { Header } from "./views/shared/Header";
import { TopPage } from "./views/Top/TopPage";
import { verifyPreview } from "./middlewares/verify-preview";
import { JSX } from "hono/jsx/jsx-runtime";

const app = new Hono();

const htmlLayout = css`
  :has(#photo-with-mask) {
    overflow: hidden;
  }
`;

const bodyLayout = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  max-width: 700px;
  min-height: 100vh; 
  margin: 0 auto;
  padding: 16px 20px;
  font-family: "Zen Kaku Gothic New", sans-serif;
  color: #000000;
  background-color: #FCFAF2;
  
  > * {
    min-width: 0;
  }
`;

const HTMLLayout: FC<{ children: JSX.Element[], title: string }> = ({ children, title }) => {
  return (
    <html lang="ja" class={htmlLayout}>
      <head>
        <meta charset="UTF-8" />

        {/* google fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@3.0.2/destyle.css" />
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

app.use(verifyPreview);

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

app.get("/posts", (c) => {
  const rawPosts = import.meta.glob<{ frontmatter: Head }>("../data/posts/*.mdx", {
    eager: true,
  });

  const category = c.req.query("category") ?? "all";

  const posts = Object.entries(rawPosts)
    .map(([id, module]) => ({
      id: id.replace(/\.mdx$/, ""),
      title: module.frontmatter.title ?? "",
      category: module.frontmatter.category ?? "",
      updatedAt: module.frontmatter.updatedAt ? new Date(module.frontmatter.updatedAt) : new Date(),
      publishedAt: module.frontmatter.publishedAt ? new Date(module.frontmatter.publishedAt) : new Date(),
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const categorizedPosts = category === "all" ? posts : posts.filter((post) => post.category === category);

  return c.render(
    <HTMLLayout title="Posts - taga3s-dev">
      <Header />
      <PostsPage posts={categorizedPosts} />
      <Footer />
    </HTMLLayout>,
  );
});

export default app;
