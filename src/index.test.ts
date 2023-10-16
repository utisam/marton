import { markdownToBlocks } from "./index";

describe('markdownToBlocks', () => {
    test('convert text', () => {
        const result = markdownToBlocks(`
# Title

This is body.
        `.trim());
        expect(result).toStrictEqual([
            {
                "heading_1": {
                    "rich_text": [
                        { "text": { "content": "Title" }, "type": "text" },
                    ]
                },
                "object": "block",
                "type": "heading_1"
            },
            {
                "object": "block",
                "paragraph": {
                    "rich_text": [
                        { "text": { "content": "This is body." }, "type": "text" },
                    ]
                }, "type": "paragraph"
            },
        ]);
    });
});