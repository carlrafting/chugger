import { exists } from "../../../deps.js";
import { projectConfigPath, defaultConfigPath } from "../../utils/paths.js";

function loadConfigurationFile(path) {
    return import(path)
        .then((module) => module)
        .catch(e => console.log(e));
}

export default function start() {
    console.log('Starting development server...')

    exists(projectConfigPath)    
        .then(result => {
            if (result) {
                return loadConfigurationFile(projectConfigPath);   
            }

            return loadConfigurationFile(defaultConfigPath);       
        })
        // .then(text => JSON.parse(text))
        .then(config => console.log(config))
        .catch(error => {
            console.log(error)
        });
}
