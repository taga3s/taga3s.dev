import type { Context } from "hono";
import { env } from "hono/adapter";

const http = async (c: Context, params: { path: string; method: string }) => {
  const { MICRO_CMS_SERVICE_DOMAIN, MICRO_CMS_API_KEY } = env<{
    MICRO_CMS_SERVICE_DOMAIN: string;
    MICRO_CMS_API_KEY: string;
  }>(c);
  const res = await fetch(`https://${MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1${params.path}`, {
    headers: {
      "X-MICROCMS-API-KEY": MICRO_CMS_API_KEY,
    },
    method: params.method,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch content: ${res.statusText}`);
  }

  return res;
};

const GET = async <T>(c: Context, path: string) => {
  const res = await http(c, { path: path, method: "GET" });
  return res.json() as T;
};

export default { GET };
