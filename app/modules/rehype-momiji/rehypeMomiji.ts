import { bundledLanguages, bundledThemes, type BundledLanguage, type BundledTheme } from "shiki";
import type { Plugin } from "unified";
import type { Text, Element, Root } from "hast";
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
};

const defaultHighlighter = await getHighlighter({ themes: bundledThemes, langs: bundledLanguages });

const rehypeMomiji: Plugin = (options: Options = {}) => {
  const langs = defaultHighlighter.getLoadedLanguages();
  const { theme = "github-dark-default", fallbackLang = "c", filenameBGColor, filenameTextColor } = options;

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
          ${highlightCode}
        </div>
      `;

      const parsedRoot = parser.parse(container);
      node.tagName = "div";
      node.children = parsedRoot.children as Element[];
    });
  };
};

export default rehypeMomiji;
