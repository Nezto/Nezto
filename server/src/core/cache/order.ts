import { Nezto } from "../nezto";
import { BaseOrder } from '@/core/order';


export class OrderCache{
    private cache: Map<string, BaseOrder> = new Map();
    private nezto: Nezto;
    public size: number=   0;

    constructor(nezto: Nezto) {
        this.nezto = nezto;
    }

    public set(key: string, order: BaseOrder): void {
        this.cache.set(key, order);
        this.size++;
    }

    public async loadAll(){
        const orders = await this.nezto.models.Order.find().populate('user', 'name email phone').populate('vendor', 'name email phone').populate('rider', 'name email phone').exec();
        orders.forEach(order => {
            this.cache.set(String(order._id), new BaseOrder(order));
        });
        return Array.from(this.cache.values());
    }

    public async get(id: string){
        if (this.cache.has(String(id))){
            return this.cache.get(String(id)) || null;
        }

        const order = await this.nezto.models.Order.findById(id).populate('user', 'name email phone').populate('vendor', 'name email phone').populate('rider', 'name email phone').exec();
        if (order) {
            this.cache.set(String(id), new BaseOrder(order));
            return this.cache.get(String(id)) || null;
        }
        return null;
    }

    public has(id: string): boolean {
        return this.cache.has(String(id));
    }

    public delete(id: string){
        this.cache.delete(String(id));
        return this.nezto.models.Order.deleteOne({ _id: id });
    }

    public clear(): void {
        this.cache.clear();
    }

    public toArray(): BaseOrder[] {
        return Array.from(this.cache.values());
    }

    public deleteOne(id: string): Promise<any> {
        this.cache.delete(String(id));
        return this.nezto.models.Order.deleteOne({ _id: String(id) });
    }

    public deleteMany(ids: string[]): Promise<any> {
        ids.forEach(id => this.cache.delete(String(id)));
        return this.nezto.models.Order.deleteMany({ _id: { $in: ids.map(id => String(id)) } });
    }
}