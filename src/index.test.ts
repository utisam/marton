import { markdownToBlocks, markdownToRichText } from "./index";

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

describe('markdownToRichText', () => {
    test('convert text', () => {
        const result = markdownToRichText("This is text");
        expect(result).toStrictEqual([
            {
                "type": "text",
                "text": { "content": "This is text" },
            },
        ]);
    });
    test('convert inlineCode', () => {
        const result = markdownToRichText("This is `inlineCode`");
        expect(result).toStrictEqual([
            {
                "type": "text",
                "text": { "content": "This is " },
            },
            {
                "type": "text",
                "text": { "content": "inlineCode" },
                "annotations": { "code": true },
            },
        ]);
    });
    test('convert emphasis', () => {
        const result = markdownToRichText("This is *emphasis*");
        expect(result).toStrictEqual([
            {
                "type": "text",
                "text": { "content": "This is " },
            },
            {
                "type": "text",
                "text": { "content": "emphasis" },
                "annotations": { "italic": true },
            },
        ]);
    });
    test('convert bold', () => {
        const result = markdownToRichText("This is **bold**");
        expect(result).toStrictEqual([
            {
                "type": "text",
                "text": { "content": "This is " },
            },
            {
                "type": "text",
                "text": { "content": "bold" },
                "annotations": { "bold": true },
            },
        ]);
    });
    test('convert delete', () => {
        const result = markdownToRichText("This is ~~delete~~");
        expect(result).toStrictEqual([
            {
                "type": "text",
                "text": { "content": "This is " },
            },
            {
                "type": "text",
                "text": { "content": "delete" },
                "annotations": { "strikethrough": true },
            },
        ]);
    });
    test('convert nested', () => {
        const result = markdownToRichText("This is **~~delete~~ in bold**");
        expect(result).toStrictEqual([
            {
                "type": "text",
                "text": { "content": "This is " },
            },
            {
                "type": "text",
                "text": { "content": "delete" },
                "annotations": { "bold": true, "strikethrough": true },
            },
            {
                "type": "text",
                "text": { "content": " in bold" },
                "annotations": { "bold": true },
            },
        ]);
    });
});