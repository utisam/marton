import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { Compatible } from "vfile";
import { rootToBlocks, rootToRichText } from "./convert/root";
import type { BlockObjectRequest, RichTextItemRequest } from "./notionTypes";
import type Option from "./option";

export { rootToBlocks, rootToRichText, type Option };

export function markdownToBlocks(
  file: Compatible,
  option?: Option,
): BlockObjectRequest[] {
  const root = unified().use(remarkParse).use(remarkGfm).parse(file);
  return Array.from(rootToBlocks(root, option));
}

export function markdownToRichText(
  file: Compatible,
  option?: Option,
): RichTextItemRequest[] {
  const root = unified().use(remarkParse).use(remarkGfm).parse(file);
  return Array.from(rootToRichText(root, option));
}
