import type { Paragraph, Root, RootContent } from "mdast";
import type { BlockObjectRequest, RichTextItemRequest } from "../notionTypes";
import type Option from "../option";
import { nodeToMarkdown, unsupportedNode } from "../option";
import { blockquoteToBlocks } from "./blockquote";
import { codeToBlocks } from "./code";
import { headingToBlocks } from "./heading";
import { listToBlocks } from "./list";
import { paragraphToBlocks } from "./paragraph";
import { phrasingContentToRichText } from "./phrasing";
import { thematicBreakToBlocks } from "./thematicBreak";

export function* rootToBlocks(
  root: Root,
  option?: Option,
): Iterable<BlockObjectRequest> {
  for (const child of root.children) {
    yield* rootContentToBlocks(child, option);
  }
}

function rootContentToBlocks(
  child: RootContent,
  option?: Option,
): Iterable<BlockObjectRequest> {
  switch (child.type) {
    case "blockquote":
      return blockquoteToBlocks(child, option);
    case "code":
      return codeToBlocks(child, option);
    case "heading":
      return headingToBlocks(child, option);
    case "thematicBreak":
      return thematicBreakToBlocks(child, option);
    case "paragraph":
      return paragraphToBlocks(child, option);
    case "list":
      return listToBlocks(child, option);
    default:
      unsupportedNode(child, option);
      return [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: { content: nodeToMarkdown(child, option) },
              },
            ],
          },
        },
      ];
  }
}

export function rootToRichText(
  root: Root,
  option?: Option,
): Iterable<RichTextItemRequest> {
  const first = root.children[0];
  if (first?.type === "paragraph") {
    return (first as Paragraph).children.flatMap((child) =>
      phrasingContentToRichText(child, option),
    );
  }
  throw new Error(`Root content must be a paragraph: ${first?.type}`);
}
