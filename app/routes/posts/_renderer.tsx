import { jsxRenderer } from "hono/jsx-renderer";
import { PostDetailHeader } from "../../components/posts/detail/PostDetailHeader";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  return (
    <Layout title={frontmatter?.title}>
      <PostDetailHeader title={frontmatter?.title ?? ""} publishedAt={frontmatter?.publishedAt ?? ""} />
      <article class="markdown-body">{children}</article>
    </Layout>
  );
});
