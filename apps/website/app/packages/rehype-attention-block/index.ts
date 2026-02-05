import type { Element, Root, Text } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { NOTE_ICON_HAST, TIP_ICON_HAST, WARNING_ICON_HAST } from "./icon-svg-hasts";

type BlockType = "note" | "warning" | "tip";

const getSVGFromType = (type: BlockType): Element => {
  switch (type) {
    case "note":
      return NOTE_ICON_HAST;
    case "warning":
      return WARNING_ICON_HAST;
    case "tip":
      return TIP_ICON_HAST;
  }
};

/**
 * @deprecated This plugin is not recommended for use.
 */
export const rehypeAttentionBlock: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "div" &&
        Array.isArray(node.properties.className) &&
        node.properties.className.includes("remark-atb-base")
      ) {
        const blockType = node.properties["data-block-type"];
        if (!blockType || typeof blockType !== "string") {
          return;
        }

        const svgHast = getSVGFromType(blockType as BlockType);
        const labelTextHast: Text = {
          type: "text",
          value: blockType.toUpperCase(),
        };
        const spanHast: Element = {
          type: "element",
          tagName: "span",
          properties: {
            className: ["remark-atb-label"],
          },
          children: [labelTextHast],
        };

        node.children.unshift({
          type: "element",
          tagName: "div",
          properties: {
            className: [`remark-atb-icon ${blockType}`],
          },
          children: [svgHast, spanHast],
        });
      }
    });
  };
};
