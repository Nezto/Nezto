
export class GoogleUser{

    sub: string;
    name: string;
    given_name: string;
    picture: string;
    email: string;
    access_token: string;
    email_verified: boolean;


      constructor(obj: Record<string, any>) {
            this.sub = String(obj.sub || "");
            this.name = String(obj.name || "");
            this.given_name = String(obj.given_name || "");
            this.picture = String(obj.picture || "");
            this.email = String(obj.email || "");
            this.access_token = String(obj.access_token || "");
            this.email_verified = Boolean(obj.email_verified || false);
      }
}


/**
 * Class representing a JWT User.
 */
export class JwtUser {

    _id : string
    email : string
    name : string
    role : string
    picture : string
    createdAt : Date
    updatedAt : Date

    constructor(obj : any) {
        this._id = String(obj._id || "");
        this.email = String(obj.email || "");
        this.name = String(obj.name || "");
        this.role = String(obj.role || "");
        this.picture = String(obj.picture || "");
        this.createdAt = new Date(obj.createdAt || new Date());
        this.updatedAt = new Date(obj.updatedAt || new Date());
    }
}


export class LaundryService{
    name: string;
    description: string;
    location: string;
    services: string[];
    rating: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;

      constructor(obj : any){
            this.name = String(obj.name || "");
            this.description = String(obj.description || "");
            this.location = String(obj.location || "");
            this.services = Array.isArray(obj.services) ? obj.services : [];
            this.rating = Number(obj.rating || 0);
            this.status = Boolean(obj.status || false);
            this.createdAt = new Date(obj.createdAt || new Date());
            this.updatedAt = new Date(obj.updatedAt || new Date());
      }
}