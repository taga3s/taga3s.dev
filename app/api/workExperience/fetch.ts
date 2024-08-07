import type { Context } from "hono";
import apiClient from "../apiClient";

type Response = {
  contents: {
    id: string;
    span: string;
    company: string;
    description: string;
    techStack: string;
    order: number;
  }[];
  totalCount: number;
  offset: number;
  limit: number;
};

const fetchWorkExperience = async (c: Context) => {
  const res = await apiClient.GET<Response>(c, "/work-experience");
  return res.contents.map((content) => {
    return { ...content };
  });
};

export { fetchWorkExperience };
