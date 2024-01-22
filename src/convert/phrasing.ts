import { PhrasingContent } from 'mdast';
import { RichTextAnnotations, RichTextItemRequest } from '../notionTypes';
import Option, { nodeToMarkdown, unsupportedNode } from '../option';

export function phrasingContentToRichText(child: PhrasingContent, option?: Option): RichTextItemRequest[] {
    if (child.type === 'text') {
        return [{
            type: 'text',
            text: { content: child.value },
        }];
    } else if (child.type === 'inlineCode') {
        return [{
            type: 'text',
            text: { content: child.value },
            annotations: { code: true },
        }];
    } else if (child.type === 'emphasis') {
        return child.children
            .flatMap((child) => phrasingContentToRichText(child, option))
            .map(addAnnotation({ italic: true }, option));
    } else if (child.type === 'strong') {
        return child.children
            .flatMap((child) => phrasingContentToRichText(child, option))
            .map(addAnnotation({ bold: true }, option));
    } else if (child.type === 'delete') {
        return child.children
            .flatMap((child) => phrasingContentToRichText(child, option))
            .map(addAnnotation({ strikethrough: true }, option));
    }
    unsupportedNode(child, option);
    return [{
        type: 'text',
        text: { content: nodeToMarkdown(child, option) },
    }];
}

function addAnnotation(annotations: RichTextAnnotations, option?: Option): (richText: RichTextItemRequest) => RichTextItemRequest {
    return (richText: RichTextItemRequest) => {
        if (richText.type !== 'text') {
            throw Error(`Nested ${richText.type} is not supported.`);
        }
        return {
            type: 'text',
            text: richText.text,
            annotations: { ...richText.annotations, ...annotations },
        };
    };
}
