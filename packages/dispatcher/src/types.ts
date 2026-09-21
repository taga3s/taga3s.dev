import { OGPEntrypoint, RSSEntrypoint } from "@taga3s-dev/blog-engine";
import { ReporterEntrypoint } from "../../metrics-engine/src";

export interface Env {
  DISCORD_WEBHOOK_URL: SecretsStoreSecret;
  BLOG_ENGINE_OGP: Service<OGPEntrypoint>;
  BLOG_ENGINE_RSS: Service<RSSEntrypoint>;
  METRICS_ENGINE_REPORTER: Service<ReporterEntrypoint>;
}

export interface DispatchEvent {
  type: "blog.updated";
  date: string;
}
