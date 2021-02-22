import * as path from "https://deno.land/std@0.88.0/path/mod.ts";

const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export function getChuggerPath() {
    return path.join(__dirname, '../..');
}

console.log('getChuggerPath', getChuggerPath());
