import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  Calendar, 
  Phone, 
  MapPin, 
  Shield, 
  CheckCircle, 
  Truck, 
  User,
  Box
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrder();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId && orders) {
      const foundOrder = orders.find(o => o.orderId === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        setError(null);
      } else {
        setError('Order not found');
      }
    } else if (!orderId) {
      setError('No order ID provided');
    }
    setLoading(false);
  }, [orderId, orders]);

  const handleBack = () => {
    navigate(-1);
  };

  // Get the current step in the order process
  const getCurrentStep = () => {
    if (!order) return 0;
    
    const statusMap = {
      'confirmed': 1,
      'pickup_scheduled': 2,
      'picked_up': 3,
      'processing': 4,
      'delivery_scheduled': 5,
      'delivered': 6,
      'cancelled': -1
    };
    
    return statusMap[order.status] || 0;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get estimated delivery time
  const getEstimatedDelivery = () => {
    if (!order || !order.createdAt) return 'N/A';
    
    const created = new Date(order.createdAt);
    const estimated = new Date(created);
    estimated.setHours(created.getHours() + 48); // Add 48 hours
    
    return formatDate(estimated);
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-xl font-semibold text-gray-800">Order Tracking</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View All Orders
            </button>
          </div>
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
            <h1 className="text-xl font-semibold text-gray-800">Order Tracking</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {order && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">{order.serviceName}</h2>
                    <p className="text-sm text-gray-600">Order #{order.orderId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Ordered on</div>
                  <div className="font-medium text-gray-800">{formatDate(order.createdAt)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-medium text-gray-800">{getEstimatedDelivery()}</p>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status === 'confirmed' ? 'Confirmed' :
                     order.status === 'pickup_scheduled' ? 'Pickup Scheduled' :
                     order.status === 'picked_up' ? 'Picked Up' :
                     order.status === 'processing' ? 'Processing' :
                     order.status === 'delivery_scheduled' ? 'Out for Delivery' :
                     order.status === 'delivered' ? 'Delivered' :
                     order.status === 'cancelled' ? 'Cancelled' : 'Processing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-6">Order Progress</h3>
              
              <div className="space-y-8">
                {/* Step 1: Order Confirmed */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      getCurrentStep() >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    {getCurrentStep() !== 6 && <div className="w-1 flex-1 bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-gray-800">Order Confirmed</p>
                    <p className="text-sm text-gray-600">
                      {getCurrentStep() >= 1 ? formatDate(order.createdAt) : 'Pending'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your order has been received and confirmed
                    </p>
                  </div>
                </div>
                
                {/* Step 2: Pickup Scheduled */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      getCurrentStep() >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Calendar className="h-5 w-5" />
                    </div>
                    {getCurrentStep() !== 6 && <div className="w-1 flex-1 bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-gray-800">Pickup Scheduled</p>
                    <p className="text-sm text-gray-600">
                      {getCurrentStep() >= 2 ? 'Scheduled' : 'Pending'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Our service provider will arrive at your location for pickup
                    </p>
                  </div>
                </div>
                
                {/* Step 3: Items Picked Up */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      getCurrentStep() >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Box className="h-5 w-5" />
                    </div>
                    {getCurrentStep() !== 6 && <div className="w-1 flex-1 bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-gray-800">Items Picked Up</p>
                    <p className="text-sm text-gray-600">
                      {getCurrentStep() >= 3 ? 'Completed' : 'Pending'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your items have been picked up and are on their way to our facility
                    </p>
                    {getCurrentStep() >= 3 && order.pickupOTP && (
                      <div className="mt-2 flex items-center">
                        <Shield className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">
                          Verified with OTP: {order.pickupOTP}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Step 4: Processing */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      getCurrentStep() >= 4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Package className="h-5 w-5" />
                    </div>
                    {getCurrentStep() !== 6 && <div className="w-1 flex-1 bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-gray-800">Processing</p>
                    <p className="text-sm text-gray-600">
                      {getCurrentStep() >= 4 ? 'In Progress' : 'Pending'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your items are being processed at our facility
                    </p>
                  </div>
                </div>
                
                {/* Step 5: Out for Delivery */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      getCurrentStep() >= 5 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Truck className="h-5 w-5" />
                    </div>
                    {getCurrentStep() !== 6 && <div className="w-1 flex-1 bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-gray-800">Out for Delivery</p>
                    <p className="text-sm text-gray-600">
                      {getCurrentStep() >= 5 ? 'On the way' : 'Pending'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your items are on the way back to your location
                    </p>
                  </div>
                </div>
                
                {/* Step 6: Delivered */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      getCurrentStep() >= 6 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Delivered</p>
                    <p className="text-sm text-gray-600">
                      {getCurrentStep() >= 6 ? 'Completed' : 'Pending'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your order has been delivered successfully
                    </p>
                    {getCurrentStep() >= 6 && order.deliveryOTP && (
                      <div className="mt-2 flex items-center">
                        <Shield className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">
                          Verified with OTP: {order.deliveryOTP}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* OTP Verification Codes */}
            {order.status !== 'cancelled' && order.status !== 'delivered' && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-blue-800">Verification Codes</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md border border-blue-100">
                    <p className="text-sm text-blue-600 mb-2">Pickup OTP</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xl tracking-widest text-blue-800">
                        {order.pickupOTP || '----'}
                      </span>
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(order.pickupOTP);
                          alert('Pickup OTP copied to clipboard!');
                        }}
                        aria-label="Copy pickup OTP"
                      >
                        <span className="text-xs mr-1">Copy</span>
                      </button>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      Share this code with the service provider during pickup
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md border border-blue-100">
                    <p className="text-sm text-blue-600 mb-2">Delivery OTP</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xl tracking-widest text-blue-800">
                        {order.deliveryOTP || '----'}
                      </span>
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(order.deliveryOTP);
                          alert('Delivery OTP copied to clipboard!');
                        }}
                        aria-label="Copy delivery OTP"
                      >
                        <span className="text-xs mr-1">Copy</span>
                      </button>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      Share this code with the service provider during delivery
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-blue-600 mt-4">
                  These verification codes ensure secure handover of your items
                </p>
              </div>
            )}
            
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-4">Need Help?</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Contact Support</p>
                    <p className="text-sm text-gray-500">We're here to help</p>
                  </div>
                </div>
                <a
                  href="tel:+918800000000"
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
