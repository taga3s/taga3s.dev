import { Hono } from "hono";
import { logger } from "hono/logger";
import { v1 } from "./v1";

const app = new Hono();

app.use(logger());

app.get("/healthz", (c) => {
  return c.text("ok");
});

app.route("/api/v1", v1);

export default app;
