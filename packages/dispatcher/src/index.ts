import { convertToEvent } from "./converter";
import { sendMessage, toDiscordMessage } from "./messenger";
import type { Env } from "./types";

const dispatchBlogUpdate = async (env: Env, webhookUrl: string) => {
  await Promise.all([
    (async () => {
      const result = await env.BLOG_ENGINE_OGP.generate();
      if (result === undefined || result.blogUrls.length === 0) {
        console.log("No new blog ogp generated.");
        return;
      }

      await sendMessage(
        webhookUrl,
        toDiscordMessage(":bell: ブログの OGP が準備できたよ。確認してね。", result.blogUrls),
      );
    })(),
    (async () => {
      await env.BLOG_ENGINE_RSS.generate();
    })(),
  ]);
};

export default {
  async queue(batch, env, _ctx): Promise<void> {
    const webhookUrl = await env.DISCORD_WEBHOOK_URL.get();

    for (const msg of batch.messages) {
      const event = convertToEvent(msg.body);
      if (event?.type === "blog.updated") {
        await dispatchBlogUpdate(env, webhookUrl);
      }
    }
  },
} satisfies ExportedHandler<Env, unknown>;
