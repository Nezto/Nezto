import { Nezto } from '../nezto';
import { OrderCache }   from './order';
import { UserCache }    from './user';
import { RiderCache }   from './rider';
import { VendorCache }  from './vendor';
import { ServiceCache } from './service';


export const cache = {
    OrderCache,
    UserCache,
    RiderCache,
    VendorCache,
    ServiceCache
}

export async function loadAllCache(app : Nezto) {
    await app.orders.loadAll();
    await app.users.loadAll();
    await app.riders.loadAll();
    await app.vendors.loadAll();
    await app.services.loadAll();
    app.events.emit("on_ready");
}