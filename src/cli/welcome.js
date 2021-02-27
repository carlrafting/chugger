import { dim, green } from "../../deps.js";
import { DESCRIPTION, NAME, VERSION } from "../../info.js";

export default function welcome() {
  const message = `
********************************************************************

    ${NAME}@v${VERSION}

    🎉 ${green("Welcome to chugger!")}

    ${dim(DESCRIPTION)}

********************************************************************\n`;

  console.log(message);

  return message;
}
