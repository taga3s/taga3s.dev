import { Hono } from "hono";
import { imagesRoutes } from "./images";
import type { ContextSet } from "./types";

const app = new Hono<ContextSet>();

app.get("/healthz", (c) => {
  return c.text("ok");
});

app.route("/api/images", imagesRoutes);

export default app;
