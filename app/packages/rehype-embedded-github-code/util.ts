const extractRepoNameFromURL = (url: string): string => {
  const base = url.replace("https://github.com/", "");
  const urlParts = base.split("/");
  return urlParts.slice(0, 2).join("/");
};

const extractFilePathFromURL = (url: string): string => {
  const base = url.replace("https://github.com/", "");
  const urlParts = base.split("/");
  const result = urlParts.slice(4).join("/");
  const hashIndex = result.indexOf("#");
  if (hashIndex === -1) {
    return result;
  }
  return result.slice(0, hashIndex);
};

const extractRefFromURL = (url: string): string => {
  const base = url.replace("https://github.com/", "");
  const urlParts = base.split("/");
  return urlParts[3];
};

type LineNumbers = {
  startLine: number;
  endLine: number;
};

const extractLinesFromURL = (url: string): LineNumbers | undefined => {
  const base = url.replace("https://github.com/", "");
  const urlParts = base.split("/");
  const result = urlParts.slice(4).join("/");
  const hashIndex = result.indexOf("#");
  if (hashIndex === -1) {
    return;
  }
  const hash = result.slice(hashIndex + 1);
  const numbers = hash.match(/\d+/g);
  if (!numbers) return;
  return {
    startLine: Number.parseInt(numbers[0]),
    endLine: Number.parseInt(numbers[1]),
  };
};

const buildRequestURL = (repo: string, ref: string, path: string): string => {
  return `https://api.github.com/repos/${repo}/contents/${path}?ref=${ref}`;
};

const extractCodeByLines = (code: string, lines: LineNumbers): string => {
  const codeLines = code.split("\n");
  return codeLines.slice(lines.startLine - 1, lines.endLine).join("\n");
};

export {
  extractRepoNameFromURL,
  extractFilePathFromURL,
  extractRefFromURL,
  extractLinesFromURL,
  buildRequestURL,
  extractCodeByLines,
};
