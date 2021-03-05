import { copy, exists, green, red } from "../../../deps.js";
import {
  projectConfigPath,
  projectRoot,
  templateConfigPath,
} from "../../utils/paths.js";

async function copyConfigurationFile() {
  try {
    const status = await Deno.permissions.request({ name: 'write' });
    await copy(templateConfigPath, projectConfigPath);
    console.log(green("✅ Configuration file created!"));
  } catch (error) {
    console.log(red("⛔ Could not create configuration file!"), error);
  }
}

export default async function init() {
  console.log('projectConfigPath', projectConfigPath);

  if (await exists(`${projectConfigPath}`)) {
    console.log("Config file already exists!");
  } else {
    console.log(`No configuration found in ${projectRoot}. Creating one...`);
    copyConfigurationFile();
  }
}
