import { createRoute } from "honox/factory";
import { PostsPresenter } from "../components/posts/PostsPresenter";

export type Meta = {
  title: string;
  publishedAt: string;
  ogpImage?: string;
};

export default createRoute(async (c) => {
  const rawPosts = import.meta.glob<{ frontmatter: Meta }>("./posts/*.mdx", {
    eager: true,
  });
  const posts = Object.entries(rawPosts)
    .map(([id, module]) => ({
      id: id.replace(/\.mdx$/, ""),
      title: module.frontmatter.title ?? "",
      publishedAt: new Date(module.frontmatter.publishedAt) ?? "",
      ogpImage: module.frontmatter.ogpImage,
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  return c.render(<PostsPresenter posts={posts} />);
});
