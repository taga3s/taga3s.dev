import type { Element, Root } from "hast";
import type { Plugin, Transformer } from "unified";
import { visit } from "unist-util-visit";
import {
  type Lines,
  buildCodeBlockTitle,
  buildRequestURL,
  createCodeBlock,
  createErrBlock,
  extractCodeByLines,
  extractRepoDataFromURL,
} from "./utils";

type Option = {
  githubPAT: string;
};

const rehypeGithubEmbed: Plugin<Option[], Root> = (options): Transformer<Root> => {
  const { githubPAT } = options;

  const transform: Transformer<Root> = async (tree) => {
    const githubEmbedPromises: Promise<void>[] = [];

    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubPAT}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    visit(tree, "element", (node, index, parent) => {
      const regex = new RegExp(/https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/blob\/[\w.-]+(\/[^\s]*)?/g);

      if (
        !(node.tagName === "a" || node.tagName === "p") ||
        node.children.length === 0 ||
        node.children[0].type !== "text" ||
        !regex.test(node.children[0].value)
      ) {
        return;
      }

      if (index === undefined || parent === undefined) {
        return;
      }

      if (parent.type === "mdxJsxFlowElement" || parent.type === "mdxJsxTextElement") {
        return;
      }

      type Props = {
        parent: Root | Element;
        href: string;
        owner: string;
        repoName: string;
        ref: string;
        path: string;
        lines: Lines | undefined;
      };

      const githubEmbedPromise = async ({ parent, owner, repoName, ref, href, path, lines }: Props): Promise<void> => {
        const requestUrl = buildRequestURL(owner, repoName, ref, path);

        try {
          const response = await fetch(requestUrl, {
            headers,
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch code from GitHub: ${response.status}`);
          }
          const data = (await response.json()) as {
            content: string;
          };
          const codeBase64 = data.content;
          const code = extractCodeByLines(Buffer.from(codeBase64, "base64").toString("utf-8"), lines);

          const title = buildCodeBlockTitle(repoName, path, lines);

          const element = createCodeBlock(title, href, code);
          parent.children[index] = element;
        } catch (error) {
          const element = createErrBlock(`Something went wrong while rendering the code from GitHub`);
          parent.children[index] = element;
          console.error("Something went wrong", { cause: error });
        }
      };

      const nodeHref = node.children[0].value;
      const { repoName, owner, ref, path, lines } = extractRepoDataFromURL(nodeHref);

      githubEmbedPromises.push(
        githubEmbedPromise({
          parent,
          repoName,
          owner,
          href: nodeHref,
          ref,
          path,
          lines,
        }),
      );
    });

    await Promise.all(githubEmbedPromises);
  };

  return transform;
};

export { rehypeGithubEmbed };
