import { WorkerEntrypoint } from "cloudflare:workers";
import { createOgp } from "./create-ogp";
import { BlogOutItem, Env, OutGenerate, Undefinable } from "./types";

const R2_BASE_KEY = "images/blog/og";
const OGP_RESOURCES_BASE_URL = "https://taga3s.dev/resources";

export default class extends WorkerEntrypoint<Env> {
  async fetch() {
    const generated = await this.generate();
    console.log(generated);

    return new Response(JSON.stringify({ health: "ok" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async generate(): Promise<Undefinable<OutGenerate>> {
    const rawBlogOuts = await this.env.TAGA3S_DEV_BUCKET.get("blog/outs.json");
    if (!rawBlogOuts) {
      return;
    }

    const blogOuts = (await rawBlogOuts.json()) as BlogOutItem[];
    const generatedOGPUrls: string[] = [];

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
        generatedOGPUrls.push(`${OGP_RESOURCES_BASE_URL}/${key}`);
        console.log("Successfuly uploaded OGP Image to R2");
      }
    }

    return { ogpUrls: generatedOGPUrls };
  }
}
