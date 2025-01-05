/// <reference types="vitest" />

import pages from '@hono/vite-cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup';
import remarkBreaks from 'remark-breaks';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm'
import { rehypeMomiji } from './app/packages/rehype-momiji'
import { remarkMomijiTitle } from './app/packages/remark-momiji-title'
import { rehypeMermaid } from './app/packages/rehype-mermaid/rehypeMermaid'
import { remarkAttentionBlock } from './app/packages/remark-attention-block'
import { rehypeAttentionBlock } from './app/packages/rehype-attention-block'
import { defineConfig } from "vitest/config"

export default defineConfig({
    build: {
      emptyOutDir: false,
    },
    test: {
      globals: true,
    },
    plugins: [
      honox({ devServer: { adapter } }), 
      pages(), 
      ssg({ entry: "./app/server.ts" }), 
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkGfm, remarkBreaks, remarkFrontmatter, remarkMdxFrontmatter, remarkMomijiTitle, remarkAttentionBlock],
        rehypePlugins: [[rehypeMomiji, { excludeLangs: ['mermaid'] }], rehypeMermaid, rehypeAttentionBlock],
      })
    ],
})
