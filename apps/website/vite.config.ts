/// <reference types="vitest" />

import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import honox from "honox/vite";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vitest/config";
import { rehypeMermaid } from "./app/packages/rehype-mermaid/rehypeMermaid";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    honox({ devServer: { adapter } }),
    build(),
    mdx({
      jsxImportSource: "hono/jsx",
      remarkPlugins: [remarkGfm, remarkBreaks, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        rehypeMermaid,
        [
          rehypeShiki,
          {
            theme: "github-dark-default",
          },
        ],
      ],
    }),
  ],
});
