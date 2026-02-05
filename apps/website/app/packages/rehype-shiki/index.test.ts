import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import { rehypeShikiFromHighlighter, highlighter, transformTitle } from "../rehype-shiki";

const MOCK_MARKDOWN = "```ts\nconsole.log('Hello, World!')\n```";
const EXPECTED_HTML =
  '<pre class="shiki github-dark-default" style="background-color:#0d1117;color:#e6edf3" tabindex="0"><code><span class="line"><span style="color:#E6EDF3">console.</span><span style="color:#D2A8FF">log</span><span style="color:#E6EDF3">(</span><span style="color:#A5D6FF">\'Hello, World!\'</span><span style="color:#E6EDF3">)</span></span></code></pre>';

const MOCK_MARKDOWN_WITH_TITLE = "```ts title=\"sample.ts\"\nconsole.log('Hello, World!')\n```";
const EXPECTED_HTML_WITH_TITLE =
  '<pre class="shiki github-dark-default" style="background-color:#0d1117;color:#e6edf3;position:relative;padding-top:36px;" tabindex="0"><div style="position: absolute; top: 0; left: 16px; width: fit-content; margin-bottom: 16px; padding: 4px 8px; font-size: 12px; background: #577C8A">sample.ts</div><code><span class="line"><span style="color:#E6EDF3">console.</span><span style="color:#D2A8FF">log</span><span style="color:#E6EDF3">(</span><span style="color:#A5D6FF">\'Hello, World!\'</span><span style="color:#E6EDF3">)</span></span></code></pre>';

describe("rehype-shiki", () => {
  it("test", async () => {
    const process = await unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkRehype)
      .use(rehypeShikiFromHighlighter, ...([highlighter, { theme: "github-dark-default" }] as any))
      .use(rehypeStringify)
      .process(MOCK_MARKDOWN);

    const result = process.toString();

    expect(result).toBe(EXPECTED_HTML);
  });

  it("test with title in meta", async () => {
    const process = await unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkRehype)
      .use(
        rehypeShikiFromHighlighter,
        ...([highlighter, { theme: "github-dark-default", transformers: [transformTitle()] }] as any),
      )
      .use(rehypeStringify)
      .process(MOCK_MARKDOWN_WITH_TITLE);

    const result = process.toString();

    expect(result).toBe(EXPECTED_HTML_WITH_TITLE);
  });
});
