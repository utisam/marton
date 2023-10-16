import { PhrasingContent } from 'remark-github/lib';
import { RichTextItemRequest } from '../notionTypes';

export function phrasingContentToRichText(child: PhrasingContent): RichTextItemRequest {
    if (child.type === 'text') {
        return {
            type: 'text',
            text: { content: child.value },
        };
    }
    throw new Error('Function not implemented.');
}
