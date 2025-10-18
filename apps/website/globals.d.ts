declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props?: Head & {
        frontmatter?: Head;
      },
    ): Response;
  }
}

declare global {
  interface Head {
    title?: string;
    description?: string;
    category?: string;
    publishedAt?: string;
    ogpImage?: string;
  }
}

export {};
