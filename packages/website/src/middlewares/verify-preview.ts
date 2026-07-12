import type { Context, Next } from "hono";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const verifyPreview = async (c: Context, next: Next) => {
  const WORKERS_ENV = c.env?.WORKERS_ENV;
  const POLICY_AUD = c.env?.POLICY_AUD;
  const TEAM_DOMAIN = c.env?.TEAM_DOMAIN;

  if (WORKERS_ENV !== "preview") {
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
    await next();
  } catch (error) {
    // Token verification failed
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ message: `Invalid token: ${message}` }, 403);
  }
};
