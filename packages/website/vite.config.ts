/// <reference types="vite-plus/test" />

import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import puppeteer, { type LaunchOptions } from "puppeteer";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { PluginOption } from "vite-plus";
import { defineConfig } from "vite-plus";
import { rehypeMermaid } from "./app/packages/rehype-mermaid/rehypeMermaid";
import { highlighter, rehypeShikiFromHighlighter, transformTitle } from "./app/packages/rehype-shiki";

const puppetteerOptions: LaunchOptions = {
  // path exists in ubuntu on GHA
  ...(process.env.CI && {
    executablePath: "/usr/bin/google-chrome-stable",
  }),
  headless: true,
};

const browser = await puppeteer.launch(puppetteerOptions);

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
