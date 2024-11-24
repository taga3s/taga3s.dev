import type { BundledLanguage, HighlighterGeneric, BundledTheme } from "shiki";
import { toHtml } from "hast-util-to-html";
import { COLOR_SHIRONERI, COLOR_HAI } from "./colors";

const buildCodeBlock = (
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
  rawCode: string,
  lang: string,
  theme: BundledTheme,
  filename: string,
  filenameBGColor?: string,
  filenameTextColor?: string,
) => {
  const filenameColorStyle = `background-color: ${filenameBGColor ?? COLOR_HAI}; color: ${filenameTextColor ?? COLOR_SHIRONERI};`;

  const hast = highlighter.codeToHast(rawCode, {
    lang: lang,
    theme: theme,
    transformers: [
      {
        pre(this, node) {
          if (filename === "") return;

          if (
            node.properties.class &&
            typeof node.properties.class === "string" &&
            node.properties.class.includes("shiki")
          ) {
            node.properties = {
              class: node.properties.class,
              style: `${node.properties.style}; padding-top: 48px;`,
              tabindex: node.properties.tabindex,
            };

            node.children.unshift({
              type: "element",
              tagName: "div",
              properties: {
                style: `position: absolute; top: 0; left: 16px; width: fit-content; margin-bottom: 16px; padding: 4px 8px; font-size: 14px; border-radius: 0 0 4px 4px; ${filenameColorStyle}`,
              },
              children: [
                {
                  type: "text",
                  value: filename,
                },
              ],
            });
          }
        },
      },
    ],
  });

  return toHtml(hast);
};

export { buildCodeBlock };
