import pages from '@hono/vite-cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup';
import remarkBreaks from 'remark-breaks';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm'
import rehypeMomiji from './app/packages/rehype-momiji/rehypeMomiji'
import remarkMomijiCodeFilename from './app/packages/remark-momiji/remarkMomijiCodeFilename'

export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: false,
    },
    plugins: [
      honox({ devServer: { adapter } }), 
      pages(), 
      ssg({ entry: "./app/server.ts" }), 
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkGfm, remarkBreaks, remarkFrontmatter, remarkMdxFrontmatter, remarkMomijiCodeFilename],
        rehypePlugins: [rehypeMomiji]
      })
    ],
  }
})
