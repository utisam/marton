import type { Blockquote } from "mdast";
import type { QuoteObjectRequest } from "../notionTypes";
import type Option from "../option";
import { nodeToMarkdown } from "../option";

export function blockquoteToBlocks(
  child: Blockquote,
  option?: Option,
): Iterable<QuoteObjectRequest> {
  return [
    {
      type: "quote",
      quote: {
        rich_text: [
          {
            type: "text",
            text: {
              content: nodeToMarkdown(
                { type: "root", children: child.children },
                option,
              ),
            },
          },
        ],
      },
    },
  ];
}
