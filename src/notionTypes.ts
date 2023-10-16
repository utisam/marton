import { BlockObjectRequest } from '@notionhq/client/build/src/api-endpoints';

export type { BlockObjectRequest };

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type Heading1ObjectRequest = Expand<BlockObjectRequest & { type: 'heading_1' }>;
export type Heading2ObjectRequest = Expand<BlockObjectRequest & { type: 'heading_2' }>;
export type Heading3ObjectRequest = Expand<BlockObjectRequest & { type: 'heading_3' }>;
export type HeadingObjectRequest = Heading1ObjectRequest | Heading2ObjectRequest | Heading3ObjectRequest;

export type ParagraphObjectRequest = Expand<BlockObjectRequest & { type: 'paragraph' }>;

export type RichTextItemRequest = ParagraphObjectRequest['paragraph']['rich_text'][number];