import type { FC } from "hono/jsx";
import { Blogs } from "./Blogs";
import type { Blog } from "../../api/blogs/model";

type Props = {
  blogPosts: Blog[];
};

const BlogsPresenter: FC<Props> = ({ blogPosts }) => {
  return <Blogs blogPosts={blogPosts} />;
};

export { BlogsPresenter };
