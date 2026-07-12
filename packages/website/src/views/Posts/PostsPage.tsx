import type { FC } from "hono/jsx";
import type { IPost } from "../../data/posts/model";
import { presenter } from "../shared/Presenter.css";
import { Posts } from "./Posts";

export const PostsPage: FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <div class={presenter}>
      <Posts posts={posts} />
    </div>
  );
};
