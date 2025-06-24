require('module-alias/register'); // Ensure module aliases are registered for Node.js
import 'tsconfig-paths/register' // Ensure module aliases and paths are registered for TypeScript


import { Nezto } from "@/core/nezto";
import { Logger } from "@/utils/logger";



async function main() {
    try {
        // Initialize the Nezto application
        Logger.info("Starting Nezto application...");
        const nezto = new Nezto();
        await nezto.run();
    } catch (err) {
        Logger.error(err);
    }
}

main();
