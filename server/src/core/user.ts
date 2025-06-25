import jwt from "jsonwebtoken";
import { jwtConfig } from "@/config";
import { User } from "@/models/User";



export class BaseUser {
    _id: string;
    email: string;
    name: string;
    token: string;
    roles: string[];
    avatar: string;
    location: [number, number] | null;
    address: string | null;
    payment: Object | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(obj: any) {
        if (!obj._id || !obj.email) {
            throw new Error("User object must have an _id and email property");
        }
        this._id = String(obj._id || "");
        this.token = String(obj.token || "");
        this.email = String(obj.email || "");
        this.name = String(obj.name || "User");
        this.roles = obj.roles || ["user"];
        this.avatar = String(obj.avatar || "");
        this.payment = obj.payment || null;
        this.location = obj.location ? [Number(obj.location[0]), Number(obj.location[1])] : null;
        this.address = obj.address || null;
        this.createdAt = new Date(obj.createdAt || new Date());
        this.updatedAt = new Date(obj.updatedAt || new Date());
    }

    toJSON() {
        return {
            _id: this._id,
            email: this.email,
            name: this.name,
            role: this.roles,
            avatar: this.avatar,
            location: this.location,
            address: this.address,
            payment: this.payment,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    public async save(): Promise<BaseUser> {
        const user = await User.findByIdAndUpdate(
            this._id,
            {
                email: this.email,
                name: this.name,
                roles: this.roles,
                avatar: this.avatar,
                location: this.location,
                address: this.address,
                payment: this.payment
            },
            { upsert: true }
        ).exec();

        if (!user) {
            throw new Error("User not found or could not be updated");
        }

        return new BaseUser(user);
    }


    public createToken() {
        const token = jwt.sign({
            _id: this._id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            roles: this.roles || ["user"],
            updatedAt: this.updatedAt,
        }, jwtConfig.secret);
        return token;
    }

}