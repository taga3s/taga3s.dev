import type { Context, Next } from "hono";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { ContextSet } from "../../index";

export const verifyPreview = () => {
  return async (c: Context<ContextSet>, next: Next) => {
    const POLICY_AUD = await c.env.CLOUDFLARE_ACCESS_AUD.get();
    const TEAM_DOMAIN = c.env.TEAM_DOMAIN;
    const WORKERS_ENV = c.env.WORKERS_ENV;

    if (WORKERS_ENV !== "preview") {
      c.set("isPreview", false);
      await next();
    }

    if (!POLICY_AUD) {
      return c.json({ message: "Missing required audience" }, 403);
    }

    // Get the JWT from the request headers
    const token = c.req.header("cf-access-jwt-assertion");
    if (!token) {
      return c.json({ message: "Missing required CF Access JWT" }, 403);
    }

    try {
      // Create JWKS from your team domain
      const JWKS = createRemoteJWKSet(new URL(`${TEAM_DOMAIN}/cdn-cgi/access/certs`));

      // Verify the JWT
      const _ = await jwtVerify(token, JWKS, {
        issuer: TEAM_DOMAIN,
        audience: POLICY_AUD,
      });

      // Token is valid, proceed with your application logic
      c.set("isPreview", true);
      await next();
    } catch (error) {
      // Token verification failed
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.json({ message: `Invalid token: ${message}` }, 403);
    }
  };
};
