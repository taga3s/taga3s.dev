import fs from "node:fs";
import { cdata, type Channel, generateRSS, type Item } from "@taga3s/rss-generator";

import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import * as toVfile from "to-vfile";
import * as yaml from "yaml";
import { unified } from "unified";

type Frontmatter = {
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

const channel: Channel = {
  title: "taga3s dev",
  link: "https://taga3s.dev",
  atom: {
    link: {
      href: "https://taga3s.dev/rss.xml",
      rel: "self",
      type: "application/rss+xml",
    }
  },
  description: cdata("taga3s website, sharing knowledge and experience"),
  ttl: 60,
  language: "ja",
  category: ["tech", "weekly", "others"],
  copyright: "2026 taga3s",
};

const items: Item[] = [];

const dir = "./app/routes/posts";
const postFilenames = fs.readdirSync(dir).filter((filename) => filename.endsWith(".mdx"));
for (const filename of postFilenames) {
  const content = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtractFrontmatter, { yaml: yaml.parse })
    .process(toVfile.readSync(`${dir}/${filename}`));

  const frontmatter = content.data;

  if (!validateFrontmatter(frontmatter)) {
    console.error(`Invalid frontmatter: ${filename}`);
    continue;
  }

  const link = `https://taga3s.dev/posts/${filename.replace(/\.mdx$/, "")}`;

  items.push({
    title: frontmatter.title,
    description: cdata(frontmatter.description),
    category: [frontmatter.category],
    link: link,
    guid: {
      isPermaLink: false,
      value: link,
    },
    pubDate: new Date(frontmatter.publishedAt).toUTCString(), //TODO: fix timezone
  });
}

const xml = generateRSS({ channel, items });
const data = new TextEncoder().encode(xml);
fs.writeFile("public/rss.xml", data, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("RSS feed generated successfully✅");
});
