import type { Heading } from "mdast";
import type { HeadingObjectRequest, RichTextItemRequest } from "../notionTypes";
import type Option from "../option";
import { phrasingContentToRichText } from "./phrasing";

export function headingToBlocks(
  child: Heading,
  option?: Option,
): Iterable<HeadingObjectRequest> {
  if (child.depth === 1) {
    return [
      {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: phrasingContentsToRichText(child, option),
        },
      },
    ];
  }
  if (child.depth === 2) {
    return [
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: phrasingContentsToRichText(child, option),
        },
      },
    ];
  }
  return [
    {
      object: "block",
      type: "heading_3",
      heading_3: {
        rich_text: phrasingContentsToRichText(child, option),
      },
    },
  ];
}

function phrasingContentsToRichText(
  child: Heading,
  option?: Option,
): RichTextItemRequest[] {
  return child.children.flatMap((child) =>
    phrasingContentToRichText(child, option),
  );
}
