import type { Element } from "hast";
import { h } from "hastscript";

const extractOwner = (pathname: string): string => {
  const pathnameParts = pathname.split("/");
  return pathnameParts[1];
};

const extractRepoName = (pathname: string): string => {
  const pathnameParts = pathname.split("/");
  return pathnameParts[2];
};

const extractFilePath = (pathname: string): string => {
  const pathnameParts = pathname.split("/");
  return pathnameParts.slice(5).join("/");
};

const extractRef = (pathname: string): string => {
  const pathnameParts = pathname.split("/");
  return pathnameParts[4];
};

export type Lines = {
  startLine: number;
  endLine?: number;
};

const extractLines = (hash: string): Lines | undefined => {
  const matches = hash.match(/\d+/g);
  if (!matches) return;

  return matches[0] && matches[1]
    ? {
        startLine: Number.parseInt(matches[0]),
        endLine: Number.parseInt(matches[1]),
      }
    : { startLine: Number.parseInt(matches[0]) };
};

const extractRepoDataFromURL = (url: string) => {
  const base = new URL(url);
  return {
    repoName: extractRepoName(base.pathname),
    owner: extractOwner(base.pathname),
    ref: extractRef(base.pathname),
    path: extractFilePath(base.pathname),
    lines: extractLines(base.hash),
  };
};

const extractCodeByLines = (code: string, lines: Lines | undefined): string => {
  if (!lines) return code;
  const codeLines = code.split("\n");

  if (lines.startLine && lines.endLine) {
    return codeLines.slice(lines.startLine - 1, lines.endLine).join("\n");
  }

  return codeLines[lines.startLine - 1];
};

const buildRequestURL = (owner: string, repoName: string, ref: string, path: string): string => {
  return `https://api.github.com/repos/${owner}/${repoName}/contents/${path}?ref=${ref}`;
};

const buildCodeBlockTitle = (repoName: string, path: string, lines: Lines | undefined): string => {
  return `${repoName}/${path}${
    lines
      ? `#${lines.startLine && lines.endLine ? `L${lines.startLine}-L${lines.endLine}` : `L${lines.startLine}`}`
      : ""
  }`;
};

const createCodeBlock = (title: string, href: string, code: string): Element => {
  return h("div", [
    h("span", { class: ["rehype-embedded-github-code-title"] }, [
      h("a", { href: href }, [h(null, [{ type: "text", value: title }])]),
    ]),
    h("pre", [h("code", [h(null, [{ type: "text", value: code }])])]),
  ]);
};

const createErrBlock = (message: string): Element => {
  return h("div", [h("span", [h(null, [{ type: "text", value: message }])])]);
};

export {
  extractRepoDataFromURL,
  buildRequestURL,
  buildCodeBlockTitle,
  extractCodeByLines,
  createCodeBlock,
  createErrBlock,
};
