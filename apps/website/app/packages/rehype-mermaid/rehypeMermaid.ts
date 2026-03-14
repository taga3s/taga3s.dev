import { renderMermaid } from "@mermaid-js/mermaid-cli";
import type { Parent, Root, Text } from "hast";
import puppeteer from "puppeteer";
import type { Plugin, Transformer } from "unified";
import { visit } from "unist-util-visit";
import { parser } from "./parser";

interface MermaidCodeBlock {
  textNode: Text;
  index: number;
  parent: Parent;
}

const detectMermaid = (classNames: string[]): boolean | undefined => {
  return classNames.some((cn) => cn.startsWith("language-mermaid"));
};

export const rehypeMermaid: Plugin<[], Root> = () => {
  const transformer: Transformer<Root> = async (tree) => {
    const mermaidCodeBlockPromises: MermaidCodeBlock[] = [];

    visit(tree, "element", (node, index, parent) => {
      // Check if the node is a pre tag with a single child
      if (!(node.tagName === "pre" && Array.isArray(node.children) && node.children.length === 1)) {
        return;
      }

      // Check if the child is a code tag
      const [codeElem] = node.children;
      if (codeElem === undefined || codeElem.type !== "element" || codeElem.tagName !== "code") {
        return;
      }

      // Check if the code tag has a className property
      const classNames = codeElem.properties?.className;
      if (
        !(
          Array.isArray(classNames) &&
          classNames.length > 0 &&
          classNames.every((className) => typeof className === "string")
        )
      ) {
        return;
      }

      // Check if the code tag has a text child
      const [textNode] = codeElem.children;
      if (!textNode || textNode.type !== "text") {
        return;
      }

      // Detect if the code block is Mermaid
      const detected = detectMermaid(classNames);
      if (detected && index && parent) {
        mermaidCodeBlockPromises.push({ textNode, index, parent });
      }
    });

    if (mermaidCodeBlockPromises.length === 0) {
      return;
    }

    const browser = await puppeteer.launch({
      headless: true,
    });

    const decoder = new TextDecoder();

    await Promise.all(
      mermaidCodeBlockPromises.map(async ({ textNode, index, parent }, blockIndex) => {
        const { data: svgBuffer } = await renderMermaid(browser, textNode.value, "svg");

        const svgElem = decoder.decode(svgBuffer).replaceAll("my-svg", `my-svg-${blockIndex}`);
        const parsedRoot = parser.parse(svgElem);

        const [content] = parsedRoot.children;
        if (content.type !== "element") {
          return;
        }

        content.properties.style = "width: 100%; background-color: white;";

        parent.children[index] = content;
      }),
    );

    await browser.close();
  };

  return transformer;
};
