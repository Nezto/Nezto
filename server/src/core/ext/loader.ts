import { BaseVendor } from "@/core/vendor";
import { BaseRider } from "@/core/rider";
import { BaseUser } from "@/core/user";
import { BaseService } from "@/core/service";
import { BaseOrder } from "@/core/order";
import { Nezto } from "../nezto";
import { Events } from "./event_names";


export class Loader {
    private app: Nezto;

    constructor(app: Nezto) {
        this.app = app;
    }

    async loadAll() {
        try {
            await this.loadVendors();
            await this.loadRiders();
            await this.loadUsers();
            await this.loadServices();
            await this.loadOrders();

            // Emit the APP_READY event after all data is loaded
            // this.app.events.emit(Events.ON_READY);
            this.app.logger.info('All data loaded successfully.');

        } catch (error) {
            this.app.logger.error('Error loading data:', error);
        }

    }

    async loadVendors() {
        const vendors = await this.app.models.Vendor.find().populate('services', '_id name description price').populate('owners', '_id name email phone');
        vendors.forEach(vendor => {
            this.app.vendors.push(new BaseVendor(vendor));
        });
    }

    async loadRiders() {
        const riders = await this.app.models.Rider.find();
        riders.forEach(rider => {
            this.app.riders.push(new BaseRider(rider));
        });
    }

    async loadUsers() {
        const users = await this.app.models.User.find();
        if (users.length === 0) {
            this.app.logger.warn('No users found in the database.');
        }
        users.forEach(user => {
            this.app.users.push(new BaseUser(user));
        });
    }

    async loadServices() {
        const services = await this.app.models.Service.find();
        if (services.length === 0) {
            this.app.logger.warn('No services found in the database.');
        }
        services.forEach(service => {
            this.app.services.push(new BaseService(service));
        });
    }

    async loadOrders() {
        const orders = await this.app.models.Order.find();
        this.app.orders = orders.map(order => new BaseOrder(order));
    }

}