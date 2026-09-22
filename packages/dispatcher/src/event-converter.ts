import * as v from "valibot";

type DispatchEventKind = BlogUpdatedEvent;
interface BlogUpdatedEvent {
  type: "blog.updated";
  date: string;
}

const IncomingBlogUpdatedEventSchema = v.object({
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

export const convertToDispatchEvent = (rawJson: unknown): DispatchEventKind | undefined => {
  const parsed = v.safeParse(IncomingBlogUpdatedEventSchema, rawJson);
  if (!parsed.success) {
    console.log(`Invalid event received, ${JSON.stringify(rawJson)}`);
    return undefined;
  }

  return {
    type: "blog.updated",
    date: parsed.output.eventTime,
  };
};
