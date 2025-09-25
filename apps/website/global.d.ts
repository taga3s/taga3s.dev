export type Head = {
  title?: string;
  description?: string;
  category?: string;
  publishedAt?: string;
  ogpImage?: string;
};

declare module "hono" {
  type ContextRenderer = (
    content: string | Promise<string>,
    head?: Head & {
      frontmatter?: Head;
    },
  ) => Response | Promise<Response>;
}
