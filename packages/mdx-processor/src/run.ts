import { type Command, type CommandRunner, define, type GunshiParams } from "gunshi";
import { convertToHtml } from "./core.ts";
import { getFileContents, output } from "./utils.ts";

export const runCommand: Command = define({
  name: "run",
  description: "A mdx processor command",
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

export const runProcessor = async (): Promise<CommandRunner<GunshiParams<{ args: typeof runCommand.args }>>> => {
  return async (ctx) => {
    const { pathdir, outdir } = ctx.values;
    if (typeof pathdir !== "string" || typeof outdir !== "string") {
      return;
    }

    const fileContents = await getFileContents(pathdir);

    Promise.all(
      fileContents.map(async (fc) => {
        const content = await convertToHtml(fc.content);
        const id = fc.origName.replace(".mdx", "");
        output(
          JSON.stringify({
            id,
            title: content.frontmatter.title,
            category: content.frontmatter.category,
            description: content.frontmatter.description,
            publishedAt: content.frontmatter.publishedAt,
            updatedAt: content.frontmatter.updatedAt,
            rawHtml: content.rawHtml,
          }),
          `${outdir}/${id}.json`,
        );
      }),
    );
  };
};
