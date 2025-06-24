



export class BaseUser{
    _id: string;
    email: string;
    name: string;
    role: string;
    picture: string;
    location: [number, number] | null;
    address: string | null;
    payment: Object | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(obj: any) {
        this._id = String(obj._id || "");
        this.email = String(obj.email || "");
        this.name = String(obj.name || "");
        this.role = String(obj.role || "");
        this.picture = String(obj.picture || "");
        this.payment = obj.payment || null;
        this.location = obj.location ? [Number(obj.location[0]), Number(obj.location[1])] : null;
        this.address = obj.address || null;
        this.createdAt = new Date(obj.createdAt || new Date());
        this.updatedAt = new Date(obj.updatedAt || new Date());
    }
}