interface Env {
  DISCORD_WEBHOOK_URL: SecretsStoreSecret;
}

const sendMessage = async (env: Env, message: string) => {
  const DISCORD_WEBHOOK_URL = await env.DISCORD_WEBHOOK_URL.get();

  const res = await fetch(DISCORD_WEBHOOK_URL, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ content: message }),
  });

  if (!res.ok) {
    const raw = await res.json();
    throw new Error(`[${res.status}] ${raw}`);
  }

  console.log("Successfully post a message to Discord channel");
};

export default {
  async queue(batch, env, _ctx): Promise<void> {
    await Promise.all(batch.messages.map((msg) => sendMessage(env, JSON.stringify(msg.body))));
  },
} satisfies ExportedHandler<Env>;
