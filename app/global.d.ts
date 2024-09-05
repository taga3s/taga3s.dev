import {} from "hono";

type Head = {
  title?: string;
  publishedAt?: string;
};

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: Head & { frontmatter?: Head; description?: string },
    ): Response | Promise<Response>;
  }
}
