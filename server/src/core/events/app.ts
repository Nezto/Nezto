import events from "node:events";
import { Nezto } from "../nezto";


export class AppEvents {
    events: events;
    static readonly APP_READY = 'app-ready';
    static readonly APP_EXIT = 'app-exit';
    static readonly APP_ERROR = 'app-error';

    constructor(app: Nezto) {
        this.events = new events();

        this.events.on(AppEvents.APP_READY, async () => {
            await app.onReady();
        });

        this.events.on(AppEvents.APP_EXIT, () => {
            console.log('App is exiting');
        });

        this.events.on(AppEvents.APP_ERROR, (error) => {
            console.error('App error:', error);
        });
    }
}