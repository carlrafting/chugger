import { path } from "../../deps.js";

const { granted } = await Deno.permissions.request({ name: 'read' });

console.log('granted', granted);

const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const projectRoot = Deno.cwd();
const chuggerPath = path.join(__dirname, "..", "..");
const configFilename = "chugger.config.js";
const projectConfigPath = path.join(projectRoot, configFilename);
const defaultConfigPath = path.join(
  chuggerPath,
  "src",
  "config",
  configFilename,
);
const templateConfigPath = path.join(
  chuggerPath,
  "src",
  "templates",
  configFilename,
);

export function getChuggerPath() {
  return chuggerPath;
}

export {
  chuggerPath,
  defaultConfigPath,
  projectConfigPath,
  projectRoot,
  templateConfigPath,
};
