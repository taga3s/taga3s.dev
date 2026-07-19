import { type AtomNode, c, xmlRoot } from "@taga3s/atom-feed-composer";
import { type Command, type CommandRunner, define, type GunshiParams } from "gunshi";
import { convertToHtml } from "../core/mdx/index.ts";
import { getFileContents, output } from "../core/utils.ts";

export const genatomCommand: Command = define({
  name: "genatom",
  args: {
    pathdir: {
      type: "string",
      short: "d",
      description: "Directory path for .mdx files",
    },
    outdir: {
      type: "string",
      short: "o",
      description: "Output directory path",
    },
  },
});

export const genatomProcessor = async (): Promise<
  CommandRunner<GunshiParams<{ args: typeof genatomCommand.args }>>
> => {
  return async (ctx) => {
    const { pathdir, outdir } = ctx.values;
    if (typeof pathdir !== "string" || typeof outdir !== "string") {
      return;
    }

    const fileContents = await getFileContents(pathdir);

    const entries: AtomNode[] = [];

    for (const fc of fileContents) {
      const content = await convertToHtml(fc.content);
      const id = fc.origName.replace(".mdx", "");

      entries.push(
        c("entry", {}, [
          c("title", { value: content.frontmatter.title }),
          c("link", { href: `https://taga3s.dev/blog/${id}`, rel: "alternate" }),
          c("id", { value: `tag:taga3s.dev,2026:${content.frontmatter.title}` }),
          c("updated", {
            value: new Date(content.frontmatter.updatedAt || content.frontmatter.publishedAt).toISOString(),
          }),
          c("summary", { value: content.frontmatter.description }),
        ]),
      );
    }

    const out = xmlRoot([
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

    await output(out, `${outdir}/atom.xml`);
  };
};
