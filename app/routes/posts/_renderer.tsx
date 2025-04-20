import { jsxRenderer } from "hono/jsx-renderer";
import { PostDetailHeader } from "../../components/posts/detail/PostDetailHeader";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  const _title = frontmatter?.title ?? "";
  const _description = frontmatter?.description ?? "";
  const _publishedAt = frontmatter?.publishedAt ?? "";
  const _ogpImage = `https://taga3s.dev/${frontmatter?.ogpImage ?? "ogp-image.png"}`;

  return (
    <Layout title={_title} description={_description} ogpImage={_ogpImage}>
      <PostDetailHeader title={_title} publishedAt={_publishedAt} />
      <article class="markdown-body">{children}</article>
    </Layout>
  );
});
