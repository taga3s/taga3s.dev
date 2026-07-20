import { Hono } from "hono";
import { cache } from "hono/cache";
import { generateOGImage } from "./packages/og/generate";
import type { ContextSet } from "./types";

export const imagesRoutes = new Hono<ContextSet>();

imagesRoutes.use(
  cache({
    cacheName: "images-cache",
    cacheControl: "s-maxage=3600",
    cacheableStatusCodes: [200],
  }),
);

imagesRoutes.get("/favorites/:key", async (c) => {
  try {
    const object = await c.env.TAGA3S_DEV_BUCKET.get(`images/favorites/${c.req.param("key")}`);
    if (!object) {
      return c.notFound();
    }

    const body = await object.arrayBuffer();
    return c.body(body, 200, {
      "Content-Type": object.httpMetadata?.contentType ?? "image/jpeg",
    });
  } catch (error) {
    console.error(error);
    return c.text("Internal Server Error", 500);
  }
});

imagesRoutes.get("/og/:title", async (c) => {
  const title = c.req.param("title");
  if (!title) {
    return c.notFound();
  }

  try {
    const object = await c.env.TAGA3S_DEV_BUCKET.get(`images/og/${title}`);
    if (object) {
      const body = await object.arrayBuffer();
      return c.body(body, 200, {
        "Content-Type": object.httpMetadata?.contentType ?? "image/png",
      });
    }

    const buffer = await generateOGImage(title);
    await c.env.TAGA3S_DEV_BUCKET.put(`images/og/${title}`, buffer, {
      httpMetadata: {
        contentType: "image/png",
      },
    });

    return c.body(buffer, 200, {
      "Content-Type": "image/png",
    });
  } catch (error) {
    console.error(error);
    return c.text("Internal Server Error", 500);
  }
});
