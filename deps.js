// deno standard library modules
// const STD_VERSION = "0.88.0";
export { exists, copy } from "https://deno.land/std@0.88.0/fs/mod.ts";
export * as log from "https://deno.land/std@0.88.0/log/mod.ts";
export { yellow, green, dim, red } from "https://deno.land/std@0.88.0/fmt/colors.ts";
export * as path from "https://deno.land/std@0.88.0/path/mod.ts";
export { parse as parseFlags } from "https://deno.land/std@0.88.0/flags/mod.ts";
export { serve, serveTLS } from "https://deno.land/std@0.88.0/http/server.ts";

// deno third party modules
export * as urlcat from 'https://deno.land/x/urlcat/src/index.ts';
export * as yargs from 'https://deno.land/x/yargs/deno.ts'
export * as Arguments from 'https://deno.land/x/yargs/deno-types.ts'
