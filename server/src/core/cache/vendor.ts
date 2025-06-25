import { Nezto } from "../nezto";
import { BaseVendor } from '@/core/vendor';

export class VendorCache {
    private cache: Map<string, BaseVendor> = new Map();
    private nezto: Nezto;
    public size: number = 0;
    constructor(nezto: Nezto) {
        this.nezto = nezto;
    }

    public async create(user_id: string): Promise<BaseVendor> {
        const user = await this.nezto.users.get(user_id);
        if (!user) throw new Error("User not found");

        const vendor = (await this.nezto.models.Vendor.create({ owner: user?._id })).populate('owner', 'name email phone');
        const baseVendor = new BaseVendor(vendor);
        this.set(String(baseVendor._id), baseVendor);
        return baseVendor;
    }

    public set(key: string, vendor: BaseVendor): void {
        this.cache.set(key, vendor);
        this.size++;
    }

    public async loadAll() {
        const vendors = await this.nezto.models.Vendor.find().populate('owner', 'name email phone').exec();
        vendors.forEach(vendor => {
            this.set(String(vendor._id), new BaseVendor(vendor));
        });
        return Array.from(this.cache.values());
    }

    public async get(id: string) {
        if (this.cache.has(String(id))) {
            return this.cache.get(String(id)) || null;
        }
        const vendor = await this.nezto.models.Vendor.findById(id).populate('owner', 'name email phone').exec();
        if (vendor) {
            this.set(String(id), new BaseVendor(vendor));
            return this.cache.get(String(id)) || null;
        }
        return null;
    }

    public has(id: string): boolean {
        return this.cache.has(String(id));
    }

    public delete(id: string) {
        this.cache.delete(String(id));
        this.size--;
        return this.nezto.models.Vendor.deleteOne({ _id: id });
    }

    public clear(): void {
        this.cache.clear();
        this.size = 0;
    }

    public toArray(): BaseVendor[] {
        return Array.from(this.cache.values());
    }


    public deleteMany(ids: string[]): Promise<any> {
        ids.forEach(id => this.delete(String(id)));
        return this.nezto.models.Vendor.deleteMany({ _id: { $in: ids.map(id => String(id)) } });
    }
}
