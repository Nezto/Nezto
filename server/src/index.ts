require('module-alias/register');
import 'tsconfig-paths/register'
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
