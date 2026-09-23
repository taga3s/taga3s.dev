import { WorkerEntrypoint } from "cloudflare:workers";
import { createOgp } from "./create-ogp";
import { Undefinable } from "./types";
import { createAtom } from "./create-atom";
import { validateBlogOut } from "./validate";

interface Env {
  TAGA3S_DEV_BUCKET: R2Bucket;
}

interface OutGenerateOGP {
  blogUrls: string[];
}

const R2_BASE_KEY = "images/og";
const BLOG_BASE_URL = "https://taga3s.dev/blog";

export class OGPEntrypoint extends WorkerEntrypoint<Env> {
  async generate(): Promise<Undefinable<OutGenerateOGP>> {
    try {
      const rawBlogOuts = await this.env.TAGA3S_DEV_BUCKET.get("blog/outs.json");
      if (!rawBlogOuts) {
        return;
      }

      const blogOuts = validateBlogOut(await rawBlogOuts.json());
      if (!blogOuts) {
        return;
      }

      const blogUrls: string[] = [];

      for (const item of blogOuts) {
        const ogp = await createOgp(this.ctx, item.title);
        if (ogp) {
          const key = `${R2_BASE_KEY}/${item.id}.png`;
          if (await this.env.TAGA3S_DEV_BUCKET.head(key)) {
            console.log(`${key} already exists, skip generating.`);
            continue;
          }

          await this.env.TAGA3S_DEV_BUCKET.put(key, ogp, {
            httpMetadata: { contentType: "image/png" },
          });

          blogUrls.push(`${BLOG_BASE_URL}/${item.id}`);
          console.log("Successfuly uploaded OGP Image to R2");
        }
      }

      return { blogUrls };
    } catch (error) {
      console.error("Something went wrong while generating OGP", error);
    }
  }
}

export class RSSEntrypoint extends WorkerEntrypoint<Env> {
  async generate(): Promise<Undefinable<void>> {
    try {
      const rawBlogOuts = await this.env.TAGA3S_DEV_BUCKET.get("blog/outs.json");
      if (!rawBlogOuts) {
        return;
      }

      const blogOuts = validateBlogOut(await rawBlogOuts.json());
      if (!blogOuts) {
        return;
      }

      const atomRss = createAtom(blogOuts);
      await this.env.TAGA3S_DEV_BUCKET.put("atom.xml", atomRss);
      console.log("Successfuly uploaded atom.xml to R2");
    } catch (error) {
      console.error("Something went wrong while generating atom rss", error);
    }
  }
}

export default class extends WorkerEntrypoint<Env> {
  async fetch() {
    return new Response(JSON.stringify({ health: "ok" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
