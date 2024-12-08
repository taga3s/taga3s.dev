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
import rehypeMomiji from './app/packages/rehype-momiji'
import remarkMomijiCodeFilename from './app/packages/remark-momiji-filename'
import rehypeMermaid from './app/packages/rehype-mermaid/rehypeMermaid'
import remarkEmojiName from './app/packages/remark-emoji-name'
import { remarkAttentionBlock } from './app/packages/remark-attention-block'
import { rehypeAttentionBlock } from './app/packages/rehype-attention-block'

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
        remarkPlugins: [remarkGfm, remarkBreaks, remarkFrontmatter, remarkMdxFrontmatter, remarkMomijiCodeFilename, remarkEmojiName, remarkAttentionBlock],
        rehypePlugins: [[rehypeMomiji, { excludeLangs: ['mermaid'] }], rehypeMermaid, rehypeAttentionBlock],
      })
    ],
  }
})
