import { BaseService } from "./service";
import { BaseUser } from "./user";


export class BaseVendor {
    _id: string;
    name: string;
    status: boolean;
    rating: number;
    owner: BaseUser | null;
    address: string | null;
    location: [number, number] | null;
    services: BaseService[]; // Array of service IDs
    createdAt: Date;
    updatedAt: Date;

    constructor(obj: any) {
        this._id = String(obj._id || "");
        this.name = String(obj.name || "");
        this.owner = obj.owner ? new BaseUser(obj.owner) : null; // Assuming owner is an object of BaseUser
        this.status = Boolean(obj.status || true);
        this.rating = Number(obj.rating || 0);
        this.address = obj.address ? String(obj.address) : null;
        this.location = obj.location ? [Number(obj.location[0]), Number(obj.location[1])] : null;
        this.services = Array.isArray(obj.services) ? obj.services.map((service: any) => new BaseService(service)) : [];
        this.createdAt = new Date(obj.createdAt || new Date());
        this.updatedAt = new Date(obj.updatedAt || new Date());
    }
}