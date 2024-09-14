import { bundledLanguages, bundledThemes, type BundledTheme } from "shiki";
import { getHighlighter } from "./highlighter";
import { toHtml } from "hast-util-to-html";
import type { Element } from "hast";
import { COLOR_SHIRONERI, COLOR_HAI } from "./colors";

const defaultHighlighter = await getHighlighter({ themes: bundledThemes, langs: bundledLanguages });
const defaultFilenameUIColor = `color: ${COLOR_SHIRONERI}; background-color: ${COLOR_HAI};`;

const buildCodeBlockHTML = (rawCode: string, lang: string, filename: string, theme: BundledTheme) => {
  const hast = defaultHighlighter.codeToHast(rawCode, {
    lang: lang,
    theme: theme,
  });

  const targetElem = hast.children[0] as Element;

  // Add filename to the code block if it exists
  if (filename !== "" && targetElem) {
    targetElem.properties = {
      class: targetElem.properties.class,
      style: `${targetElem.properties.style}; padding-top: 0px;`,
      tabindex: targetElem.properties.tabindex,
    };

    targetElem.children.unshift({
      type: "element",
      tagName: "div",
      properties: {
        style: `width: fit-content; margin-bottom: 16px; padding: 4px 8px; font-size: 14px; border-radius: 0 0 4px 4px; ${defaultFilenameUIColor};`,
      },
      children: [
        {
          type: "text",
          value: filename,
        },
      ],
    });
  }

  return toHtml(hast);
};

export { buildCodeBlockHTML };
