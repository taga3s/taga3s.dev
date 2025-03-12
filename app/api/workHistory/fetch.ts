import type { Context } from "hono";
import { appClient } from "../appClient";

type Response = {
  work_history: {
    id: string;
    span: string;
    company: string;
    description: string;
    techStack: string;
    order: number;
  }[];
};

const fetcher = async (c: Context) => {
  const res = await appClient.GET<Response>(c, "/work-history");
  return res.work_history;
};

export { fetcher };
