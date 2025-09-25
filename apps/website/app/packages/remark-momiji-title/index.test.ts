import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { remarkMomijiTitle } from ".";

const MOCK_MARKDOWN = "```ts title='app.ts'\nconsole.log('Hello, World!')\n```";
const EXPECTED_HTML =
  '<pre><code class="language-ts" data-remark-code-title="app.ts">console.log(\'Hello, World!\')\n</code></pre>';

describe("remark-momiji-title", () => {
  it("data-remark-code-titleが付与されたコードブロックのHTMLを生成すること", async () => {
    const process = await unified()
      .use(remarkParse)
      .use(remarkMomijiTitle)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(MOCK_MARKDOWN);

    const result = process.toString();

    expect(result).toBe(EXPECTED_HTML);
  });
});
