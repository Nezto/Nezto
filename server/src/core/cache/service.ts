import { Nezto } from "../nezto";
import { BaseService } from '@/core/service';

export class ServiceCache {
    private cache: Map<string, BaseService> = new Map();
    private nezto: Nezto;
    public size: number = 0;
    constructor(nezto: Nezto) {
        this.nezto = nezto;
    }

    public set(key: string, service: BaseService): void {
        this.cache.set(key, service);
        this.size++;
    }

    public async loadAll() {
        const services = await this.nezto.models.Service.find().exec();
        services.forEach(service => {
            this.set(String(service._id), new BaseService(service));
        });
        return Array.from(this.cache.values());
    }

    public async get(id: string) {
        if (this.cache.has(String(id))) {
            return this.cache.get(String(id)) || null;
        }
        const service = await this.nezto.models.Service.findById(id).exec();
        if (service) {
            this.set(String(id), new BaseService(service));
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
        return this.nezto.models.Service.deleteOne({ _id: id });
    }

    public clear(): void {
        this.cache.clear();
        this.size = 0;
    }

    public toArray(): BaseService[] {
        return Array.from(this.cache.values());
    }


    public deleteMany(ids: string[]): Promise<any> {
        ids.forEach(id => this.delete(String(id)));
        return this.nezto.models.Service.deleteMany({ _id: { $in: ids.map(id => String(id)) } });
    }
}
