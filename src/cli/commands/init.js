import { exists, copy } from "https://deno.land/std@0.88.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.88.0/path/mod.ts";
import { getChuggerPath } from "../../utils/paths.js";

const projectRoot = Deno.cwd();
const projectConfigPath = `${projectRoot}/chugger.config.js`;
const chuggerPath = getChuggerPath();

async function copyConfigurationFile() {
    const defaultConfig = join(chuggerPath, 'src', 'chugger.config.js')
    console.log('defaultConfig', defaultConfig);
    
    try {
        await copy(defaultConfig, projectConfigPath);
        console.log('✅ Configuration file created!');
    } catch (error) {
        console.log('⛔ Could not create configuration file!', error);
    }
}

export default async function init() {
    console.log(projectConfigPath);
    
    if (await exists(`${projectConfigPath}`)) {
        console.log('Config file already exists!')
    } else {
        console.log(`No configuration found in ${projectRoot}. Creating one...`);
        copyConfigurationFile();
    }
}
