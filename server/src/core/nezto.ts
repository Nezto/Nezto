import * as config from '@/config';
import events from 'events';
import connectDB from '@/core/db';
import { Logger } from '@/utils/logger';
import {models} from "@/models/all"
import { server, io, app } from '@/core/socket';
import { AppEvents } from '@events/app';
import { Events } from '@utils/constants';
import { ResponseHandler } from '@/core/ext/response';
import { cache} from '@/core/cache/all';


/**
 * The `Nezto` class serves as the core singleton of the application, managing configuration,
 * event handling, caching, and application lifecycle. It provides access to key components
 * such as models, configuration, logging, and various cache layers for vendors, riders,
 * services, orders, and users.
 *
 * @remarks
 * - Implements the singleton pattern via the static `getInstance` method.
 * - Initializes application events and handles server startup.
 * - Exposes a shared event emitter and JWT map for authentication/session management.
 *
 * @example
 * ```typescript
 * const nezto = Nezto.getInstance();
 * await nezto.run();
 * ```
 *
 * @property port - The port number on which the server will listen.
 * @property io - Reference to the socket.io instance.
 * @property models - Reference to the application's data models.
 * @property config - Reference to the application's configuration.
 * @property logger - Reference to the application's logger.
 * @property events - Event emitter for application-wide events.
 * @property vendors - Vendor cache instance.
 * @property riders - Rider cache instance.
 * @property services - Service cache instance.
 * @property orders - Order cache instance.
 * @property users - User cache instance.
 * @property response - Response handler instance.
 * @property jwts - Map for storing JWT tokens.
 * @property static instance - Singleton instance of the Nezto class.
 *
 * @method getInstance - Returns the singleton instance of the Nezto class.
 * @method run - Initializes the database connection, starts the server, and emits the ON_START event.
 */
export class Nezto {
    
    public port: number;
    /** Socket.io instance for real-time communication */
    public io: typeof io = io;
    /**object containing all mongoose models */
    public models: typeof models = models;
    /** Application configuration object */
    public config: typeof config = config;
    public logger: typeof Logger = Logger;
    /** Event emitter for application-wide events */
    public events = new events.EventEmitter();
    /** Singleton instance of the Nezto class */
    public static instance: Nezto | null = null;

    public vendors = new cache.VendorCache(this);
    public riders = new cache.RiderCache(this);
    public services = new cache.ServiceCache(this);
    public orders = new cache.OrderCache(this);
    public users = new cache.UserCache(this);

    public response: ResponseHandler = new ResponseHandler();
    public jwts: Map<string, string> = new Map<string, string>();


    constructor(port: number = config.PORT) {
        this.port = port;
        new AppEvents(this);
    }

    static getInstance(): Nezto {
        if (!Nezto.instance) {
            Nezto.instance = new Nezto();
        }
        return Nezto.instance;
    }


    async run() {
        try {
            await connectDB();
            server.listen(this.port, () => {
                this.logger.log(`Server Running On : http://localhost:${this.port}`);
            });
            this.events.emit(Events.ON_START, this);
            app.nezto = this;
            
        } catch (err) {
            this.logger.error(err);
        }
    }
}
