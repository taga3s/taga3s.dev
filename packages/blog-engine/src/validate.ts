import * as v from "valibot";
import { Undefinable } from "./types";

const BlogOutSchema = v.array(
  v.object({
    id: v.string(),
    title: v.string(),
    category: v.array(v.string()),
    description: v.string(),
    publishedAt: v.string(),
  }),
);

export type BlogOut = v.InferOutput<typeof BlogOutSchema>;

export const validateBlogOut = (rawData: unknown): Undefinable<BlogOut> => {
  const parsed = v.safeParse(BlogOutSchema, rawData);
  if (!parsed.success) {
    console.log(`Invalid data detected, ${JSON.stringify(rawData)}`);
    return undefined;
  }

  return parsed.output;
};
