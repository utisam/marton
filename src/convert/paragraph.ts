import type { Paragraph } from "mdast";
import type { ParagraphObjectRequest } from "../notionTypes";
import type Option from "../option";
import { phrasingContentToRichText } from "./phrasing";

export function paragraphToBlocks(
  child: Paragraph,
  option?: Option,
): Iterable<ParagraphObjectRequest> {
  return [
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: child.children.flatMap((child) =>
          phrasingContentToRichText(child, option),
        ),
      },
    },
  ];
}
