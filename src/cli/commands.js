import { yellow } from "../../deps.js";

import init from './commands/init.js';
import build from "./commands/build.js";
import start from "./commands/start.js";

const commands = [
    { name: 'init', description: 'Intitalize a new chugger project', command: init },
    { name: 'start', description: 'Start development server', command: start },
    { name: 'build', description: 'Build project assets for production deployment', command: build }
];

export function list() {
    console.log(`   Available Commands: \n`);
    commands.forEach(command => console.log(`   chugger ${command.name}`, `     ${command.description}`));
    console.log('\n');
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
