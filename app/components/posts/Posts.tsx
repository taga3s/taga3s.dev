import type { FC } from "hono/jsx";
import type { Post } from "../../api/posts/model";
import { Section } from "../Section";
import { postsStyle } from "./Posts.css";

type Props = {
  posts: Post[];
};

const Posts: FC<Props> = ({ posts }) => {
  return (
    <Section title="Posts">
      <div class={postsStyle.wrapper}>
        {posts.map((post) => {
          return (
            <a key={post.id} href={`/${post.id}`} class={postsStyle.item}>
              <span>{post.publishedAt}</span>
              <span class={postsStyle.itemTitle}>{post.title}</span>
            </a>
          );
        })}
      </div>
    </Section>
  );
};

export { Posts };
