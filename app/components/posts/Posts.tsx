import type { FC } from "hono/jsx";
import type { Post } from "../../api/posts/model";
import { Section } from "../Section";
import {
  postsCategorySelector,
  postsCategorySelectorItem,
  postsItem,
  postsItemTitle,
  postsList,
  postsWrapper,
} from "./Posts.css";

type Props = {
  posts: Post[];
};

const Posts: FC<Props> = ({ posts }) => {
  return (
    <Section title="Posts">
      <div class={postsWrapper}>
        <ul class={postsCategorySelector}>
          <li>
            <a href="/posts" class={postsCategorySelectorItem}>
              All
            </a>
          </li>
          <li>
            <a href="/posts?category=tech" class={postsCategorySelectorItem}>
              Tech
            </a>
          </li>
          <li>
            <a href="/posts?category=weekly" class={postsCategorySelectorItem}>
              Weekly
            </a>
          </li>
        </ul>
        <div class={postsList}>
          {posts.map((post) => {
            const publishedAt = post.publishedAt.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            return (
              <a key={post.id} href={`/${post.id}`} class={postsItem}>
                <time datetime={publishedAt}>{publishedAt}</time>
                <span class={postsItemTitle}>{post.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export { Posts };
