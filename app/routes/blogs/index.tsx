import { createRoute } from "honox/factory";
import { BlogsPresenter } from "../../components/blogs/BlogsPresenter";

const posts = [
  {
    id: 1,
    title: "Article 1",
  },
  {
    id: 2,
    title: "Article 2",
  },
  {
    id: 3,
    title: "Article 3",
  },
];

const getBlogPosts = async () => {
  return posts;
};

export default createRoute(async (c) => {
  const blogsPosts = await getBlogPosts();
  return c.render(<BlogsPresenter blogPosts={blogsPosts} />);
});
