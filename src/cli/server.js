import { path, serve, serveTLS } from "../../deps.js";
import { chuggerPath } from "../utils/paths.js";

export async function server({
    hostname,
    port,
    https
}) {
    console.log('https', https);

    let certFile, keyFile;

    if (https) {
        // let { certFile, keyFile } = https;
        certFile = path.join(chuggerPath, https.certFile);
        keyFile = path.join(chuggerPath, https.keyFile);
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
