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
    protected io = io;
    public port : number;
    protected config = config;
    public logger = Logger;
    public vendors: BaseVendor[] = [];
    public riders: BaseRider[] = [];
    public users: BaseUser[] = [];
    public services: BaseService[] = [];
    public orders: BaseOrder[] = [];
    public models = {
        Vendor: Vendor,
        Rider: Rider,
        User: User,
        Service: Service,
        Order: Order
    }

    constructor(port : number = config.PORT) {
        this.port = port;
    }


    get(iterator: BaseOrder[] | BaseRider[] | BaseUser[] | BaseVendor[] | BaseService[], id: string) {
        return iterator.find(item => item._id === id) || null;
    }

    async init() {
        await this.loadVendors();
        await this.loadRiders();
        await this.loadUsers();
        await this.loadServices();
        await this.loadOrders();
    }

    async loadVendors() {
        const vendors = await this.models.Vendor.find();
        this.vendors = vendors.map(vendor => new BaseVendor(vendor));
    }

    async loadRiders() {
        const riders = await this.models.Rider.find();
        this.riders = riders.map(rider => new BaseRider(rider));
    }

    async loadUsers() {
        const users = await this.models.User.find();
        if (users.length === 0) {
            this.logger.warn('No users found in the database.');
        }
        this.users = users.map(user => new BaseUser(user));
    }

    async loadServices() {
        const services = await this.models.Service.find();
        if (services.length === 0) {
            this.logger.warn('No services found in the database.');
        }
        this.services = services.map(service => new BaseService(service));
    }

    async loadOrders() {
        const orders = await this.models.Order.find();
        this.orders = orders.map(order => new BaseOrder(order));
    }

    async getVendorById(id: string): Promise<BaseVendor | null> {
        const vendor = this.vendors.find(v => v._id === id);
        return vendor || null;
    }

    async getRiderById(id: string): Promise<BaseRider | null> {
        const rider = this.riders.find(r => r._id === id);
        return rider || null;
    }

    async getUserById(id: string): Promise<BaseUser | null> {
        const user = this.users.find(u => u._id === id);
        return user || null;
    }

    async getServiceById(id: string): Promise<BaseService | null> {
        const service = this.services.find(s => s._id === id);
        return service || null;
    }

    async getOrderById(id: string): Promise<BaseOrder | null> {
        const order = this.orders.find(o => o._id === id);
        return order || null;
    }

    async onUserUpdate(user: BaseUser) {
        const index = this.users.findIndex(u => u._id === user._id);
        if (index !== -1) {
            this.users[index] = user;
        }
    }

    async onReady(){
        await this.init();
        this.logger.info("Nezto is ready with the following data:");
        this.logger.info(`Users: ${this.users.length}`);
        this.logger.info(`Vendors: ${this.vendors.length}`);
        this.logger.info(`Riders: ${this.riders.length}`);
        this.logger.info(`Services: ${this.services.length}`);
        this.logger.info(`Orders: ${this.orders.length}`);
    }

    async run() {
        try {
            await connectDB();
            
            server.listen(this.port, () => {
                this.logger.log(`Server Running On : http://localhost:${this.port}`);
            });
            await this.onReady();
        } catch (err) {
            this.logger.error(err);
        }
    }
}
