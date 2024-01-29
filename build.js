import { build } from 'esbuild';
import pkg from './package.json' assert { type: "json" };

const entryFile = 'src/index.ts'
const shared = {
    bundle: true,
    entryPoints: [entryFile],
    external: Object.keys(pkg.dependencies ?? {}),
    logLevel: 'info',
    minify: true,
    sourcemap: true,
};
build({
    ...shared,
    format: 'esm',
    outfile: './dist/index.esm.js',
    target: ['es2020'],
});
// build({
//     ...shared,
//     format: 'cjs',
//     outfile: './dist/index.cjs.js',
//     target: ['es2020'],
// });