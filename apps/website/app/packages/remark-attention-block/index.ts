import { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const remarkAttentionBlock: Plugin<[], Root> = () => {
  const regex = /\[!(?:WARNING|NOTE|TIP)\]/g;
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      if (node.children.length === 1 && node.children[0].type === "paragraph") {
        const [paragraph] = node.children;
        if (paragraph.children.length > 0 && paragraph.children[0].type === "text") {
          const matches = paragraph.children[0].value.match(regex);
          if (matches) {
            const type = matches[0].toLowerCase().slice(2, -1);
            node.data = {
              hName: "div",
              hProperties: {
                className: ["remark-atb-base", `remark-atb-${type}`],
                "data-block-type": type,
              },
            };
            paragraph.children = paragraph.children.slice(2);
          }
        }
      }
    });
  };
};
export { remarkAttentionBlock };
