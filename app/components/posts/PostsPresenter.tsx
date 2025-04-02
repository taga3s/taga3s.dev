import type { FC } from "hono/jsx";
import { Posts } from "./Posts";
import type { IPost } from "../../api/posts/model";
import { presenter } from "../Presenter.css";

type Props = {
  posts: IPost[];
};

const PostsPresenter: FC<Props> = ({ posts }) => {
  return (
    <div class={presenter}>
      <Posts posts={posts} />
    </div>
  );
};

export { PostsPresenter };
