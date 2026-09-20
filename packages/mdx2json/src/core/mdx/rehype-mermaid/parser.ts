import rehypeParse from "rehype-parse";
import { unified } from "unified";

const parser = unified().use(rehypeParse, { fragment: true });

export { parser };
