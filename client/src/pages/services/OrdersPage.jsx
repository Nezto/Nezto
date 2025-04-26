import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, Calendar, Phone, MapPin, Shield, Copy } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

const OrdersPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAllOrders, setShowAllOrders] = useState(!orderId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      if (orderId) {
        // Fix: Use orderId instead of id to match the property in the order object
        const order = orders?.find(o => o.orderId === orderId);
        if (order) {
          setSelectedOrder(order);
          setShowAllOrders(false);
          setError(null);
        } else {
          // Order not found, show all orders
          setShowAllOrders(true);
          setError('Order not found');
        }
      } else {
        setShowAllOrders(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error loading order:', err);
      setError('Something went wrong loading the order');
    } finally {
      setLoading(false);
    }
  }, [orderId, orders]);

  const handleBack = () => {
    if (!showAllOrders) {
      setShowAllOrders(true);
      navigate('/orders');
    } else {
      navigate(-1);
    }
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setShowAllOrders(false);
    navigate(`/orders/${order.orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId);
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder(prev => ({...prev, status: 'cancelled', statusDescription: 'Your order has been cancelled.'}));
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-primary animate-bounce" />
          </div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {showAllOrders ? 'My Orders' : 'Order Details'}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {error && !showAllOrders && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-6">
            <Package className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">{error}</h3>
            <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
            <button
              onClick={() => {
                setShowAllOrders(true);
                navigate('/orders');
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View All Orders
            </button>
          </div>
        )}
        
        {showAllOrders ? (
          /* Orders List */
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                <button
                  onClick={() => navigate('/services')}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-primary/30 transition-colors cursor-pointer"
                  onClick={() => handleOrderSelect(order)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{order.serviceName}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{order.pickupTime}</span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'confirmed' ? 'Confirmed' :
                           order.status === 'in-progress' ? 'In Progress' :
                           order.status === 'cancelled' ? 'Cancelled' :
                           'Completed'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{order.price}</div>
                      <div className="text-xs text-gray-500 mt-1">Total: {order.totalAmount}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Order Details */
          !error && selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    selectedOrder.status === 'confirmed' ? 'bg-green-100' :
                    selectedOrder.status === 'in-progress' ? 'bg-blue-100' :
                    selectedOrder.status === 'cancelled' ? 'bg-red-100' :
                    'bg-gray-100'
                  }`}>
                    <Package className={`h-6 w-6 ${
                      selectedOrder.status === 'confirmed' ? 'text-green-600' :
                      selectedOrder.status === 'in-progress' ? 'text-blue-600' :
                      selectedOrder.status === 'cancelled' ? 'text-red-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{selectedOrder.serviceName}</h2>
                    <p className="text-sm text-gray-600">{selectedOrder.statusDescription}</p>
                  </div>
                </div>
                
                {/* OTP Verification Codes */}
                {selectedOrder.status !== 'cancelled' && (
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <div className="flex items-center mb-3">
                      <Shield className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium text-blue-800">Verification Codes</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-md border border-blue-100">
                        <p className="text-xs text-blue-600 mb-1">Pickup OTP</p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-lg tracking-widest text-blue-800">
                            {selectedOrder.pickupOTP || '----'}
                          </span>
                          <button 
                            className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                            onClick={() => {
                              navigator.clipboard.writeText(selectedOrder.pickupOTP);
                              alert('Pickup OTP copied to clipboard!');
                            }}
                            aria-label="Copy pickup OTP"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border border-blue-100">
                        <p className="text-xs text-blue-600 mb-1">Delivery OTP</p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-lg tracking-widest text-blue-800">
                            {selectedOrder.deliveryOTP || '----'}
                          </span>
                          <button 
                            className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                            onClick={() => {
                              navigator.clipboard.writeText(selectedOrder.deliveryOTP);
                              alert('Delivery OTP copied to clipboard!');
                            }}
                            aria-label="Copy delivery OTP"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-blue-600 mt-3">
                      Share these verification codes with service providers when they arrive for pickup and delivery
                    </p>
                  </div>
                )}

                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
                  <button
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    className="w-full py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors mt-4"
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-4">Order Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Pickup Time</div>
                      <div className="text-gray-600 text-sm">{selectedOrder.pickupTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Estimated Completion</div>
                      <div className="text-gray-600 text-sm">{selectedOrder.estimatedCompletion}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Delivery Agent</div>
                      <div className="text-gray-600 text-sm">+{selectedOrder.riderPhone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Customer Support</div>
                      <div className="text-gray-600 text-sm">{selectedOrder.supportPhone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-4">Addresses</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Pickup Address</div>
                      <div className="text-gray-600 text-sm">
                        {selectedOrder.pickupAddress?.name}<br />
                        {selectedOrder.pickupAddress?.addressLine1}
                        {selectedOrder.pickupAddress?.addressLine2 && `, ${selectedOrder.pickupAddress.addressLine2}`}<br />
                        {selectedOrder.pickupAddress?.city}, {selectedOrder.pickupAddress?.state} - {selectedOrder.pickupAddress?.pincode}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Delivery Address</div>
                      <div className="text-gray-600 text-sm">
                        {selectedOrder.deliveryAddress?.id === selectedOrder.pickupAddress?.id ? (
                          <span className="italic">Same as pickup address</span>
                        ) : (
                          <>
                            {selectedOrder.deliveryAddress?.name}<br />
                            {selectedOrder.deliveryAddress?.addressLine1}
                            {selectedOrder.deliveryAddress?.addressLine2 && `, ${selectedOrder.deliveryAddress.addressLine2}`}<br />
                            {selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.state} - {selectedOrder.deliveryAddress?.pincode}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-4">Payment Details</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Charge</span>
                    <span className="text-gray-800">{selectedOrder.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-800">₹49</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="text-gray-800">₹30</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹50</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-800">Total Amount</span>
                      <span className="text-primary">{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">
                        {selectedOrder.paymentMethod === 'card' ? 'Credit/Debit Card' :
                         selectedOrder.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
                      </div>
                      {selectedOrder.paymentMethod === 'card' && (
                        <div className="text-gray-600 text-sm">•••• •••• •••• 1234</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
