import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type * as unified from "unified";

const remarkCodeFilename: unified.Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, "code", (node) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString) return;
      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""];
      if (!title && metaString.includes("title=")) {
        file.message("Invalid title", node, "remark-code-filename");
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

export default remarkCodeFilename;
