/**
 * @description A simple cache class for storing key-value pairs. of Laundry Ids and their respective owners.
 * @extends Map
 */
class _LaundryOwnerCache{
    objects : Map<string, string>;

    constructor() {
        this.objects = new Map();
    }

    set (key: string, value: string): void {
        this.objects.set(String(key), String(value));
    }

    get (key: string): string | undefined {
        return this.objects.get(key);
    }

}


const LaundryOwnerCache = new _LaundryOwnerCache()
const config_cache = new Map()

export { LaundryOwnerCache, config_cache };