import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

const remarkMomijiTitle: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString.includes("title=")) return;

      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""];
      if (!title) return;

      node.data = {
        hProperties: {
          "data-remark-code-title": title,
        },
      };
    });
  };
};

export { remarkMomijiTitle };
