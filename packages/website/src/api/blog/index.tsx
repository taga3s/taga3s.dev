import { Hono } from "hono";
import { ContextSet } from "../../type";
import type { IPost, IRawPost } from "../../data/posts/model";
import { BlogPage } from "../../views/Blog/BlogPage";
import { BlogContentPage } from "../../views/Blog/Content/BlogContentPage";
import { Footer } from "../../views/shared/Footer";
import { Header } from "../../views/shared/Header";
import { HTMLLayout } from "../../views/shared/HTMLLayout";

export const blogRoutes = new Hono<ContextSet>();

blogRoutes.get("/", async (c) => {
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

blogRoutes.get("/:name{[a-zA-Z0-9-_]+}", async (c) => {
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
        ogpImage={`/resources/images/blog/og/${encodeURIComponent(post.title)}`}
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
