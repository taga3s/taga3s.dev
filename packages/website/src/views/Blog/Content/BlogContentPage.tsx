import { raw } from "hono/html";
import type { FC } from "hono/jsx";
import { BlogContentHeader } from "./BlogContentlHeader";

const toDateString = (date: Date) => {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const BlogContentPage: FC<{ title: string; rawHtml: string; publishedAt: Date; updatedAt: Date }> = ({
  title,
  rawHtml,
  publishedAt,
  updatedAt,
}) => {
  return (
    <div>
      <BlogContentHeader title={title} publishedAt={toDateString(publishedAt)} updatedAt={toDateString(updatedAt)} />
      <div class="markdown-body">{raw(rawHtml)}</div>
    </div>
  );
};
