import { Nezto } from "../nezto";
import { BaseUser } from '@/core/user';

export class UserCache {
    private cache: Map<string, BaseUser> = new Map();
    private nezto: Nezto;
    public size: number = 0;
    constructor(nezto: Nezto) {
        this.nezto = nezto;
    }

    public set(key: string, user: BaseUser): void {
        this.cache.set(key, user);
        this.size++;
    }

    public async loadAll() {
        const users = await this.nezto.models.User.find().exec();
        users.forEach(user => {
            this.set(String(user._id), new BaseUser(user));
        });
        return Array.from(this.cache.values());
    }

    public async get(id: string) {
        if (this.cache.has(String(id))) {
            return this.cache.get(String(id)) || null;
        }
        const user = await this.nezto.models.User.findById(id).exec();
        if (user) {
            this.set(String(id), new BaseUser(user));
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
        return this.nezto.models.User.deleteOne({ _id: id });
    }

    public clear(): void {
        this.cache.clear();
        this.size = 0;
    }

    public toArray(): BaseUser[] {
        return Array.from(this.cache.values());
    }

    public deleteMany(ids: string[]): Promise<any> {
        ids.forEach(id => this.delete(String(id)));
        return this.nezto.models.User.deleteMany({ _id: { $in: ids.map(id => String(id)) } });
    }
}
