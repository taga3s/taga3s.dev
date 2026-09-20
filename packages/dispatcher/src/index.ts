import { convertToMessage } from "./converter";
import type { Env, Message } from "./types";

const sendMessage = async (webhookUrl: string, message: Message) => {
  const res = await fetch(webhookUrl, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ content: message.body }),
  });

  if (!res.ok) {
    const raw = await res.json();
    throw new Error(`[${res.status}] ${raw}`);
  }

  console.log("Successfully post a message to Discord channel");
};

export default {
  async queue(batch, env, _ctx): Promise<void> {
    const webhookUrl = await env.DISCORD_WEBHOOK_URL.get();

    for (const msg of batch.messages) {
      const message = convertToMessage(msg.body);
      if (message?.type === "blog.updated") {
        const result = await env.BLOG_ENGINE_OGP.generate();
        console.log(result);
        await sendMessage(webhookUrl, message);
      }
    }
  },
} satisfies ExportedHandler<Env, unknown>;
