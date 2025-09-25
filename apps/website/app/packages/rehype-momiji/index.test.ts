import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import { rehypeMomiji } from ".";

const MOCK_MARKDOWN = "```ts\nconsole.log('Hello, World!')\n```";
const EXPECTED_HTML =
  '<div style="position: relative;"><pre class="shiki github-dark-default" style="background-color:#0d1117;color:#e6edf3" tabindex="0"><code><span class="line"><span style="color:#E6EDF3">console.</span><span style="color:#D2A8FF">log</span><span style="color:#E6EDF3">(</span><span style="color:#A5D6FF">\'Hello, World!\'</span><span style="color:#E6EDF3">)</span></span></code></pre></div>';

describe("rehype-momiji", () => {
  it("test", async () => {
    const process = await unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkRehype)
      .use(rehypeMomiji, { excludeLangs: ["mermaid"] })
      .use(rehypeStringify)
      .process(MOCK_MARKDOWN);

    const result = process.toString();

    expect(result).toBe(EXPECTED_HTML);
  });
});
