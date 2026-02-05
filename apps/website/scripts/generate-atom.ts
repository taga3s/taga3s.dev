import fs from "node:fs";
import { AtomNode, c, xmlRoot } from "@taga3s/atom-feed-composer";
import { extractFrontmatter } from "./extract-frontmatter";

const entries: AtomNode[] = []
const dir = "./app/routes/posts";
const postFilenames = fs.readdirSync(dir).filter((filename) => filename.endsWith(".mdx"));
for (const filename of postFilenames) {
  const frontmatter = await extractFrontmatter(dir, filename);
  const link = `https://taga3s.dev/posts/${filename.replace(/\.mdx$/, "")}`;
  entries.push(c("entry", {}, [
    c("title", { value: frontmatter.title }),
    c("link", { href: link, rel: "alternate" }),
    c("id", { value: `tag:taga3s.dev,2026:${frontmatter.title}` }),
    c("updated", { value: new Date(frontmatter.publishedAt).toISOString() }), //FIXME: `frontmatter.publishedAt` may not match `atom.updated`
    c("summary", { value: frontmatter.description }),
  ]));
}

const xml = xmlRoot([c("feed", {
  xmlns: "http://www.w3.org/2005/Atom",
  "xml:lang": "ja",
}, [
  c("title", { value: "taga3s dev" }),
  c("link", {
    href: "https://taga3s.dev/atom.xml",
    rel: "self",
    type: "application/atom+xml",
  }),
  c("author", {}, [
    c("name", { value: "taga3s" }),
  ]),
  c("id", { value: "tag:taga3s.dev,2026:feed" }),
  c("updated", { value: "2026-01-15T01:55:15.576Z" }),
  ...entries,
])]);

const data = new TextEncoder().encode(xml);

fs.writeFile("public/atom.xml", data, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Atom feed generated successfully✅");
});
