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

export default async function start() {
  const result = await exists(projectConfigPath);

  const config = await loadConfigurationFile(
    result ? projectConfigPath : defaultConfigPath,
  );

  const { watch } = config();
  let { server: serverConfig } = config();

  if (!serverConfig) {
    // get default server configuration if there is no server property in project config
    const defaultConfig = await loadConfigurationFile(defaultConfigPath);
    serverConfig = defaultConfig().server;
    console.log("defaultConfig", defaultConfig);
  }

  console.log("serverConfig", serverConfig);
  server({ ...serverConfig });

  if (!watch) {
    throw new Error("No watch property in your config file");
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
