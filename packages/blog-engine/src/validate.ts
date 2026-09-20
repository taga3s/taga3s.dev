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

export const validateBlogOut = (raw: unknown): Undefinable<BlogOut> => {
  const parsed = v.safeParse(BlogOutSchema, raw);
  if (parsed.success) {
    return parsed.output;
  }

  console.log(`Invalid outs.json detected`, raw);

  return undefined;
};
