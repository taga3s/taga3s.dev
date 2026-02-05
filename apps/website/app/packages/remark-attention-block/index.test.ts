import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { remarkAttentionBlock } from ".";

const MOCK_MARKDOWN = "> [!NOTE]\n> サンプルテキスト";
const EXPECTED_HTML =
  '<div class="remark-atb-base remark-atb-note" data-block-type="note">\n<p>サンプルテキスト</p>\n</div>';

describe("remark-attention-block", () => {
  it("remark-atb-base, remark-atb-note という class と、data-block-type が付与された HTML が出力されること", async () => {
    const process = await unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkAttentionBlock)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(MOCK_MARKDOWN);

    const result = process.toString();

    expect(result).toBe(EXPECTED_HTML);
  });
});
