import type { CfDevelopmentCreated, Env, Message } from "./types";

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

const convertMessageByType = (jsonStr: string): Message | undefined => {
  const parsed = JSON.parse(jsonStr) as CfDevelopmentCreated;

  if (parsed.type === "cf.workers.script.deployment.created") {
    const versionIdShort = parsed.payload.versions[0].versionId.slice(0, 8);
    return {
      type: "deployment.created",
      body: `[id= ${versionIdShort}] Worker のデプロイが成功しました`,
      date: parsed.metadata.eventTimestamp,
    };
  }

  return undefined;
};

export default {
  async queue(batch, env, _ctx): Promise<void> {
    await Promise.all(
      batch.messages.map((msg) => {
        const converted = convertMessageByType(msg.body);
        if (converted) {
          sendMessage(env, converted);
        }
      }),
    );
  },
} satisfies ExportedHandler<Env, string>;
