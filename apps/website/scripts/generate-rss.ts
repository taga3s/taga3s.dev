import fs from "node:fs";
import { cdata, type Channel, generateRSS } from "@taga3s/rss-generator";
import { extractFrontmatter } from "./extract-frontmatter";

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
  items: [],
};

const dir = "./app/routes/posts";
const postFilenames = fs.readdirSync(dir).filter((filename) => filename.endsWith(".mdx"));
for (const filename of postFilenames) {
  const frontmatter = await extractFrontmatter(dir, filename);
  const link = `https://taga3s.dev/posts/${filename.replace(/\.mdx$/, "")}`;
  channel.items?.push({
    title: frontmatter.title,
    description: cdata(frontmatter.description),
    category: [frontmatter.category],
    link: link,
    guid: {
      isPermaLink: false,
      value: link,
    },
    pubDate: new Date(frontmatter.publishedAt).toUTCString(),  //FIXME
  });
}

const xml = generateRSS({ channel });
const data = new TextEncoder().encode(xml);
fs.writeFile("public/rss.xml", data, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("RSS feed generated successfully✅");
});
