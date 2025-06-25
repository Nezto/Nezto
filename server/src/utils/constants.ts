export const UserRoles = {
  admin: 'admin',
  user: 'user',
  vendor: 'vendor',
};

export const OrderStatus = {
  pending: 'pending',
  accepted: 'accepted',
  to_client: 'to_client',
  to_vendor: 'to_rider',
  processing: 'processing',
  completed: 'completed',
  canceled: 'canceled',
  refunded: 'refunded',
};


export const Events = {
    ON_READY : "on_ready",
    ON_EXIT : "on_exit",
    ON_ERROR : "on_error",
    ON_START : "on_start"
}