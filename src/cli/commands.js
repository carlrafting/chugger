import * as log from "https://deno.land/std@0.88.0/log/mod.ts";
import { yellow } from "https://deno.land/std@0.88.0/fmt/colors.ts";

import init from './commands/init.js';

const commands = [
    { name: 'init', description: 'Intitalize a new chugger project', command: init }
];

export function list() {
    console.log(`   Available Commands: \n`);
    commands.forEach(command => console.log(`   chugger ${command.name}         ${command.description} \n`));
}

export function run(command) {
    if (!command) {
        console.log(yellow('[WARNING] No command provided! \n'));
        return;
    }
    
    console.log(`Command: ${command}`);

    const match = commands.filter(c => c.name === command[0]);

    if (match.length > 0) {
        match[0].command();
        return;
    }

    if (match.length === 0) {
        console.log(`Command '${command}' not found!`);
    }
}
