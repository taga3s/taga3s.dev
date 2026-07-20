import { Hono } from "hono";
import { verifyPreview } from "./middlewares/verifyPreview";
import { generateOGImage } from "./packages/og/generate";
import type { ContextSet } from "./type";

export const v1 = new Hono<ContextSet>();

v1.use(verifyPreview());

v1.get("/blog", async (c) => {
  const outsJsonPath = c.get("isPreview") ? "blog/preview/outs.json" : "blog/outs.json";
  const object = await c.env.TAGA3S_DEV_BUCKET.get(outsJsonPath);
  if (!object) {
    return c.notFound();
  }

  const body = await object.arrayBuffer();

  return c.body(body, 200, {
    "Content-Type": "application/json",
  });
});

v1.get("/images/*", async (c, next) => {
  const cacheKey = c.req.url;

  const cache = caches.default;

  const cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  await next();

  if (!c.res.ok) {
    return;
  }

  // Cache /images/* for 30 minutes
  c.header("Cache-Control", "s-maxage=1800");

  const res = c.res.clone();
  c.executionCtx.waitUntil(cache.put(cacheKey, res));
});

v1.get("/images/favorites/:key", async (c) => {
  const object = await c.env.TAGA3S_DEV_BUCKET.get(`images/favorites/${c.req.param("key")}`);
  if (!object) {
    return c.notFound();
  }

  const body = await object.arrayBuffer();
  return c.body(body, 200, {
    "Content-Type": object.httpMetadata?.contentType ?? "image/jpeg",
  });
});

v1.get("/images/og/:title", async (c) => {
  const title = c.req.param("title");
  if (!title) {
    return c.notFound();
  }

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
});
