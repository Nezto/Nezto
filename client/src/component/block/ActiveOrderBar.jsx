import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Truck, Clock, Package, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';

const ActiveOrderBar = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { cancelOrder } = useOrder();

  if (!order) return null;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleViewDetails = () => {
    navigate(`/orders/${order.orderId}`);
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const statuses = ['confirmed', 'pickup_scheduled', 'picked_up', 'processing', 'delivery_scheduled', 'delivered'];
    const currentIndex = statuses.indexOf(order.status);
    return Math.max(5, Math.min(100, (currentIndex / (statuses.length - 1)) * 100));
  };

  // Get status text
  const getStatusText = () => {
    switch (order.status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'pickup_scheduled':
        return 'Pickup Scheduled';
      case 'picked_up':
        return 'Items Picked Up';
      case 'processing':
        return 'Processing';
      case 'delivery_scheduled':
        return 'Delivery Scheduled';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Processing';
    }
  };

  return (
    <AnimatePresence>
      {isExpanded ? (
        <motion.div
          key="expanded"
          initial={{ height: 60 }}
          animate={{ height: 'auto' }}
          exit={{ height: 60 }}
          className="bg-white border-t border-gray-200 shadow-lg rounded-t-xl overflow-hidden expanded"
        >
          {/* Header - Always visible */}
          <div
            className="flex items-center justify-between px-4 py-3 bg-primary text-white cursor-pointer"
            onClick={toggleExpand}
          >
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              <span className="font-medium">Active Order</span>
            </div>
            <ChevronDown className="h-5 w-5" />
          </div>

          {/* Expanded content */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800">{order.serviceName}</h3>
                <p className="text-sm text-gray-500">Order #{order.orderId}</p>
              </div>
              <div className="flex items-center text-sm text-primary">
                <Clock className="h-4 w-4 mr-1" />
                <span>{order.estimatedCompletion}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Confirmed</span>
                <span>Processing</span>
                <span>Delivered</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{getStatusText()}</p>
                  <p className="text-xs text-gray-500">{order.statusDescription}</p>
                </div>
              </div>
              <a
                href={`tel:${order.riderPhone}`}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>

            {/* OTP Information */}
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Verification Codes</h4>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-blue-600 mb-1">Pickup OTP</p>
                  <div className="flex items-center">
                    <div className="bg-white px-3 py-1 rounded border border-blue-200">
                      <span className="font-mono font-bold text-lg tracking-widest text-blue-800">
                        {order.pickupOTP || '----'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-blue-600 mb-1">Delivery OTP</p>
                  <div className="flex items-center">
                    <div className="bg-white px-3 py-1 rounded border border-blue-200">
                      <span className="font-mono font-bold text-lg tracking-widest text-blue-800">
                        {order.deliveryOTP || '----'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                Share these codes with service providers for verification
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleViewDetails}
                className="flex-1 py-2 rounded-lg bg-primary text-white font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this order?')) {
                    // Call the cancelOrder function from context
                    cancelOrder(order.orderId);
                    alert('Your order has been cancelled. A confirmation will be sent to your email.');
                    // The order bar will automatically disappear because the active order is now null
                  }
                }}
                className="flex-1 py-2 rounded-lg border border-red-300 text-red-600 font-medium hover:bg-red-50 transition-colors"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="collapsed"
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          exit={{ y: 60 }}
          className="bg-primary text-white py-3 px-4 flex items-center justify-between rounded-t-xl shadow-lg cursor-pointer"
          onClick={toggleExpand}
        >
          <div className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            <div>
              <p className="font-medium">{order.serviceName}</p>
              <p className="text-xs text-white/80">{getStatusText()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-sm mr-3">
              <Clock className="h-4 w-4 inline mr-1" />
              <span>{order.estimatedCompletion}</span>
            </div>
            <ChevronUp className="h-5 w-5" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActiveOrderBar;
