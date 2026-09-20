import { type AtomNode, c, xmlRoot } from "@taga3s/atom-feed-composer";
import { BlogOutItem } from "./types";

export const createAtom = (blogOuts: BlogOutItem[]): string => {
  const entries: AtomNode[] = [];

  for (const item of blogOuts) {
    entries.push(
      c("entry", {}, [
        c("title", { value: item.title }),
        c("link", { href: `https://taga3s.dev/blog/${item.id}`, rel: "alternate" }),
        c("id", { value: `tag:taga3s.dev,2026:${item.title}` }),
        c("updated", {
          value: new Date(item.publishedAt).toISOString(),
        }),
        c("summary", { value: item.description }),
      ]),
    );
  }

  return xmlRoot([
    c(
      "feed",
      {
        xmlns: "http://www.w3.org/2005/Atom",
        "xml:lang": "ja",
      },
      [
        c("title", { value: "taga3s dev" }),
        c("link", {
          href: "https://taga3s.dev/atom.xml",
          rel: "self",
          type: "application/atom+xml",
        }),
        c("author", {}, [c("name", { value: "taga3s" })]),
        c("id", { value: "tag:taga3s.dev,2026:feed" }),
        c("updated", { value: "2026-01-15T01:55:15.576Z" }),
        ...entries,
      ],
    ),
  ]);
};
