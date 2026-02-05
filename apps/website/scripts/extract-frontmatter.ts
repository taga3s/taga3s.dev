import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import * as toVfile from "to-vfile";
import { unified } from "unified";
import * as yaml from "yaml";

export type Frontmatter = {
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  ogpImage?: string;
};

const validateFrontmatter = (value: unknown): value is Frontmatter => {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    "description" in value &&
    "category" in value &&
    "publishedAt" in value
  );
};

export const extractFrontmatter = async (dir: string, filename: string): Promise<Frontmatter> => {
  const content = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtractFrontmatter, { yaml: yaml.parse })
    .process(toVfile.readSync(`${dir}/${filename}`));

  const frontmatter = content.data;

  if (!validateFrontmatter(frontmatter)) {
    throw new Error(`Invalid frontmatter: ${filename}`);
  }

  return frontmatter;
};
