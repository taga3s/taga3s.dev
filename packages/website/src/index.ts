import { Hono } from "hono";
import { cache } from "hono/cache";
import { logger } from "hono/logger";
import { verifyPreview } from "./api/middlewares/verifyPreview";
import { resourcesRoutes } from "./api/resources";
import { blogRoutes } from "./api/blog";
import { historyRoutes } from "./api/history";
import { topRoutes } from "./api/top";

export interface Bindings {
  TAGA3S_DEV_BUCKET: R2Bucket;
  WORKERS_ENV: string;
  POLICY_AUD: string;
  TEAM_DOMAIN: string;
}

export interface Variables {
  isPreview: boolean;
}

export interface ContextSet {
  Bindings: Bindings;
  Variables: Variables;
}

const app = new Hono<ContextSet>();

app.use(logger());
app.use(verifyPreview());

// TODO: Revise the cache strategy
app.get(
  "*",
  cache({
    cacheName: "global",
    cacheControl: "max-age=3600",
    cacheableStatusCodes: [200, 404],
    vary: ["X-TAGA3S-ENV"], // maybe
  }),
);

app.route("/", topRoutes);
app.route("/history", historyRoutes);
app.route("/blog", blogRoutes);
app.route("/resources", resourcesRoutes);

export default app;
