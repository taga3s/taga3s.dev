import { bundledLanguages, bundledThemes, type BundledLanguage, type BundledTheme } from "shiki";
import type { Plugin } from "unified";
import type { Text, Element } from "hast";
import { visit } from "unist-util-visit";
import { getHighlighter } from "./highlighter";
import { parser } from "./parser";
import { isArray, isObject, isString } from "./utils/checkTypeOfOperandValue";
import { buildCodeBlockHTML } from "./buildCodeBlockHTML";

type Options = {
  theme?: BundledTheme;
  fallbackLang?: BundledLanguage;
  filenameBGColor?: string;
  filenameTextColor?: string;
  copyButton?: {
    isShowed: boolean;
  };
};

const defaultHighlighter = await getHighlighter({ themes: bundledThemes, langs: bundledLanguages });

const rehypeMomiji: Plugin = (options: Options = {}) => {
  const langs = defaultHighlighter.getLoadedLanguages();
  const {
    theme = "github-dark-default",
    fallbackLang = "c",
    filenameBGColor,
    filenameTextColor,
    copyButton = { isShowed: true },
  } = options;

  const parseLanguage = (classNames: string[]): string | undefined => {
    for (const className of classNames) {
      if (className.startsWith("language-")) {
        return className.replace("language-", "");
      }
    }
    return;
  };

  const checkSupportedLanguage = (lang?: string): string | undefined => {
    if (lang && langs.includes(lang)) return lang;
    return fallbackLang;
  };

  return (node) => {
    visit(node, "element", (node: Element) => {
      // Check if the node is a pre tag with a single child
      if (!(node.tagName === "pre" && isArray(node.children) && node.children.length === 1)) {
        return;
      }

      // Check if the child is a code tag
      const codeElem = node.children[0] as Element;
      if (!(isObject(codeElem) && codeElem.tagName === "code")) {
        return;
      }

      // Check if the code tag has a className property
      const classNames = codeElem.properties?.className;
      if (!(isArray(classNames) && classNames.length > 0 && classNames.every(isString))) {
        return;
      }

      // Check if the code tag has a text child
      const textNode = codeElem.children[0] as Text;
      if (!isString(textNode.value)) {
        return;
      }

      const rawCode = textNode.value.trim();

      // Parse the language from the class names and check if it is supported
      const lang = parseLanguage(classNames);
      const supportedLang = checkSupportedLanguage(lang);
      if (!supportedLang) {
        return;
      }

      const filename = (codeElem.properties["data-remark-code-filename"] as string) ?? "";

      const highlightCode = buildCodeBlockHTML(
        rawCode,
        supportedLang,
        theme,
        filename,
        filenameBGColor,
        filenameTextColor,
      );

      const container = `
        <div style="position: relative; display: flex; flex-direction: column; gap: 2px;">
        ${
          copyButton.isShowed
            ? `
          <button style="position: absolute; top: 16px; right: 16px;" onclick="
            navigator.clipboard.writeText(document.getElementById('rehype-momiji-code-block-content').innerText);
            const copiedElem = document.getElementById('rehype-momiji-code-block-copied');
            copiedElem.style.display = 'block';
            setTimeout(() => {
              copiedElem.style.display = 'none';
            }, 2000);
          ">
            <svg width="24" height="24" fill="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
          </button>
          `
            : ""
        }
          ${highlightCode}
        </div>
        ${
          copyButton.isShowed
            ? `
            <p id="rehype-momiji-code-block-content" style="display: none;">${rawCode}</p>
          `
            : ""
        }
        <span id="rehype-momiji-code-block-copied" style="display: none;">copied</span>
      `;

      const parsedRoot = parser.parse(container);
      node.tagName = "div";
      node.children = parsedRoot.children as Element[];
    });
  };
};

export default rehypeMomiji;
