import type { Context } from "hono";
import { appClient } from "../appClient";

interface Response {
  work_history: {
    id: string;
    span: string;
    company: string;
    description: string;
    tech_stack: string;
    order: number;
  }[];
}

const fetcher = async (c: Context) => {
  const res = await appClient.GET<Response>(c, "/work-history");
  return res.work_history;
};

export { fetcher };
