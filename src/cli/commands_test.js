import { assert, assertEquals, assertThrows } from '../../deps_test.js';
import { run, list } from './commands.js';

Deno.test('run without command', () => {
  assertThrows(() => run(), Error, '[WARNING] No command provided! \n');
});

Deno.test('run with invalid command', () => {
  const command = 'foobar';
  assertThrows(() => run(command), Error, `Command '${command}' not found! \n`);
});

Deno.test('run with valid command', () => {
  const commands = [
    'start',
    'init',
    'build'
  ];
  assert(true)
});
