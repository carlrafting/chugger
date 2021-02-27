import { green, dim } from "../../deps.js";
import { NAME, VERSION, DESCRIPTION } from '../../info.js';

export default function welcome() {
    console.log(`
********************************************************************

    ${NAME}@v${VERSION}

   🎉 ${green('Welcome to chugger!')}

    ${dim(DESCRIPTION)}


********************************************************************
    `);
}
