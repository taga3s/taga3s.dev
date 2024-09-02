import type { Context } from "hono";
import apiClient from "../apiClient";

type Response = {
  contents: {
    id: string;
    image: {
      url: string;
      height: number;
      width: number;
    };
    title: string;
  }[];
  totalCount: number;
  offset: number;
  limit: number;
};

const fetchPhotos = async (c: Context) => {
  const res = await apiClient.GET<Response>(c, "/photos");
  return res.contents.map((content) => {
    return { ...content.image, title: content.title, url: `${content.image.url}?w=1000&q=90` };
  });
};

export { fetchPhotos };
