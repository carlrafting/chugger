// deno standard modules
import { parse } from "https://deno.land/std@0.88.0/flags/mod.ts";
import * as path from "https://deno.land/std@0.88.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.88.0/fs/mod.ts";
import * as io from "https://deno.land/std@0.88.0/io/mod.ts";

// chugger modules
import welcome from "./cli/welcome.js";
import * as commands from './cli/commands.js';
import { getChuggerPath } from './utils/paths.js';

const denoArgs = parse(Deno.args);

console.log('denoArgs', denoArgs)
console.log('posix', path.posix)
console.log('chuggerPath', getChuggerPath())
// console.log(Deno);

export default function main() {
    welcome();
    commands.list();
    
    if (Deno.args.length > 0) {
        commands.run(denoArgs._)
    }
}
