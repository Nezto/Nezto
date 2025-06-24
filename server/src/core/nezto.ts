import connectDB from '@/utils/db';
import * as config from "@/config";
import { User } from "@/models/User";
import { Service } from "@/models/Service";
import { Vendor } from "@/models/Vendor";
import { Rider } from "@/models/Rider";
import { Order } from "@/models/Order";
import { BaseUser } from "./user";
import { BaseService } from "./service";
import { BaseVendor } from "./vendor";
import { BaseRider } from "./rider";
import { BaseOrder } from "./order";
import { server, io } from "@/core/events/socket";



export class Nezto {
    io: typeof io;
    config = config;
    vendors: BaseVendor[] = [];
    riders: BaseRider[] = [];
    users: BaseUser[] = [];
    services: BaseService[] = [];
    orders: BaseOrder[] = [];
    models = {
        Vendor: Vendor,
        Rider: Rider,
        User: User,
        Service: Service,
        Order: Order
    }

    constructor() {
        this.io = io;
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
            console.warn("No users found in the database.");
        }
        this.users = users.map(user => new BaseUser(user));
    }

    async loadServices() {
        const services = await this.models.Service.find();
        if (services.length === 0) {
            console.warn("No services found in the database.");
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
        console.log("Nezto is ready with the following data:");
        console.log(`Users: ${this.users.length}`);
        console.log(`Vendors: ${this.vendors.length}`);
        console.log(`Riders: ${this.riders.length}`);
        console.log(`Services: ${this.services.length}`);
        console.log(`Orders: ${this.orders.length}`);
    }

    async run() {
        try {
            await connectDB();
            await this.onReady();
            server.listen(this.config.PORT, () => {
                console.log(`Server Running On : http://localhost:${this.config.PORT}`);
            });
        } catch (err) {
            console.error(err);
        }
    }
}
