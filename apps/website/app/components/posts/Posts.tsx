import type { FC } from "hono/jsx";
import type { IPost } from "../../data/posts/model";
import { Section } from "../Section";
import {
  postsCategorySelector,
  postsCategorySelectorActive,
  postsCategorySelectorItemInactive,
  postsItem,
  postsItemTitle,
  postsList,
  postsWrapper,
} from "./Posts.css";
import { useRequestContext } from "hono/jsx-renderer";

type Props = {
  posts: IPost[];
};

const Posts: FC<Props> = ({ posts }) => {
  const c = useRequestContext();
  const category = c.req.query("category");

  return (
    <Section title="Posts">
      <div class={postsWrapper}>
        <ul class={postsCategorySelector}>
          <li>
            <a
              href="/posts"
              class={category === undefined ? postsCategorySelectorActive : postsCategorySelectorItemInactive}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="/posts?category=tech"
              class={category === "tech" ? postsCategorySelectorActive : postsCategorySelectorItemInactive}
            >
              Tech
            </a>
          </li>
          <li>
            <a
              href="/posts?category=weekly"
              class={category === "weekly" ? postsCategorySelectorActive : postsCategorySelectorItemInactive}
            >
              Weekly
            </a>
          </li>
          <li>
            <a
              href="/posts?category=others"
              class={category === "others" ? postsCategorySelectorActive : postsCategorySelectorItemInactive}
            >
              Others
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
                <time datetime={publishedAt.replaceAll("/", "-")}>{publishedAt}</time>
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
