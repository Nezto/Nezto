import { Loader } from "../ext/loader";
import { Events } from "@/utils/constants";

export class AppEvents {
    private app;
    constructor(app : any) {

        this.app = app;
        app.events.on(Events.ON_START, async () => {
            // Initialize the Nezto application
            const loader = new Loader(app);
            await loader.loadAll();
            // Log the application readiness
            app.logger.info("Nezto is ready with the following data:");
            app.logger.info(`Users: ${app.users.size}`);
            app.logger.info(`Vendors: ${app.vendors.size}`);
            app.logger.info(`Riders: ${app.riders.size}`);
            app.logger.info(`Services: ${app.services.size}`);
            app.logger.info(`Orders: ${app.orders.size}`);

            // Set the singleton instance
            app.events.emit(Events.ON_READY);
        });

        app.events.on(Events.ON_READY, () => {
            app.logger.info("Nezto application is fully initialized and ready to use.");
        });

        app.events.on(Events.ON_ERROR, (error : any) => {
            app.logger.error('App error:', error);
        });
    }
}