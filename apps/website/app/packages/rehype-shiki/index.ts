import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

const highlighter = await createHighlighterCore({
  themes: [import("@shikijs/themes/github-dark-default")],
  langs: [import("@shikijs/langs/javascript"), import("@shikijs/langs/typescript"), import("@shikijs/langs/rust")],
  engine: createOnigurumaEngine(() => import("shiki/wasm")),
});

export { highlighter, rehypeShikiFromHighlighter };
