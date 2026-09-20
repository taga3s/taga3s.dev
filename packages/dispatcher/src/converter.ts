import * as v from "valibot";
import { Message } from "./types";

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

export const convertToMessage = (rawJson: unknown): Message | undefined => {
  const parsed = v.safeParse(BlogUpdatedEventSchema, rawJson);
  if (parsed.success) {
    return {
      type: "blog.updated",
      body: `Blog updated, dispatched by creation of ${parsed.output.object.key}`,
      date: parsed.output.eventTime,
    };
  }

  console.log(`Invalid event received`, rawJson);

  return undefined;
};
