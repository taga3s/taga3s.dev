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

const categories = [
  { label: "All", value: undefined, href: "/posts" },
  { label: "Tech", value: "tech", href: "/posts?category=tech" },
  { label: "Weekly", value: "weekly", href: "/posts?category=weekly" },
  { label: "Others", value: "others", href: "/posts?category=others" },
] as const;

const Posts: FC<Props> = ({ posts }) => {
  const c = useRequestContext();
  const category = c.req.query("category");

  return (
    <Section title="Posts">
      <div class={postsWrapper}>
        <ul class={postsCategorySelector}>
          {categories.map((cat) => (
            <li key={cat.label}>
              <a
                href={cat.href}
                class={category === cat.value ? postsCategorySelectorActive : postsCategorySelectorItemInactive}
              >
                {cat.label}
              </a>
            </li>
          ))}
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
