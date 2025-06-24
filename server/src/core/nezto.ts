import events from 'events';
import { Loader } from '@/core/ext/loader';
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


export class Nezto {
    public io = io;
    public port: number;
    public config = config;
    public logger = Logger;
    public vendors: BaseVendor[] = [];
    public riders: BaseRider[] = [];
    public users: BaseUser[] = [];
    public services: BaseService[] = [];
    public orders: BaseOrder[] = [];
    public static instance: Nezto | null = null;


    private data_dictionary = {
        users: new Map<string, BaseUser>(), // _id as key and Object reference as value
        vendors: new Map<string, BaseVendor>(),
        riders: new Map<string, BaseRider>(),
        services: new Map<string, BaseService>(),
        orders: new Map<string, BaseOrder>()
    }


    public models = {
        Vendor: Vendor,
        Rider: Rider,
        User: User,
        Service: Service,
        Order: Order
    }

    constructor(port: number = config.PORT) {
        this.port = port;
        const event = new events.EventEmitter();
        event.on('message', (message: string) => {
            this.logger.log(`Received message: ${message}`);
        });

        event.emit('message', 'Nezto instance created successfully');
        
    }



    static getInstance(): Nezto {
        if (!Nezto.instance) {
            Nezto.instance = new Nezto();
        }
        return Nezto.instance;
    }


    get(iterator: BaseOrder[] | BaseRider[] | BaseUser[] | BaseVendor[] | BaseService[], id: string) {
        return iterator.find(item => item._id === id) || null;
    }

    async getVendor(id: string): Promise<BaseVendor | null> {
        const vendor = this.vendors.find(v => v._id === id);
        return vendor || null;
    }

    async getRider(id: string): Promise<BaseRider | null> {
        const rider = this.riders.find(r => r._id === id);
        return rider || null;
    }

    async getUser(id: string): Promise<BaseUser | null> {
        const user = this.users.find(u => u._id === id);
        return user || null;
    }

    async getService(id: string): Promise<BaseService | null> {
        const service = this.services.find(s => s._id === id);
        return service || null;
    }

    async getOrder(id: string): Promise<BaseOrder | null> {
        const order = this.orders.find(o => o._id === id);
        return order || null;
    }

    async run() {
        try {
            await connectDB();
            const loader = new Loader(this);
            server.listen(this.port, () => {
                this.logger.log(`Server Running On : http://localhost:${this.port}`);
            });
            await loader.loadAll();

        } catch (err) {
            this.logger.error(err);
        }
    }
}
