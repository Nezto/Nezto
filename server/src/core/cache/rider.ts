import { Nezto } from "../nezto";
import { BaseRider } from '@/core/rider';

export class RiderCache {
    private cache: Map<string, BaseRider> = new Map();
    private nezto: Nezto;
    public size: number = 0;
    constructor(nezto: Nezto) {
        this.nezto = nezto;
    }

    public set(key: string, rider: BaseRider): void {
        this.cache.set(key, rider);
        this.size++;
    }

    public async loadAll() {
        const riders = await this.nezto.models.Rider.find().exec();
        riders.forEach(rider => {
            this.set(String(rider._id), new BaseRider(rider));
        });
        return Array.from(this.cache.values());
    }

    public async get(id: string) {
        if (this.cache.has(String(id))) {
            return this.cache.get(String(id)) || null;
        }
        const rider = await this.nezto.models.Rider.findById(id).exec();
        if (rider) {
            this.set(String(id), new BaseRider(rider));
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
        return this.nezto.models.Rider.deleteOne({ _id: id });
    }

    public clear(): void {
        this.cache.clear();
        this.size = 0;
    }

    public toArray(): BaseRider[] {
        return Array.from(this.cache.values());
    }


    public deleteMany(ids: string[]): Promise<any> {
        ids.forEach(id => this.delete(String(id)));
        return this.nezto.models.Rider.deleteMany({ _id: { $in: ids.map(id => String(id)) } });
    }
}
