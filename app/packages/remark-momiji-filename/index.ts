import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

const remarkMomijiFilename: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString.includes("title=")) return;

      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""];
      if (!title) return;

      if (!node.data) {
        node.data = {};
      }
      node.data.hProperties = {
        "data-remark-code-filename": title,
      };
    });
  };
};

export default remarkMomijiFilename;
