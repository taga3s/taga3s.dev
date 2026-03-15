/// <reference types="vitest" />

import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import puppeteer from "puppeteer";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { PluginOption } from "vite";
import { defineConfig } from "vitest/config";
import { rehypeMermaid } from "./app/packages/rehype-mermaid/rehypeMermaid";
import { highlighter, rehypeShikiFromHighlighter, transformTitle } from "./app/packages/rehype-shiki";

const browser = await puppeteer.launch({
  headless: true,
});

const handlePuppeteerBrowser = (): PluginOption => ({
  name: "handle-puppeteer-browser",
  closeBundle() {
    browser.close();
  },
});

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    honox({ devServer: { adapter } }),
    build(),
    handlePuppeteerBrowser(),
    mdx({
      jsxImportSource: "hono/jsx",
      remarkPlugins: [remarkGfm, remarkBreaks, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [rehypeMermaid, { browser }],
        [rehypeShikiFromHighlighter, highlighter, { theme: "github-dark-default", transformers: [transformTitle()] }],
      ],
    }),
  ],
});
