import { gfmToMarkdown } from "mdast-util-gfm";
import { toMarkdown } from "mdast-util-to-markdown";
import type { Nodes } from "mdast-util-to-markdown/lib/types";
import type { Node } from "unified/lib";

export default interface Option {
  logWarn?: (message: string) => void;

  toMarkdown?: (tree: Nodes) => string;

  /** If true, an error will occur when an unsupported Markdown node was found. */
  unsupportedError?: boolean;
}

export function unsupportedNode(
  target: Node | string,
  option: Option | undefined,
) {
  const message =
    typeof target === "string" ? target : `${target.type} is not supported`;
  if (option?.unsupportedError) {
    throw new Error(message);
  }
  option?.logWarn?.(message);
}

export function nodeToMarkdown(
  tree: Nodes,
  option: Option | undefined,
): string {
  return (
    option?.toMarkdown?.(tree) ??
    toMarkdown(tree, { extensions: [gfmToMarkdown()] }).trim()
  );
}
