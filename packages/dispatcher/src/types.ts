import { OGPEntrypoint } from "@taga3s-dev/blog-engine";

export interface Env {
  DISCORD_WEBHOOK_URL: SecretsStoreSecret;
  BLOG_ENGINE_OGP: Service<OGPEntrypoint>;
}

export interface Message {
  type: "blog.updated";
  body: string;
  date: string;
}
