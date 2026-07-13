import { raw } from "hono/html";
import type { FC } from "hono/jsx";
import { BlogContentHeader } from "./BlogContentlHeader";

export const BlogContentPage: FC<{ title: string; rawHtml: string; publishedAt: Date; updatedAt: Date }> = ({
  title,
  rawHtml,
  publishedAt,
  updatedAt,
}) => {
  return (
    <div>
      <BlogContentHeader title={title} publishedAt={publishedAt.toISOString()} updatedAt={updatedAt.toISOString()} />
      <div class="markdown-body">{raw(rawHtml)}</div>
    </div>
  );
};
