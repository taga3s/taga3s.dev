import type { FC } from "hono/jsx";
import type { IPost } from "../../data/posts/model";
import { Section } from "../shared/Section";
import { blogItem, blogItemTitle, blogList, blogWrapper } from "./Blog.css";

type Props = {
  posts: Omit<IPost, "rawHtml">[];
};

export const Blog: FC<Props> = ({ posts }) => {
  return (
    <Section title="blog">
      <div class={blogWrapper}>
        <div class={blogList}>{posts.map(converter)}</div>
      </div>
    </Section>
  );
};

const converter = (post: Omit<IPost, "rawHtml">) => {
  const publishedAt = post.publishedAt.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <a key={post.id} href={`/blog/${post.id}`} class={blogItem}>
      <time datetime={publishedAt.replaceAll("/", "-")}>{publishedAt}</time>
      <span class={blogItemTitle}>{post.title}</span>
    </a>
  );
};
