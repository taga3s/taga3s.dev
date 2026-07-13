import fs from "node:fs/promises";
import path from "node:path";

export const getFileContents = async (pathdir: string): Promise<{ origName: string; content: string }[]> => {
  const filePaths = await fs.readdir(pathdir, { withFileTypes: true });

  const fileContents: { origName: string; content: string }[] = [];

  for (const fp of filePaths) {
    const actual = path.join(fp.parentPath, fp.name);
    const content = await fs.readFile(actual, { encoding: "utf8" });
    fileContents.push({ origName: fp.name, content });
  }

  return fileContents;
};

export const output = async (raw: string, outpath: string): Promise<void> => {
  await fs.writeFile(outpath, raw);
};
