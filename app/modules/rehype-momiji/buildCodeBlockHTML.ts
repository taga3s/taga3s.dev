import { bundledLanguages, bundledThemes, type BundledTheme } from "shiki";
import { getHighlighter } from "./highlighter";
import { toHtml } from "hast-util-to-html";
import type { Element } from "hast";
import { COLOR_SHIRONERI, COLOR_HAI } from "./colors";
import { visit } from "unist-util-visit";

const defaultHighlighter = await getHighlighter({ themes: bundledThemes, langs: bundledLanguages });

const buildCodeBlockHTML = (
  rawCode: string,
  lang: string,
  theme: BundledTheme,
  filename: string,
  filenameBGColor?: string,
  filenameTextColor?: string,
) => {
  const hast = defaultHighlighter.codeToHast(rawCode, {
    lang: lang,
    theme: theme,
  });
  const filenameColorStyle = `background-color: ${filenameBGColor ?? COLOR_HAI}; color: ${filenameTextColor ?? COLOR_SHIRONERI};`;

  // Add filename to the code block if it exists
  if (filename === "") {
    return toHtml(hast);
  }

  visit(hast, "element", (node: Element) => {
    if (
      node.tagName === "pre" &&
      node.properties.class &&
      typeof node.properties.class === "string" &&
      node.properties.class.includes("shiki")
    ) {
      node.properties = {
        class: node.properties.class,
        style: `${node.properties.style}; padding-top: 0px;`,
        tabindex: node.properties.tabindex,
      };

      node.children.unshift({
        type: "element",
        tagName: "div",
        properties: {
          style: `width: fit-content; margin-bottom: 16px; padding: 4px 8px; font-size: 14px; border-radius: 0 0 4px 4px; ${filenameColorStyle}`,
        },
        children: [
          {
            type: "text",
            value: filename,
          },
        ],
      });
    }
  });

  return toHtml(hast);
};

export { buildCodeBlockHTML };
