import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const sendMessage = async (message: string, discordToken: string, discordChannelId: string) => {
  try {
    const loginStatus = await client.login(discordToken);
    console.log(loginStatus);

    await new Promise((resolve) => client.once("ready", resolve));

    const channel = await client.channels.fetch(discordChannelId);
    if (channel && channel.isTextBased() && channel.isSendable()) {
      await channel.send(`test: ${message}`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.destroy();
  }
};

interface Env {
  DISCORD_TOKEN: SecretsStoreSecret;
  DISCORD_CHANNEL_ID: SecretsStoreSecret;
}

export default {
  async queue(batch, env, _ctx): Promise<void> {
    const DISCORD_TOKEN = await env.DISCORD_TOKEN.get();
    const DISCORD_CHANNEL_ID = await env.DISCORD_CHANNEL_ID.get();

    for (const message of batch.messages) {
      sendMessage(JSON.stringify(message.body), DISCORD_TOKEN, DISCORD_CHANNEL_ID);
    }
  },
} satisfies ExportedHandler<Env>;
