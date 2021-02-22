import { green, dim } from "https://deno.land/std@0.88.0/fmt/colors.ts";

export default function welcome() {
    console.log(`
********************************************************************

    🎉 ${green('Welcome to chugger!')}

    ${dim('What is chugger? That is what i\'m trying to find out...')}

********************************************************************
    `);
}
