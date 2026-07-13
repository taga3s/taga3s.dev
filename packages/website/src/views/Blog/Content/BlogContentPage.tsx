import { raw } from "hono/html";
import type { FC } from "hono/jsx";
import { BlogContentHeader } from "./BlogContentlHeader";

export const BlogContentPage: FC<{ title: string; rawHtml: string; publishedAt: string; updatedAt: string }> = ({
  title,
  rawHtml,
  publishedAt,
  updatedAt,
}) => {
  return (
    <div>
      <BlogContentHeader title={title} publishedAt={publishedAt} updatedAt={updatedAt} />
      {raw(rawHtml)}
    </div>
  );
};
