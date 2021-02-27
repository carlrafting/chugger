import { copy, exists, green, red } from "../../../deps.js";
import {
  defaultConfigPath,
  getChuggerPath,
  projectConfigPath,
  projectRoot,
} from "../../utils/paths.js";

const chuggerPath = getChuggerPath();

async function copyConfigurationFile() {
  console.log("defaultConfig", defaultConfigPath);

  try {
    await copy(defaultConfigPath, projectConfigPath);
    console.log(green("✅ Configuration file created!"));
  } catch (error) {
    console.log(red("⛔ Could not create configuration file!"), error);
  }
}

export default async function init() {
  console.log(projectConfigPath);

  if (await exists(`${projectConfigPath}`)) {
    console.log("Config file already exists!");
  } else {
    console.log(`No configuration found in ${projectRoot}. Creating one...`);
    copyConfigurationFile();
  }
}
