import type { Context } from "hono";
import apiClient from "../apiClient";

type Response = {
  contents: {
    id: string;
    title: string;
    description: string;
    techStack: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    githubUrl: string;
  }[];
  totalCount: number;
  offset: number;
  limit: number;
};

const fetchWorks = async (c: Context) => {
  const res = await apiClient.GET<Response>(c, "/works");
  return res.contents.map((content) => {
    return { ...content, image: { ...content.image, url: `${content.image.url}?w=1000&q=90&fm=webp` } };
  });
};

export { fetchWorks };
