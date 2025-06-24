
/**stores user data followed by their JWT */
const UserCache : Map<string, any> = new Map()
const LaundryOwnerCache : Map<string, string> = new Map()
const config_cache : Map<string, any> = new Map()

export { UserCache, LaundryOwnerCache, config_cache };