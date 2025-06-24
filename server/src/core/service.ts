


export class BaseService {
    _id: string;
    name: string;
    price: number;
    category: string[];
    turnaround: string | null;
    icon: string | null;
    banner: string | null;
    thumbnail: string | null;
    popular: boolean;
    tags: string[] | null;
    active: boolean;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(obj: any) {
        this._id = String(obj._id || "");
        this.name = String(obj.name || "");
        this.description = String(obj.description || "");
        this.price = Number(obj.price || 0);
        this.category = Array.isArray(obj.category) ? obj.category : ["daily"];
        this.turnaround = obj.turnaround ? String(obj.turnaround) : null;
        this.icon = obj.icon ? String(obj.icon) : null;
        this.banner = obj.banner ? String(obj.banner) : null;
        this.thumbnail = obj.thumbnail ? String(obj.thumbnail) : null;
        this.popular = Boolean(obj.popular || false);
        this.tags = Array.isArray(obj.tags) ? obj.tags : [];
        this.active = Boolean(obj.active || true);
        
        // Ensure createdAt and updatedAt are Date objects
        this.createdAt = new Date(obj.createdAt || new Date());
        this.updatedAt = new Date(obj.updatedAt || new Date());
    }
}
