import type { FC } from "hono/jsx";
import { postDetailHeaderDivider, postDetailHeaderTitle, postDetailHeaderWrapper } from "./PostDetailHeader.css";

type Props = {
  title: string;
  publishedAt: string;
};

const PostDetailHeader: FC<Props> = ({ title, publishedAt }) => {
  return (
    <div class={postDetailHeaderWrapper}>
      <h1 class={postDetailHeaderTitle}>{title}</h1>
      <hr class={postDetailHeaderDivider} />
      <time>
        <span>Posted at </span>
        {publishedAt}
      </time>
    </div>
  );
};

export { PostDetailHeader };
