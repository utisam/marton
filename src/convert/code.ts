import { Code } from 'mdast';
import Option from '../option';
import { CodeObjectRequest, LanguageRequest } from '../notionTypes';

export function codeToBlocks(child: Code, option?: Option): Iterable<CodeObjectRequest> {
    return [
        {
            type: 'code',
            code: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: child.value,
                        },
                    },
                ],
                language: convertLanguage(child.lang) ?? 'plain text',
            },
        },
    ];
}

function convertLanguage(lang: string | null | undefined): LanguageRequest | undefined {
    if (!lang) {
        return;
    }
    lang = lang.toLocaleLowerCase('en-US');
    if (notionLanguages.has(lang)) {
        return lang as LanguageRequest;
    }
    return languageSynonyms[lang];
}

const languageSynonyms: Record<string, LanguageRequest> = {
    'cpp': 'c++',
    'csharp': 'c#',
    'fsharp': 'f#',
    'golang': 'go',
    'js': 'javascript',
    'kt': 'kotlin',
    'md': 'markdown',
    'mk': 'makefile',
    'objc': 'objective-c',
    'proto': 'protobuf',
    'ps': 'powershell',
    'py': 'python',
    'rb': 'ruby',
    'sh': 'shell',
    'ts': 'typescript',
    'text': 'plain text',
    'txt': 'plain text',
    'vb': 'visual basic',
    'wasm': 'webassembly',
    'yml': 'yaml',
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