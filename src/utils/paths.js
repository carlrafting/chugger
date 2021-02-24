import { path } from "../../deps.js";

const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const projectRoot = Deno.cwd();
const chuggerPath = path.join(__dirname, '../..');
const configFilename = 'chugger.config.js';
const projectConfigPath = path.join(projectRoot, configFilename);
const defaultConfigPath = path.join(chuggerPath, 'src', 'config', configFilename);

export function getChuggerPath() {
    return chuggerPath;
}

export {
    projectRoot,
    projectConfigPath,
    defaultConfigPath
}
