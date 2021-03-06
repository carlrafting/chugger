import { exists, path } from "../../../deps.js";
import { defaultConfigPath, projectConfigPath } from "../../utils/paths.js";
import { server } from "../server.js";

function loadConfigurationFile(path) {
  return (
    import(path)
      .then((module) => module.default)
      .catch((e) => console.log(e))
  );
}

function getConfigProps(config) {
  return (typeof config === 'function' ? config() : config);
}

async function getConfigObject() {
  const result = await exists(projectConfigPath);
  
  const config = await loadConfigurationFile(
    result ? projectConfigPath : defaultConfigPath,
  );

  const { watch, server } = getConfigProps(config);

  return {
    watch,
    server
  };
}

async function getDefaultConfigObject() {
  const config = await loadConfigurationFile(defaultConfigPath);
  
  return {
    ...getConfigProps(config)
  };
}

export default async function start() {
  const { watch } = await getConfigObject();
  let { server: serverConfig } = await getConfigObject();

  if (!serverConfig) {
    // get default server configuration if there is no server property in project config
    const { server: defaultServerConfig } = getDefaultConfigObject();
    serverConfig = defaultServerConfig;
    console.log(defaultServerConfig);
  }

  // TODO: validate config file. If no properties were found, merge with default config.

  console.log("serverConfig", serverConfig);
  server({ ...serverConfig });

  // console.log('defaultConfig', defaultConfig);

  if (!watch) {
    return;  
  }

  const watchKeys = Object.keys(watch);
  const watchDirs = watchKeys.map((dir) => dir);
  const watchDirPaths = watchDirs.map((dir) => path.join(Deno.cwd(), dir));

  console.log("watchDirs", watchDirs);
  console.log("watchDirPaths", watchDirPaths);

  // TODO: Finish iterate over watch options object...
  const watchUrls = watchKeys.map((url) => {
    if (typeof url === "string") {
      return watch[url];
    }

    console.log(url);
  });

  console.log("watchUrls", watchUrls);

  watchDirPaths.forEach(async (path) => {
    console.log(path);

    const watcher = Deno.watchFs(path);

    for await (const event of watcher) {
      console.log(event);
    }
  });
}
