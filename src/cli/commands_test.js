import { assert, assertEquals, assertThrows } from '../../deps_test.js';
import { run, list } from './commands.js';

Deno.test('run without command', () => {
  assertThrows(() => run(), Error, '[WARNING] No command provided! \n');
});

Deno.test('run with invalid command', () => {
  const command = ['foobar'];
  assertThrows(() => run(command), Error, `Command '${command}' not found! \n`);
});

Deno.test('run with valid command', () => {
  assert(run(['start'], false));
  assert(run(['init'], false));
  assert(run(['build'], false));
});

Deno.test('list commands', () => {
  const results = list();
  assertEquals(typeof results, 'string');
});
