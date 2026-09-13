import { Hono } from "hono";
import { cache } from "hono/cache";
import { logger } from "hono/logger";
import { verifyPreview } from "./api/middlewares/verifyPreview";
import type { ContextSet } from "./type";
import { resourcesRoutes } from "./api/resources";
import { blogRoutes } from "./api/blog";
import { historyRoutes } from "./api/history";
import { indexRoutes } from "./api/top";

const app = new Hono<ContextSet>();

app.use(logger());
app.use(verifyPreview());

// TODO: Revise the cache strategy
app.get(
  "*",
  cache({
    cacheName: "taga3s-dev-cache",
    cacheControl: "max-age=3600",
    cacheableStatusCodes: [200, 404],
    vary: ["X-TAGA3S-ENV"], // maybe
  }),
);

app.route("/", indexRoutes);
app.route("/history", historyRoutes);
app.route("/blog", blogRoutes);
app.route("/resources", resourcesRoutes);

export default app;
