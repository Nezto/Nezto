import { BaseService } from "./service";
import { BaseUser } from "./user";
import { BaseVendor } from "./vendor";
import { BaseRider } from "./rider";


export class BaseOrder {
    _id: string;
    price: number; // Total price of the order
    status: string; // e.g., "pending", "completed", "cancelled"
    service: BaseService | null; // Service ID
    vendor: BaseVendor | null; // Vendor ID
    user: BaseUser | null; // User ID
    rider: BaseRider | null; // Rider ID
    otp: string; // String to prevent leading-zero issues
    pickTime: Date; // Date when the order is to be picked up from the user
    dropTime: Date; // Date when the order is to be dropped off at the vendor
    pickupLocation: [number, number]; // [longitude, latitude]
    dropLocation: [number, number]; // [longitude, latitude]
    createdAt: Date;
    updatedAt: Date;


    constructor(obj: any) {
        this._id = String(obj._id || "");
        this.status = String(obj.status || "pending");
        this.price = Number(obj.price || 0);
        this.otp = String(obj.otp || "");
        this.vendor = obj.vendor ? new BaseVendor(obj.vendor) : null;
        this.user = obj.user ? new BaseUser(obj.user) : null;
        this.service = obj.service ? new BaseService(obj.service) : null;
        this.rider = obj.rider ? new BaseRider(obj.rider) : null;
        this.pickupLocation = obj.pickup_location ? [Number(obj.pickup_location[0]), Number(obj.pickup_location[1])] : [0, 0];
        this.dropLocation = obj.drop_location ? [Number(obj.drop_location[0]), Number(obj.drop_location[1])] : [0, 0];
        this.pickTime = obj.pick_time ? new Date(obj.pick_time) : new Date();
        this.dropTime = obj.drop_time ? new Date(obj.drop_time) : new Date();
        this.createdAt = new Date(obj.createdAt || new Date());
        this.updatedAt = new Date(obj.updatedAt || new Date());
    }
}


