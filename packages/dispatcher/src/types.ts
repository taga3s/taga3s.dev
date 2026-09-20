import { OGPEntrypoint, RSSEntrypoint } from "@taga3s-dev/blog-engine";

export interface Env {
  DISCORD_WEBHOOK_URL: SecretsStoreSecret;
  BLOG_ENGINE_OGP: Service<OGPEntrypoint>;
  BLOG_ENGINE_RSS: Service<RSSEntrypoint>;
}

export interface DispatchEvent {
  type: "blog.updated";
  date: string;
}
