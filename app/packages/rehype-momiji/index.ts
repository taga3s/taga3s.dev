import { bundledLanguages, bundledThemes, type BundledLanguage, type BundledTheme } from "shiki";
import type { Plugin } from "unified";
import type { ElementContent, Root } from "hast";
import { visit } from "unist-util-visit";
import { getHighlighter } from "./highlighter";
import { buildCodeBlock } from "./buildCodeBlock";

interface Option {
  theme?: BundledTheme;
  fallbackLang?: BundledLanguage;
  excludeLangs?: string[];
  filenameBGColor?: string;
  filenameTextColor?: string;
}

const defaultHighlighter = await getHighlighter({ themes: bundledThemes, langs: bundledLanguages });

const rehypeMomiji: Plugin<Option[], Root> = (options) => {
  const {
    theme = "github-dark-default",
    fallbackLang = "c",
    excludeLangs,
    filenameBGColor,
    filenameTextColor,
  } = options;

  const langs = defaultHighlighter.getLoadedLanguages();

  const parseLanguage = (classNames: string[]): string | undefined => {
    for (const className of classNames) {
      if (className.startsWith("language-")) {
        return className.replace("language-", "");
      }
    }
    return;
  };

  const checkSupportedLanguage = (lang: string): string => {
    if (langs.includes(lang)) return lang;
    return fallbackLang;
  };

  return (tree) => {
    visit(tree, "element", (node) => {
      // Check if the node is a pre tag with a single child
      if (!(node.tagName === "pre" && Array.isArray(node.children) && node.children.length === 1)) {
        return;
      }

      // Check if the child is a code tag
      const [codeElem] = node.children;
      if (
        !(
          codeElem.type === "element" &&
          codeElem !== null &&
          typeof codeElem === "object" &&
          codeElem.tagName === "code"
        )
      ) {
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
      if (!(textNode.type === "text" && typeof textNode.value === "string")) {
        return;
      }

      const rawCode = textNode.value.trim();

      // Parse the language from the class names and check if it is supported
      const lang = parseLanguage(classNames);
      if (!lang) {
        return;
      }

      // Check if the language should be excluded
      if (excludeLangs?.includes(lang)) {
        return;
      }

      const supportedLang = checkSupportedLanguage(lang);

      const filename = codeElem.properties["data-remark-code-title"] ?? "";

      const codeBlock = buildCodeBlock(
        defaultHighlighter,
        rawCode,
        supportedLang,
        theme,
        String(filename),
        filenameBGColor,
        filenameTextColor,
      );
      if (!codeBlock) return;

      node.tagName = "div";
      node.children = [codeBlock];
      node.properties.style = "position: relative;";
    });
  };
};

export { rehypeMomiji };
