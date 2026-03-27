import { createRoute } from "honox/factory";
import { createRemoteJWKSet, jwtVerify } from "jose"

export default createRoute(async (c, next) => {
  const WORKERS_ENV = c.env?.WORKERS_ENV;
  const POLICY_AUD = c.env?.POLICY_AUD;
  const TEAM_DOMAIN = c.env?.TEAM_DOMAIN;

  if (WORKERS_ENV !== "preview") {
    await next()
  }
  
  // Verify the POLICY_AUD environment variable is set
  if (!POLICY_AUD) {
    return c.json({ message: "Missing required audience" }, 403)
  }

  // Get the JWT from the request headers
  const token = c.req.header("cf-access-jwt-assertion")

  // Check if token exists
  if (!token) {
    return c.json({ message: "Missing required CF Access JWT" }, 403)
  }

  try {
    // Create JWKS from your team domain
    const JWKS = createRemoteJWKSet(
      new URL(`${TEAM_DOMAIN}/cdn-cgi/access/certs`),
    );

    // Verify the JWT
    const _ = await jwtVerify(token, JWKS, {
      issuer: TEAM_DOMAIN,
      audience: POLICY_AUD,
    });

    // Token is valid, proceed with your application logic
    await next()
  } catch (error) {
    // Token verification failed
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ message: `Invalid token: ${message}` }, 403)
  }
});
