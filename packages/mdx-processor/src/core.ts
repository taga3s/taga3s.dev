import { evaluate } from "@mdx-js/mdx";
import { createElement } from "react";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { highlighter, rehypeShikiFromHighlighter, transformTitle } from "./rehype-shiki/index.ts";

interface Frontmatter {
  title: string;
  description: string;
  category: string[];
  publishedAt: string;
  updatedAt: string;
}

export const convertToHtml = async (raw: string): Promise<{ rawHtml: string; frontmatter: Frontmatter }> => {
  const module = await evaluate(raw, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [rehypeShikiFromHighlighter, highlighter, { theme: "github-dark-default", transformers: [transformTitle()] }],
    ],
  });
  return {
    rawHtml: renderToStaticMarkup(createElement(module.default)),
    frontmatter: module.frontmatter as Frontmatter,
  };
};
