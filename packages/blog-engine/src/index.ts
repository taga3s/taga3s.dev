import { createOgp } from "./create-ogp";
import { Env } from "./types";

export default {
  async fetch(request, env, ctx) {
    const pngBuffer = await createOgp(ctx, "sample");
    return new Response(pngBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
