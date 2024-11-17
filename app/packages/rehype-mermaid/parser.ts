import { unified } from "unified";
import rehypeParse from "rehype-parse";

const parser = unified().use(rehypeParse, { fragment: true });

export { parser };
