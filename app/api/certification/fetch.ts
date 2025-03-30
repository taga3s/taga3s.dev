import type { Context } from "hono";
import { appClient } from "../appClient";

interface Response {
  certifications: {
    name: string;
    when: string;
    url: string;
  }[];
}

const fetcher = async (c: Context) => {
  const res = await appClient.GET<Response>(c, "/certifications");
  return res.certifications;
};

export { fetcher };
