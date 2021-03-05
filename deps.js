// deno standard library modules
// const STD_VERSION = "0.88.0";
export { copy, exists } from "https://deno.land/stc@0.89.0/fs/mod.ts";
export * as log from "https://deno.land/stc@0.89.0/log/mod.ts";
export {
  dim,
  green,
  red,
  yellow,
  cyan
} from "https://deno.land/stc@0.89.0/fmt/colors.ts";
export * as path from "https://deno.land/stc@0.89.0/path/mod.ts";
export { parse as parseFlags } from "https://deno.land/stc@0.89.0/flags/mod.ts";
export { serve, serveTLS } from "https://deno.land/stc@0.89.0/http/server.ts";

// deno third party modules
export * as urlcat from "https://deno.land/x/urlcat/src/index.ts";
export * as yargs from "https://deno.land/x/yargs/deno.ts";
export * as Arguments from "https://deno.land/x/yargs/deno-types.ts";
export { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
