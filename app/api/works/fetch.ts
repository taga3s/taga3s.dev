import type { Context } from "hono";
import { appClient } from "../appClient";

interface Response {
  works: {
    id: string;
    title: string;
    description: string;
    tech_stack: string;
    github_url: string;
    order: number;
  }[];
}

const fetcher = async (c: Context) => {
  const res = await appClient.GET<Response>(c, "/works");
  return res.works;
};

export { fetcher };
