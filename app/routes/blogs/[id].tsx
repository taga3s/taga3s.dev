import { createRoute } from "honox/factory";
import { ssgParams } from "hono/ssg";

const posts = [
  {
    id: "1",
    title: "Article 1",
  },
  {
    id: "2",
    title: "Article 2",
  },
  {
    id: "3",
    title: "Article 3",
  },
];

const getBlogPosts = async () => {
  return posts;
};

export default createRoute(
  ssgParams(async () => {
    const blogPosts = await getBlogPosts();
    return blogPosts.map((post) => ({ id: post.id }));
  }),
  async (c) => {
    const id = c.req.param("id");
    return c.render(<p>{id}</p>);
  },
);
