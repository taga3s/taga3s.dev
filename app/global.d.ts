import {} from "hono";

type Head = {
  title?: string;
  category?: string;
  publishedAt?: string;
  ogpImage?: string;
};

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: Head & { frontmatter?: Head; description?: string; ogpImage?: string },
    ): Response | Promise<Response>;
  }
}
