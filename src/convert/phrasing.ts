import type { PhrasingContent } from "mdast";
import type { RichTextAnnotations, RichTextItemRequest } from "../notionTypes";
import type Option from "../option";
import { nodeToMarkdown, unsupportedNode } from "../option";

export function phrasingContentToRichText(
  child: PhrasingContent,
  option?: Option,
): RichTextItemRequest[] {
  switch (child.type) {
    case "text":
      return [
        {
          type: "text",
          text: { content: child.value },
        },
      ];
    case "inlineCode":
      return [
        {
          type: "text",
          text: { content: child.value },
          annotations: { code: true },
        },
      ];
    case "emphasis":
      return child.children
        .flatMap((child) => phrasingContentToRichText(child, option))
        .map(addAnnotation({ italic: true }, option));
    case "strong":
      return child.children
        .flatMap((child) => phrasingContentToRichText(child, option))
        .map(addAnnotation({ bold: true }, option));
    case "delete":
      return child.children
        .flatMap((child) => phrasingContentToRichText(child, option))
        .map(addAnnotation({ strikethrough: true }, option));
    case "link":
      return [
        {
          type: "text",
          text: {
            content: child.children
              .map((child) => nodeToMarkdown(child, option))
              .join(" "),
            link: { url: child.url },
          },
        },
      ];
    default:
      unsupportedNode(child, option);
      return [
        {
          type: "text",
          text: { content: nodeToMarkdown(child, option) },
        },
      ];
  }
}

function addAnnotation(
  annotations: RichTextAnnotations,
  option?: Option,
): (richText: RichTextItemRequest) => RichTextItemRequest {
  return (richText: RichTextItemRequest) => {
    if (richText.type !== "text") {
      throw Error(`Nested ${richText.type} is not supported.`);
    }
    return {
      type: "text",
      text: richText.text,
      annotations: { ...richText.annotations, ...annotations },
    };
  };
}
