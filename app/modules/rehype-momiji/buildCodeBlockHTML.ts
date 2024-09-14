import { bundledLanguages, bundledThemes, type BundledLanguage, type BundledTheme } from "shiki";
import { getHighlighter } from "./highlighter";
import { toHtml } from "hast-util-to-html";
import type { Element } from "hast";

const defaultHighlighter = await getHighlighter({ themes: bundledThemes, langs: bundledLanguages });

const buildCodeBlockHTML = (rawCode: string, lang: string, filename: string, theme?: string) => {
  const hast = defaultHighlighter.codeToHast(rawCode, {
    lang: lang,
    theme: theme ?? "github-dark",
  });

  const targetElem = hast.children[0] as Element;

  // Add filename to the code block if it exists
  if (filename !== "" && targetElem) {
    targetElem.properties = {
      class: targetElem.properties.class,
      style: `${targetElem.properties.style}; padding-top: 12px;`,
      tabindex: targetElem.properties.tabindex,
    };

    targetElem.children.unshift({
      type: "element",
      tagName: "div",
      properties: {
        style:
          "width: fit-content; margin-bottom: 16px; padding: 4px 8px; font-size: 14px; color: white; background-color: gray;",
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
