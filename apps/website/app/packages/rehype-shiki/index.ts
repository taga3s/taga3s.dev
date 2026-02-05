import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import type { Element } from "hast";
import { createHighlighterCore, type ShikiTransformer } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

// see: https://shiki.matsu.io/guide/transformers
const transformTitle = (): ShikiTransformer => {
  return {
    name: "my-transformer",
    enforce: "pre",
    pre(node) {
      const metaString = this.options.meta?.__raw;
      if (!metaString || !metaString.includes("title=")) return;

      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""];
      if (!title) return;

      const titleEle: Element = {
        type: "element",
        tagName: "div",
        children: [
          {
            type: "text",
            value: title,
          },
        ],
        properties: {
          style: `position: sticky; top: 0; left: 0; width: fit-content; margin-bottom: 16px; padding: 4px 8px; font-size: 12px; background: #577C8A`,
        },
      };

      node.properties.style = `${node.properties.style};position:relative;padding-top:0px;`;
      node.children.unshift(titleEle);
    },
  };
};

const highlighter = await createHighlighterCore({
  themes: [import("@shikijs/themes/github-dark-default")],
  langs: [import("@shikijs/langs/javascript"), import("@shikijs/langs/typescript"), import("@shikijs/langs/rust")],
  engine: createOnigurumaEngine(() => import("shiki/wasm")),
});

export { highlighter, rehypeShikiFromHighlighter, transformTitle };
