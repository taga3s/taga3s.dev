import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const remarkEmbeddedGithubCode: Plugin<[], Root> = () => {
  //TODO: check this regex
  const regex = /https:\/\/github\.com\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+\/blob\/[a-zA-Z0-9._-]+\/?[^\s]*/g;
  return (tree) => {
    visit(tree, "link", (node, _, parent) => {
      if (node.url && typeof node.url === "string") {
        const matches = node.url.match(regex);
        if (matches) {
          node.data = {
            hProperties: {
              "data-remark-target": "remark-embedded-github-code",
            },
          };

          if (parent && parent.type === "paragraph") {
            parent.data = {
              hName: "div",
            };
          }
        }
      }
    });
  };
};

export { remarkEmbeddedGithubCode };
