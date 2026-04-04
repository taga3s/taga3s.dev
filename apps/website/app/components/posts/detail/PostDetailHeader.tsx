import type { FC } from "hono/jsx";
import {
  postDetailHeaderDate,
  postDetailHeaderDivider,
  postDetailHeaderTitle,
  postDetailHeaderWrapper,
} from "./PostDetailHeader.css";

type Props = {
  title: string;
  publishedAt: string;
  updatedAt: string;
};

const PostDetailHeader: FC<Props> = ({ title, publishedAt, updatedAt }) => {
  return (
    <div class={postDetailHeaderWrapper}>
      <h1 class={postDetailHeaderTitle}>{title}</h1>
      <hr class={postDetailHeaderDivider} />
      <div class={postDetailHeaderDate}>
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

export { PostDetailHeader };
