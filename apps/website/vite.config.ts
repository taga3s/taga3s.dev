/// <reference types="vitest" />

import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vitest/config";
import { rehypeAttentionBlock } from "./app/packages/rehype-attention-block";
import { rehypeMermaid } from "./app/packages/rehype-mermaid/rehypeMermaid";
import { rehypeMomiji } from "./app/packages/rehype-momiji";
import { remarkAttentionBlock } from "./app/packages/remark-attention-block";
import { remarkMomijiTitle } from "./app/packages/remark-momiji-title";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    honox({ devServer: { adapter } }),
    build(),
    mdx({
      jsxImportSource: "hono/jsx",
      remarkPlugins: [
        remarkGfm,
        remarkBreaks,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkMomijiTitle,
        remarkAttentionBlock,
      ],
      rehypePlugins: [[rehypeMomiji, { excludeLangs: ["mermaid"] }], rehypeMermaid, rehypeAttentionBlock],
    }),
  ],
});
