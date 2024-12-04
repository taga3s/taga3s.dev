import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

type EmojiMap = { [key: string]: string };

const emojiMap: EmojiMap = {
  ":heart:": "❤️",
  ":ok_hand:": "👌",
  ":thumbsup:": "👍",
  ":clap:": "👏",
  ":pray:": "🙏",
  ":muscle:": "💪",
  ":white_check_mark:": "✅",
};

const remarkEmojiName: Plugin<[], Root> = () => {
  const regex = /:[a-zA-Z0-9_]+:/g;
  return (tree) => {
    visit(tree, "text", (node) => {
      const matches = node.value.match(regex);
      if (matches) {
        for (const match of matches) {
          if (emojiMap[match]) {
            node.value = node.value.replace(match, emojiMap[match]);
          }
        }
      }
    });
  };
};

export default remarkEmojiName;
