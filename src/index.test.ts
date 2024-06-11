import { markdownToBlocks, markdownToRichText } from "./index";

describe("markdownToBlocks", () => {
  test("convert text", () => {
    const result = markdownToBlocks(
      `
# Title

This is body.

---

> This is quote.

\`\`\`js
const a = [];
\`\`\`

        `.trim(),
      { unsupportedError: true },
    );
    expect(result).toStrictEqual([
      {
        heading_1: {
          rich_text: [{ text: { content: "Title" }, type: "text" }],
        },
        object: "block",
        type: "heading_1",
      },
      {
        object: "block",
        paragraph: {
          rich_text: [{ text: { content: "This is body." }, type: "text" }],
        },
        type: "paragraph",
      },
      {
        type: "divider",
        divider: {},
      },
      {
        quote: {
          rich_text: [
            {
              text: { content: "This is quote." },
              type: "text",
            },
          ],
        },
        type: "quote",
      },
      {
        code: {
          language: "javascript",
          rich_text: [
            {
              text: {
                content: "const a = [];",
              },
              type: "text",
            },
          ],
        },
        type: "code",
      },
    ]);
  });
  test("convert bulleted list", () => {
    const result = markdownToBlocks(
      `
* aaa
  * bbb
  * ccc
* ddd
        `.trim(),
    );
    // console.log(JSON.stringify(result, null, ' '));
    expect(result).toStrictEqual([
      {
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: { content: "aaa" },
            },
          ],
          children: [
            {
              type: "bulleted_list_item",
              bulleted_list_item: {
                rich_text: [
                  {
                    type: "text",
                    text: { content: "bbb" },
                  },
                ],
              },
            },
            {
              type: "bulleted_list_item",
              bulleted_list_item: {
                rich_text: [
                  {
                    type: "text",
                    text: { content: "ccc" },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: { content: "ddd" },
            },
          ],
        },
      },
    ]);
  });
});

describe("markdownToRichText", () => {
  test("convert text", () => {
    const result = markdownToRichText("This is text", {
      unsupportedError: true,
    });
    expect(result).toStrictEqual([
      {
        type: "text",
        text: { content: "This is text" },
      },
    ]);
  });
  test("convert inlineCode", () => {
    const result = markdownToRichText("This is `inlineCode`", {
      unsupportedError: true,
    });
    expect(result).toStrictEqual([
      {
        type: "text",
        text: { content: "This is " },
      },
      {
        type: "text",
        text: { content: "inlineCode" },
        annotations: { code: true },
      },
    ]);
  });
  test("convert emphasis", () => {
    const result = markdownToRichText("This is *emphasis*", {
      unsupportedError: true,
    });
    expect(result).toStrictEqual([
      {
        type: "text",
        text: { content: "This is " },
      },
      {
        type: "text",
        text: { content: "emphasis" },
        annotations: { italic: true },
      },
    ]);
  });
  test("convert bold", () => {
    const result = markdownToRichText("This is **bold**", {
      unsupportedError: true,
    });
    expect(result).toStrictEqual([
      {
        type: "text",
        text: { content: "This is " },
      },
      {
        type: "text",
        text: { content: "bold" },
        annotations: { bold: true },
      },
    ]);
  });
  test("convert delete", () => {
    const result = markdownToRichText("This is ~~delete~~", {
      unsupportedError: true,
    });
    expect(result).toStrictEqual([
      {
        type: "text",
        text: { content: "This is " },
      },
      {
        type: "text",
        text: { content: "delete" },
        annotations: { strikethrough: true },
      },
    ]);
  });
  test("convert link", () => {
    const result = markdownToRichText("This is [link](http://example.com)", {
      unsupportedError: true,
    });
    expect(result).toStrictEqual([
      {
        type: "text",
        text: { content: "This is " },
      },
      {
        type: "text",
        text: {
          content: "link",
          link: { url: "http://example.com" },
        },
      },
    ]);
  });
  test("convert nested", () => {
    const result = markdownToRichText("This is **~~delete~~ in bold**", {
      unsupportedError: true,
    });
    expect(result).toStrictEqual([
      {
        type: "text",
        text: { content: "This is " },
      },
      {
        type: "text",
        text: { content: "delete" },
        annotations: { bold: true, strikethrough: true },
      },
      {
        type: "text",
        text: { content: " in bold" },
        annotations: { bold: true },
      },
    ]);
  });
});
