import { BaseVendor } from "@/core/vendor";
import { BaseRider } from "@/core/rider";
import { BaseUser } from "@/core/user";
import { BaseService } from "@/core/service";
import { BaseOrder } from "@/core/order";
import { Nezto } from "../nezto";


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
            const _vendorObj = new BaseVendor(vendor);
            this.app.vendors.set(String(vendor._id), _vendorObj);
        });
    }

    async loadRiders() {
        const riders = await this.app.models.Rider.find();
        riders.forEach(rider => {
            const _riderObj = new BaseRider(rider);
            this.app.riders.set(String(rider._id), _riderObj);
        });
    }

    async loadUsers() {
        const users = await this.app.models.User.find();
        if (users.length === 0) {
            this.app.logger.warn('No users found in the database.');
        }
        users.forEach(user => {
            const _userObj = new BaseUser(user);
            this.app.users.set(String(user._id), _userObj);
        });
    }

    async loadServices() {
        const services = await this.app.models.Service.find();
        if (services.length === 0) {
            this.app.logger.warn('No services found in the database.');
        }
        services.forEach(service => {
            const _serviceObj = new BaseService(service);
            this.app.services.set(String(service._id), _serviceObj);
        });
    }

    async loadOrders() {
        const orders = await this.app.models.Order.find();
        orders.forEach(order => {
            const _orderObj = new BaseOrder(order);
            this.app.orders.set(String(order._id), _orderObj);
        });
    }

}