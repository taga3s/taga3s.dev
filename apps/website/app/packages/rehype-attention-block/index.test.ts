import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { remarkAttentionBlock } from "../remark-attention-block";
import { rehypeAttentionBlock } from ".";
import remarkBreaks from "remark-breaks";

const processMarkdown = (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkAttentionBlock)
    .use(remarkRehype)
    .use(rehypeAttentionBlock)
    .use(rehypeStringify)
    .process(markdown);

const testCases = [
  {
    type: "NOTE",
    markdown: "> [!NOTE]\n> サンプルテキスト",
    expectedHtml:
      '<div class="remark-atb-base remark-atb-note" data-block-type="note"><div class="remark-atb-icon note"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"></path></svg><span class="remark-atb-label">NOTE</span></div>\n<p>サンプルテキスト</p>\n</div>',
  },
  {
    type: "WARNING",
    markdown: "> [!WARNING]\n> サンプルテキスト",
    expectedHtml:
      '<div class="remark-atb-base remark-atb-warning" data-block-type="warning"><div class="remark-atb-icon warning"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg><span class="remark-atb-label">WARNING</span></div>\n<p>サンプルテキスト</p>\n</div>',
  },
  {
    type: "TIP",
    markdown: "> [!TIP]\n> サンプルテキスト",
    expectedHtml:
      '<div class="remark-atb-base remark-atb-tip" data-block-type="tip"><div class="remark-atb-icon tip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path></svg><span class="remark-atb-label">TIP</span></div>\n<p>サンプルテキスト</p>\n</div>',
  },
];

describe("rehype-attention-block", () => {
  it.each(testCases)("$type の強調ブロックの HTML が出力されること", async ({ markdown, expectedHtml }) => {
    const result = await processMarkdown(markdown);
    expect(result.toString()).toBe(expectedHtml);
  });
});
