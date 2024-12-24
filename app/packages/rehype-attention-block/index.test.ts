import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { remarkAttentionBlock } from "../remark-attention-block";
import { rehypeAttentionBlock } from ".";
import remarkBreaks from "remark-breaks";

const MOCK_MARKDOWN = "> [!NOTE]\n> サンプルテキスト";
const EXPECTED_HTML =
  '<div class="remark-atb-base remark-atb-note" data-block-type="note"><div class="remark-atb-icon note"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"></path></svg><span class="remark-atb-label">NOTE</span></div>\n<p>サンプルテキスト</p>\n</div>';

describe("rehype-attention-block", () => {
  it("NOTE の強調ブロックの HTML が出力されること", async () => {
    const process = await unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkAttentionBlock)
      .use(remarkRehype)
      .use(rehypeAttentionBlock)
      .use(rehypeStringify)
      .process(MOCK_MARKDOWN);

    const result = process.toString();

    expect(result).toBe(EXPECTED_HTML);
  });
});
