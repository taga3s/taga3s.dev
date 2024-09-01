import type { FC } from "hono/jsx";
import { Posts } from "./Posts";
import type { Post } from "../../api/posts/model";

type Props = {
  posts: Post[];
};

const PostsPresenter: FC<Props> = ({ posts }) => {
  return <Posts posts={posts} />;
};

export { PostsPresenter };
