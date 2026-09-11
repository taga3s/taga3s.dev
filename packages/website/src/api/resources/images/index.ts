import { Context, Hono } from "hono";
import { generateOGImage } from "./packages/og/generate";
import { ContextSet } from "../../../type";

export const imagesRoutes = new Hono<ContextSet>();

const getImageByKey = async (c: Context<ContextSet>, key: string): Promise<Response> => {
  try {
    const object = await c.env.TAGA3S_DEV_BUCKET.get(`images/${key}`);
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
};

imagesRoutes.get("/favorites/:key", async (c) => getImageByKey(c, `favorites/${c.req.param("key")}`));

imagesRoutes.get("/blog/:key", async (c) => getImageByKey(c, `blog/${c.req.param("key")}`));
