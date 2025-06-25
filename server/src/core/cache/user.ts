import jwt from 'jsonwebtoken';
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
        this.nezto.jwts.set(user.token, String(user._id));
        this.size++;
    }


    public async create(data: Partial<BaseUser>): Promise<BaseUser | null> {
        const existingUser = await this.findOne({ email: data.email });

        const user = existingUser || new this.nezto.models.User(data);

        const token = jwt.sign({ 
            _id: user._id, 
            name: user.name,
            email: user.email, 
            avatar: user.avatar, 
            roles: user.roles || ["user"],
            updatedAt: user.updatedAt,
        }, this.nezto.config.jwtConfig.secret);

        user.token = token; // Add token to user object
        const baseUser = new BaseUser(user);
        await user.save(); // Save the user with the token
        this.set(String(user._id), baseUser);
        return baseUser;
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

    public async findOne(query: Record<string, any>): Promise<BaseUser | null> {
        const user = await this.nezto.models.User.findOne(query).exec();
        if (user) {
            const baseUser = new BaseUser(user);
            this.set(String(user._id), baseUser);
            return baseUser;
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
