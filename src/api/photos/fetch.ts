import { Context } from "hono";
import { getApiClient } from "../apiClient";

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
  const res = await getApiClient(c).get<Response>({ endpoint: "photos" });
  return res.contents.map((content) => {
    return { title: content.title, ...content.image };
  });
};

export { fetchPhotos };
