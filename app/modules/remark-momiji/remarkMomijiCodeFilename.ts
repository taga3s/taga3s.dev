import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type * as unified from "unified";

const remarkMomijiCodeFilename: unified.Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString) return;
      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""];
      if (!title && metaString.includes("title=")) {
        return;
      }
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

export default remarkMomijiCodeFilename;
