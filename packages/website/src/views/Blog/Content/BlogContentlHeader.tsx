import type { FC } from "hono/jsx";
import {
  blogContentHeaderDate,
  blogContentHeaderDivider,
  blogContentHeaderTitle,
  blogContentHeaderWrapper,
} from "./BlogContentHeader.css";

type Props = {
  title: string;
  publishedAt: string;
  updatedAt: string;
};

const BlogContentHeader: FC<Props> = ({ title, publishedAt, updatedAt }) => {
  return (
    <div class={blogContentHeaderWrapper}>
      <h1 class={blogContentHeaderTitle}>{title}</h1>
      <hr class={blogContentHeaderDivider} />
      <div class={blogContentHeaderDate}>
        <span>
          公開日 <time datetime={publishedAt.replaceAll("/", "-")}>{publishedAt}</time>
        </span>
        {updatedAt && (
          <span>
            更新日 <time datetime={updatedAt.replaceAll("/", "-")}>{updatedAt}</time>
          </span>
        )}
      </div>
    </div>
  );
};

export { BlogContentHeader };
