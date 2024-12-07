import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import {
  buildRequestURL,
  extractCodeByLines,
  extractFilePathFromURL,
  extractLinesFromURL,
  extractRefFromURL,
  extractRepoNameFromURL,
} from "./util";

interface EmbeddedGithubCode {
  url: string;
  index: number;
  parent: Root | Element;
}

const rehypeEmbeddedGithubCode: Plugin<[], Root> = () => {
  const embeddedGithubCodes: EmbeddedGithubCode[] = [];

  return async (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName !== "a" ||
        node.properties["data-remark-target"] !== "remark-embedded-github-code" ||
        typeof node.properties.href !== "string"
      ) {
        return;
      }

      if (index === undefined || parent === undefined) {
        return;
      }

      if (parent.type !== "root" && parent.type !== "element") {
        return;
      }

      embeddedGithubCodes.push({
        url: node.properties.href,
        index,
        parent,
      });
    });

    await Promise.all(
      embeddedGithubCodes.map(async (embeddedGithubCode) => {
        const repoName = extractRepoNameFromURL(embeddedGithubCode.url);
        const ref = extractRefFromURL(embeddedGithubCode.url);
        const path = extractFilePathFromURL(embeddedGithubCode.url);
        const lines = extractLinesFromURL(embeddedGithubCode.url);

        const requestUrl = buildRequestURL(repoName, ref, path);

        const response = await fetch(requestUrl, {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_PAT}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        const content = (await response.json()) as { content: string };

        const codeBase64 = content.content;
        let code = Buffer.from(codeBase64, "base64").toString("utf-8");
        if (lines) {
          code = extractCodeByLines(code, lines);
        }

        const codeElement: Element = {
          type: "element",
          tagName: "code",
          properties: {
            className: "",
          },
          children: [
            {
              type: "text",
              value: code,
            },
          ],
        };

        const preElement: Element = {
          type: "element",
          tagName: "pre",
          children: [codeElement],
          properties: {},
        };

        embeddedGithubCode.parent.children[embeddedGithubCode.index] = preElement;
      }),
    );
  };
};

export { rehypeEmbeddedGithubCode };
