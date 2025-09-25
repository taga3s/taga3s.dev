import type { BundledLanguage, HighlighterGeneric, BundledTheme } from "shiki";
import { COLOR_SHIRONERI, COLOR_HAI } from "./colors";
import type { Element } from "hast";

const buildCodeBlock = (
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
  rawCode: string,
  lang: string,
  theme: BundledTheme,
  filename: string,
  filenameBGColor?: string,
  filenameTextColor?: string,
): Element | undefined => {
  const hast = highlighter.codeToHast(rawCode, {
    lang: lang,
    theme: theme,
    transformers: [
      {
        pre(this, node) {
          // Add filename to the code block
          if (
            filename !== "" &&
            node.properties.class &&
            typeof node.properties.class === "string" &&
            node.properties.class.includes("shiki")
          ) {
            const filenameColorStyle = `background-color: ${filenameBGColor ?? COLOR_HAI}; color: ${filenameTextColor ?? COLOR_SHIRONERI};`;

            node.properties = {
              ...node.properties,
              style: `${node.properties.style}; padding-top: 48px;`,
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

  if (hast.children[0].type !== "element") {
    return;
  }

  return hast.children[0];
};

export { buildCodeBlock };
