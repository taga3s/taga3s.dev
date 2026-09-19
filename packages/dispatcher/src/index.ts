import type { Env, Message } from "./types";

const sendMessage = async (env: Env, message: Message) => {
  const DISCORD_WEBHOOK_URL = await env.DISCORD_WEBHOOK_URL.get();

  const res = await fetch(DISCORD_WEBHOOK_URL, {
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

const convertMessageByType = (rawJson: unknown): Message | undefined => {
  return {
    type: "test",
    body: JSON.stringify(rawJson),
    date: "hogehoge",
  };
};

export default {
  async queue(batch, env, _ctx): Promise<void> {
    for (const msg of batch.messages) {
      const converted = convertMessageByType(msg.body);
      if (converted) {
        await sendMessage(env, converted);
      }
    }
  },
} satisfies ExportedHandler<Env, unknown>;
