import type { FC } from "hono/jsx";
import type { IPost } from "../../data/posts/model";
import { presenter } from "../shared/Presenter.css";
import { Blog } from "./Blog";

export const BlogPage: FC<{ posts: Omit<IPost, "rawHtml">[] }> = ({ posts }) => {
  return (
    <div class={presenter}>
      <Blog posts={posts} />
    </div>
  );
};
