// deno standard modules
import { parseFlags } from "../deps.js";

// chugger modules
import welcome from "./cli/welcome.js";
import * as commands from './cli/commands.js';

const denoArgs = parseFlags(Deno.args);

export default function main() {
    welcome();
    commands.list();
    
    if (Deno.args.length > 0) {
        commands.run(denoArgs._)
    }
}
