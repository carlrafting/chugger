import { exists, path, serve, serveTLS } from "../../../deps.js";
import { projectConfigPath, defaultConfigPath, chuggerPath } from "../../utils/paths.js";

function loadConfigurationFile(path) {
    return import(path)
        .then(module => module.default)
        .catch(e => console.log(e));
}

async function server({ 
    hostname, 
    port, 
    https
}) {
    console.log('https', https);

    let certFile, keyFile;

    if (https) {
        let { certFile, keyFile } = https;
        console.log('certFile', certFile);
        console.log('keyFile', keyFile);
    }

    const server = https ? serveTLS({ hostname, port, certFile, keyFile }) : serve({ hostname, port });
    
    console.log(`${https ? 'HTTPS' : 'HTTP'} webserver running.  Access it at:  ${https ? 'https' : 'http'}://${hostname}:${port}/`);

    for await (const request of server) {
        console.log(request);

        let bodyContent = "Your user-agent is:\n\n";
        bodyContent += request.headers.get("user-agent") || "Unknown";

        request.respond({ status: 200, body: bodyContent });
    }
}

export default async function start() {
    const result = await exists(projectConfigPath);

    const config = await loadConfigurationFile(result ? projectConfigPath : defaultConfigPath);
    
    const { watch } = config();
    let { server: serverConfig } = config();

    if (!serverConfig) {
        // get default server configuration if there is no server property in project config
        const defaultConfig = await loadConfigurationFile(defaultConfigPath);
        serverConfig = defaultConfig().server;
        console.log('defaultConfig', defaultConfig);
    }

    console.log('serverConfig', serverConfig);
    server({ ...serverConfig });

    if (!watch) {
        throw new Error('No watch property in your config file');
    }

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
        // After a bit of digging, i found a solution!
        // The repository needs to be stored on the Linux file system and not Windows.
        // The more you know...
        // 
        // https://docs.microsoft.com/en-us/windows/wsl/compare-versions#performance-across-os-file-systems 
        // 
        const watcher = Deno.watchFs(path);
                
        for await (const event of watcher) {
            console.log(event);
        }
    });
}
