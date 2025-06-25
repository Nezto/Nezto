import { loadAllCache } from "../cache/all";
import { Events } from "@/utils/constants";
import { Nezto } from "../nezto";

export class AppEvents {
    private app: Nezto;

    constructor(app : Nezto) {
        this.app = app;

        app.events.on(Events.ON_START, async () => {

            // Initialize the Nezto application
            await loadAllCache(this.app);

            // Log the application readiness
            this.app.logger.info("Nezto is ready with the following data:");
            this.app.logger.info(`Users: ${this.app.users.size}`);
            this.app.logger.info(`Vendors: ${this.app.vendors.size}`);
            this.app.logger.info(`Riders: ${this.app.riders.size}`);
            this.app.logger.info(`Services: ${this.app.services.size}`);
            this.app.logger.info(`Orders: ${this.app.orders.size}`);

        });

        app.events.on(Events.ON_READY, () => {
            app.logger.info("Nezto application is fully initialized and ready to use.");
        });

        app.events.on(Events.ON_ERROR, (error : any) => {
            app.logger.error('App error:', error);
        });
    }
}