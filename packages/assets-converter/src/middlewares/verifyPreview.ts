import type { Context, Next } from "hono";
import type { ContextSet } from "../type";

export const verifyPreview = () => {
  return async (c: Context<ContextSet>, next: Next) => {
    const WORKERS_ENV = c.req.header("X-TAGA3S-ENV");

    if (WORKERS_ENV !== "preview") {
      c.set("isPreview", false);
      return next();
    }

    c.set("isPreview", true);
    return next();
  };
};
