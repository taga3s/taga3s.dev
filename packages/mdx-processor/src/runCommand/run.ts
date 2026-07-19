import { type Command, type CommandRunner, define, type GunshiParams } from "gunshi";
import { convertToHtml } from "../core/mdx/index.ts";
import { getFileContents, output } from "../core/utils.ts";

export const runCommand: Command = define({
  name: "run",
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

interface Out {
  id: string;
  title: string;
  category: string[];
  description: string;
  publishedAt: string;
  updatedAt: string;
  rawHtml: string;
}

export const runProcessor = async (): Promise<CommandRunner<GunshiParams<{ args: typeof runCommand.args }>>> => {
  return async (ctx) => {
    const { pathdir, outdir } = ctx.values;
    if (typeof pathdir !== "string" || typeof outdir !== "string") {
      return;
    }

    const fileContents = await getFileContents(pathdir);
    const outsList: Omit<Out, "rawHtml">[] = [];

    for (const fc of fileContents) {
      const content = await convertToHtml(fc.content);
      const id = fc.origName.replace(".mdx", "");
      const out = {
        id,
        title: content.frontmatter.title,
        category: content.frontmatter.category,
        description: content.frontmatter.description,
        publishedAt: content.frontmatter.publishedAt,
        updatedAt: content.frontmatter.updatedAt,
        rawHtml: content.rawHtml,
      };

      await output(JSON.stringify(out), `${outdir}/${id}.json`);

      const { rawHtml: _rawHtml, ...rest } = out;
      outsList.push(rest);
    }

    await output(JSON.stringify(outsList), `${outdir}/outs.json`);
  };
};
