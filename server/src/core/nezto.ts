import events from 'events';
import connectDB from '@/core/db';
import * as config from '@/config';
import { Logger } from '@/utils/logger';
import { User } from '@/models/User';
import { Service } from '@/models/Service';
import { Vendor } from '@/models/Vendor';
import { Rider } from '@/models/Rider';
import { Order } from '@/models/Order';
import { BaseUser } from '@/core/user';
import { BaseService } from '@/core/service';
import { BaseVendor } from '@/core/vendor';
import { BaseRider } from '@/core/rider';
import { BaseOrder } from '@/core/order';
import { server, io } from '@events/socket';
import { AppEvents } from '@events/app';
import { Events } from '@utils/constants';


export class Nezto {
    public io = io;
    public port: number;
    public config = config;
    public logger = Logger;
    public vendors = new Map<string, BaseVendor>();
    public riders = new Map<string, BaseRider>();
    public users = new Map<string, BaseUser>();
    public services = new Map<string, BaseService>();
    public orders = new Map<string, BaseOrder>();
    public events = new events.EventEmitter();
    public static instance: Nezto | null = null;


    public models = {
        Vendor: Vendor,
        Rider: Rider,
        User: User,
        Service: Service,
        Order: Order
    }

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

    async getVendor(id: string): Promise<BaseVendor | null> {
        const vendor = this.vendors.get(id);
        return vendor || null;
    }

    async getRider(id: string): Promise<BaseRider | null> {
        const rider = this.riders.get(id);
        return rider || null;
    }

    async getUser(id: string): Promise<BaseUser | null> {
        const user = this.users.get(id);
        return user || null;
    }

    async getService(id: string): Promise<BaseService | null> {
        const service = this.services.get(id);
        return service || null;
    }

    async getOrder(id: string): Promise<BaseOrder | null> {
        const order = this.orders.get(id);
        return order || null;
    }

    async run() {
        try {
            await connectDB();
            server.listen(this.port, () => {
                this.logger.log(`Server Running On : http://localhost:${this.port}`);
            });
            this.events.emit(Events.ON_START, this);

        } catch (err) {
            this.logger.error(err);
        }
    }
}
