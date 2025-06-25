import events from 'events';
import connectDB from '@/core/db';
import * as config from '@/config';
import { Logger } from '@/utils/logger';
import {models} from "@/models/all"
import { server, io, app } from '@/core/socket';
import { AppEvents } from '@events/app';
import { Events } from '@utils/constants';
import { ResponseHandler } from '@/core/ext/response';
import { cache} from '@/core/cache/all';


export class Nezto {
    public io = io;
    public port: number;
    public models = models;
    public config = config;
    public logger = Logger;
    public response = new ResponseHandler();
    public jwts  = new Map<string, string>();
    public events = new events.EventEmitter();
    public vendors = new cache.VendorCache(this);
    public riders = new cache.RiderCache(this);
    public services = new cache.ServiceCache(this);
    public orders = new cache.OrderCache(this);
    public users = new cache.UserCache(this);
    public static instance: Nezto | null = null;


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
