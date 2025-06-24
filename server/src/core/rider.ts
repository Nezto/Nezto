import { BaseUser } from "./user";
import { Payout } from "./types";


export class BaseRider extends BaseUser {
    _id: string;
    name: string;
    payouts: Payout[];


    constructor(obj: any) {
        super(obj);
        this._id = String(obj._id || "");
        this.name = String(obj.name || "");
        this.payouts = obj.payouts || [];
    }
}


