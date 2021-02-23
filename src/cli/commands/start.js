import { exists, path } from "../../../deps.js";
import { projectConfigPath, defaultConfigPath } from "../../utils/paths.js";

function loadConfigurationFile(path) {
    return import(path)
        .then(module => module.default)
        .catch(e => console.log(e));
}

export default async function start() {
    const result = await exists(projectConfigPath);

    const config = await loadConfigurationFile(result ? projectConfigPath : defaultConfigPath);
    
    const { watch } = config();

    const watchDirs = Object.keys(watch).map(dir => dir);
    const watchDirPaths = watchDirs.map(dir => path.join(Deno.cwd(), dir));

    console.log('watchDirs', watchDirs);
    console.log('watchDirPaths', watchDirPaths);

    watchDirPaths.forEach(async (path) => {
        console.log(path);

        // So it turns out watchFs doesn't work inside a WSL VM.
        // At least now i can stop banging my head against the wall. 
        // The problem didn't have anything to do with my code...
        //
        // https://github.com/denoland/deno/issues/6966
        //
        const watcher = Deno.watchFs(path);
                
        for await (const event of watcher) {
            console.log(event);
        }
    });
}
