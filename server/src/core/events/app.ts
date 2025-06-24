import events from "events";
import { Loader } from "../ext/loader";
import { Events } from "../ext/event_names";

export class AppEvents {
    private app;
    public static events = new events.EventEmitter();
    constructor(app : any) {

        this.app = app;
        AppEvents.events.on(Events.ON_START, async () => {
            // Initialize the Nezto application
            const loader = new Loader(app);
            await loader.loadAll();
            // Log the application readiness
            app.logger.info("Nezto is ready with the following data:");
            app.logger.info(`Users: ${app.users.length}`);
            app.logger.info(`Vendors: ${app.vendors.length}`);
            app.logger.info(`Riders: ${app.riders.length}`);
            app.logger.info(`Services: ${app.services.length}`);
            app.logger.info(`Orders: ${app.orders.length}`);

            // Set the singleton instance
            AppEvents.events.emit(Events.ON_READY);
        });

        this.app.events.on(Events.ON_READY, () => {
            app.logger.info("Nezto application is fully initialized and ready to use.");
        });

        this.app.events.on(Events.ON_ERROR, (error : any) => {
            app.logger.error('App error:', error);
        });
    }
}