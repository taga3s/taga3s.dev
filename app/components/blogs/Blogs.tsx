import type { FC } from "hono/jsx";
import type { Blog } from "../../api/blogs/model";
import { Section } from "../Section";
import { blogs } from "./Blogs.css";

type Props = {
  blogPosts: Blog[];
};

const Blogs: FC<Props> = ({ blogPosts }) => {
  return (
    <Section title="Blogs">
      <div class={blogs.wrapper}>
        {blogPosts.map((post) => {
          return (
            <a key={post.id} href={`/blogs/${post.id}`} class={blogs.item}>
              <span class={blogs.itemTitle}>{post.title}</span>
              <p>説明です。</p>
            </a>
          );
        })}
      </div>
    </Section>
  );
};

export { Blogs };
