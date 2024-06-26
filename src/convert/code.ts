import type { Code } from "mdast";
import type { CodeObjectRequest, LanguageRequest } from "../notionTypes";
import type Option from "../option";

export function codeToBlocks(
  child: Code,
  option?: Option,
): Iterable<CodeObjectRequest> {
  return [
    {
      type: "code",
      code: {
        rich_text: [
          {
            type: "text",
            text: {
              content: child.value,
            },
          },
        ],
        language: convertLanguage(child.lang, option) ?? "plain text",
      },
    },
  ];
}

function convertLanguage(
  lang: string | null | undefined,
  option?: Option,
): LanguageRequest | undefined {
  if (!lang) {
    return;
  }

  const lower = lang.toLocaleLowerCase("en-US");
  if (notionLanguages.has(lower)) {
    return lower as LanguageRequest;
  }

  const syn = languageSynonyms[lower];
  if (syn) {
    return syn;
  }

  const message = `Language ${lang} is not supported.`;
  if (option?.unsupportedError) {
    throw new Error(message);
  }
  option?.logWarn?.(message);
}

const languageSynonyms: Record<string, LanguageRequest> = {
  cpp: "c++",
  cs: "c#",
  csharp: "c#",
  fs: "f#",
  fsharp: "f#",
  golang: "go",
  js: "javascript",
  kt: "kotlin",
  md: "markdown",
  mk: "makefile",
  objc: "objective-c",
  proto: "protobuf",
  ps: "powershell",
  py: "python",
  rb: "ruby",
  sh: "shell",
  ts: "typescript",
  text: "plain text",
  txt: "plain text",
  vb: "visual basic",
  wasm: "webassembly",
  yml: "yaml",
};

const notionLanguages = new Set<string>([
  "abap",
  "agda",
  "arduino",
  "assembly",
  "bash",
  "basic",
  "bnf",
  "c",
  "c#",
  "c++",
  "clojure",
  "coffeescript",
  "coq",
  "css",
  "dart",
  "dhall",
  "diff",
  "docker",
  "ebnf",
  "elixir",
  "elm",
  "erlang",
  "f#",
  "flow",
  "fortran",
  "gherkin",
  "glsl",
  "go",
  "graphql",
  "groovy",
  "haskell",
  "html",
  "idris",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "latex",
  "less",
  "lisp",
  "livescript",
  "llvm ir",
  "lua",
  "makefile",
  "markdown",
  "markup",
  "matlab",
  "mathematica",
  "mermaid",
  "nix",
  "notion formula",
  "objective-c",
  "ocaml",
  "pascal",
  "perl",
  "php",
  "plain text",
  "powershell",
  "prolog",
  "protobuf",
  "purescript",
  "python",
  "r",
  "racket",
  "reason",
  "ruby",
  "rust",
  "sass",
  "scala",
  "scheme",
  "scss",
  "shell",
  "solidity",
  "sql",
  "swift",
  "toml",
  "typescript",
  "vb.net",
  "verilog",
  "vhdl",
  "visual basic",
  "webassembly",
  "xml",
  "yaml",
]);
