import { PhrasingContent } from 'remark-github/lib';
import { RichTextAnnotations, RichTextItemRequest } from '../notionTypes';

export function phrasingContentToRichText(child: PhrasingContent): RichTextItemRequest[] {
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
            .flatMap(phrasingContentToRichText)
            .map(addAnnotation({ italic: true }));
    } else if (child.type === 'strong') {
        return child.children
            .flatMap(phrasingContentToRichText)
            .map(addAnnotation({ bold: true }));
    } else if (child.type === 'delete') {
        return child.children
            .flatMap(phrasingContentToRichText)
            .map(addAnnotation({ strikethrough: true }));
    }
    throw new Error(`${child.type} is not supported.`);
}

function addAnnotation(annotations: RichTextAnnotations): (richText: RichTextItemRequest) => RichTextItemRequest {
    return (richText: RichTextItemRequest) => {
        if (richText.type !== 'text') {
            throw new Error(`Nested ${richText.type} is not supported.`);
        }
        return {
            type: 'text',
            text: richText.text,
            annotations: { ...richText.annotations, ...annotations },
        };
    };
}
