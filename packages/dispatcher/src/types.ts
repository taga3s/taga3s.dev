export interface Env {
  DISCORD_WEBHOOK_URL: SecretsStoreSecret;
}

export interface Message {
  type: "test";
  body: string;
  date: string;
}
