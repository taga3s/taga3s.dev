import { jsxRenderer } from "hono/jsx-renderer";
import { PostDetailHeader } from "../../components/posts/detail/PostDetailHeader";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  const _title = frontmatter?.title ?? "";
  const _description = frontmatter?.description ?? "";
  const _publishedAt = frontmatter?.publishedAt ?? "";
  const _ogpImage =
    !frontmatter?.ogpImage && frontmatter?.title
      ? `http://taga3s-dev-images.taga3s.workers.dev/api/v1/images/og/${encodeURIComponent(frontmatter.title)}`
      : "https://taga3s.dev/ogp-image.png";

  return (
    <Layout title={_title} description={_description} ogpImage={_ogpImage}>
      <PostDetailHeader title={_title} publishedAt={_publishedAt} />
      <article class="markdown-body">{children}</article>
    </Layout>
  );
});
