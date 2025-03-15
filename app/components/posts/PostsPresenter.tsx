import type { FC } from "hono/jsx";
import { Posts } from "./Posts";
import type { IPost } from "../../api/posts/model";

type Props = {
  posts: IPost[];
};

const PostsPresenter: FC<Props> = ({ posts }) => {
  return <Posts posts={posts} />;
};

export { PostsPresenter };
