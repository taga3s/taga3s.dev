import type { Context } from "hono";
import type { ContextSet } from "../../type";

const BASE_URL = "https://taga3s-dev-assets-converter.taga3s.workers.dev/api/v1";

const http = async (params: { path: string; method: string; headers?: { "X-TAGA3S-ENV": string } }) => {
  const res = await fetch(`${BASE_URL}${params.path}`, {
    headers: params.headers,
    method: params.method,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch content: ${res.statusText}`);
  }

  return res;
};

const GET = async <T>(c: Context<ContextSet>, path: string) => {
  const res = await http({
    path: path,
    method: "GET",
    headers: { "X-TAGA3S-ENV": c.get("isPreview") ? "preview" : "production" },
  });
  return res.json() as T;
};

export const apiClient = { GET };
