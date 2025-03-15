import type { Context } from "hono";
import { appClient } from "../appClient";

type Response = {
  images: {
    uri: string;
  }[];
};

const fetcher = async (c: Context) => {
  const res = await appClient.GET<Response>(c, "/photos/favs");
  return res.images;
};

export { fetcher };
