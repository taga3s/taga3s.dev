import * as v from "valibot";
import { DispatchEvent } from "./types";

const BlogUpdatedEventSchema = v.object({
  account: v.string(),
  bucket: v.string(),
  eventTime: v.string(),
  action: v.string(),
  object: v.object({
    key: v.string(),
    size: v.number(),
    eTag: v.string(),
  }),
});

// type BlogUpdatedEventData = v.InferOutput<typeof BlogUpdatedEventSchema>;

export const convertToEvent = (rawJson: unknown): DispatchEvent | undefined => {
  const parsed = v.safeParse(BlogUpdatedEventSchema, rawJson);
  if (!parsed.success) {
    console.log(`Invalid event received, ${JSON.stringify(rawJson)}`);
    return undefined;
  }

  return {
    type: "blog.updated",
    date: parsed.output.eventTime,
  };
};
