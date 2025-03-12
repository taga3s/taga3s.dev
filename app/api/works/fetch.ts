import type { Context } from "hono";
import { appClient } from "../appClient";

type Response = {
  works: {
    id: string;
    title: string;
    description: string;
    techStack: string;
    githubUrl: string;
    order: number;
  }[];
};

const fetcher = async (c: Context) => {
  const res = await appClient.GET<Response>(c, "/works");
  return res.works;
};

export { fetcher };
