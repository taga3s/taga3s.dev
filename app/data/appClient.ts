import type { Context } from "hono";

const http = async (c: Context, params: { path: string; method: string }) => {
  const res = await fetch("", {
    headers: {},
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

export const appClient = { GET };
