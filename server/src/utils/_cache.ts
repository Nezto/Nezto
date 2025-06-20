

/**
 * @description A simple cache class for storing key-value pairs. of Laundry Ids and their respective owners.
 * @extends Map
 */
class _LaundryOwnerCache extends Map {
    /**
     * @description Adds a key-value pair to the cache.
     */
    set(key:string, value:string) : this {
        super.set(`${key}`, `${value}`); // Convert value to string before storing
        return this;
    }

    /**
     * @description Retrieves a value from the cache by key.
     */
    get(key : string) : string | null {
        return super.get(key) || null;
    }

}

// example usage of the cache
// const cache = new LaundryOwnerCache();
// cache.set("ObjectID86457", "ObjectID61243"); // Example usage: setting a laundry ID with its owner ID
// console.log(cache.get("ObjectID86457")); // Example usage: getting the owner ID for a laundry ID

const LaundryOwnerCache = new _LaundryOwnerCache();
const config_cache = new Map()

export { LaundryOwnerCache, config_cache };