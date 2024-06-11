import type {
  BlockObjectRequest,
  BlockObjectRequestWithoutChildren,
} from "@notionhq/client/build/src/api-endpoints";

export type { BlockObjectRequest, BlockObjectRequestWithoutChildren };

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type BulletedListItemObjectRequest = Expand<
  BlockObjectRequest & { type: "bulleted_list_item" }
>;

export type CodeObjectRequest = Expand<BlockObjectRequest & { type: "code" }>;
export type LanguageRequest = CodeObjectRequest["code"]["language"];

export type DividerObjectRequest = Expand<
  BlockObjectRequest & { type: "divider" }
>;

export type Heading1ObjectRequest = Expand<
  BlockObjectRequest & { type: "heading_1" }
>;
export type Heading2ObjectRequest = Expand<
  BlockObjectRequest & { type: "heading_2" }
>;
export type Heading3ObjectRequest = Expand<
  BlockObjectRequest & { type: "heading_3" }
>;
export type HeadingObjectRequest =
  | Heading1ObjectRequest
  | Heading2ObjectRequest
  | Heading3ObjectRequest;

export type NumberedListItemObjectRequest = Expand<
  BlockObjectRequest & { type: "numbered_list_item" }
>;

export type ParagraphObjectRequest = Expand<
  BlockObjectRequest & { type: "paragraph" }
>;

export type QuoteObjectRequest = Expand<BlockObjectRequest & { type: "quote" }>;

export type RichTextItemRequest =
  ParagraphObjectRequest["paragraph"]["rich_text"][number];
export type RichTextAnnotations = NonNullable<
  (RichTextItemRequest & { type: "text" })["annotations"]
>;
