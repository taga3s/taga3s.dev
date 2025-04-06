import { createRoute } from "honox/factory";
import type { Head } from "../global";
import { presenter } from "../components/Presenter.css";
import { Posts } from "../components/posts/Posts";

export default createRoute(async (c) => {
  const rawPosts = import.meta.glob<{ frontmatter: Head }>("./posts/*.mdx", {
    eager: true,
  });

  const category = c.req.query("category") ?? "all";

  const posts = Object.entries(rawPosts)
    .map(([id, module]) => ({
      id: id.replace(/\.mdx$/, ""),
      title: module.frontmatter.title ?? "",
      category: module.frontmatter.category ?? "",
      publishedAt: module.frontmatter.publishedAt ? new Date(module.frontmatter.publishedAt) : new Date(),
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const categorizedPosts = category === "all" ? posts : posts.filter((post) => post.category === category);

  return c.render(
    <div class={presenter}>
      <Posts posts={categorizedPosts} />
    </div>,
  );
});
