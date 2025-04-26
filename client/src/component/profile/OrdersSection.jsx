import React, { useState } from 'react';
import { Box, Search, ChevronDown, ChevronUp, Calendar, Clock, MapPin, UserCheck, Package, CheckCircle, Truck, AlertTriangle } from 'lucide-react';

const OrdersSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample order data
  const orders = [
    {
      id: 'ORD123456',
      date: '12 May, 2023',
      status: 'delivered',
      statusText: 'Delivered',
      total: '₹549',
      address: '123 Green Street, Koramangala, Bangalore - 560034',
      paymentMethod: 'Paid Online (Credit Card)',
      items: [
        { id: 1, name: 'Regular Dry Cleaning', quantity: 3, price: '₹207' },
        { id: 2, name: 'Premium Suit Care', quantity: 1, price: '₹399' }
      ],
      timeline: [
        { status: 'Order Placed', date: '12 May, 10:30 AM', completed: true },
        { status: 'Pickup Scheduled', date: '12 May, 11:15 AM', completed: true },
        { status: 'Items Picked Up', date: '12 May, 02:45 PM', completed: true },
        { status: 'Processing Started', date: '12 May, 04:30 PM', completed: true },
        { status: 'Processing Completed', date: '13 May, 12:15 PM', completed: true },
        { status: 'Out for Delivery', date: '14 May, 09:30 AM', completed: true },
        { status: 'Delivered', date: '14 May, 03:45 PM', completed: true }
      ]
    },
    {
      id: 'ORD123457',
      date: '18 May, 2023',
      status: 'processing',
      statusText: 'Processing',
      total: '₹299',
      address: '123 Green Street, Koramangala, Bangalore - 560034',
      paymentMethod: 'Pay on Delivery',
      items: [
        { id: 1, name: 'Bedding Package', quantity: 1, price: '₹299' }
      ],
      timeline: [
        { status: 'Order Placed', date: '18 May, 09:15 AM', completed: true },
        { status: 'Pickup Scheduled', date: '18 May, 10:00 AM', completed: true },
        { status: 'Items Picked Up', date: '18 May, 01:30 PM', completed: true },
        { status: 'Processing Started', date: '18 May, 03:45 PM', completed: true },
        { status: 'Processing Completed', date: '19 May, 11:30 AM', completed: false },
        { status: 'Out for Delivery', date: 'Expected 20 May', completed: false },
        { status: 'Delivered', date: 'Expected 20 May', completed: false }
      ]
    },
    {
      id: 'ORD123458',
      date: '20 May, 2023',
      status: 'pickup',
      statusText: 'Pickup Scheduled',
      total: '₹149',
      address: 'Building 10, Tech Park, Whitefield, Bangalore - 560066',
      paymentMethod: 'Paid Online (UPI)',
      items: [
        { id: 1, name: 'Wash & Fold', quantity: 1.5, price: '₹149' }
      ],
      timeline: [
        { status: 'Order Placed', date: '20 May, 08:30 AM', completed: true },
        { status: 'Pickup Scheduled', date: '20 May, 09:15 AM', completed: true },
        { status: 'Items Picked Up', date: 'Scheduled 20 May, 04:00 PM', completed: false },
        { status: 'Processing Started', date: 'Expected 20 May', completed: false },
        { status: 'Processing Completed', date: 'Expected 21 May', completed: false },
        { status: 'Out for Delivery', date: 'Expected 22 May', completed: false },
        { status: 'Delivered', date: 'Expected 22 May', completed: false }
      ]
    },
    {
      id: 'ORD123459',
      date: '05 May, 2023',
      status: 'cancelled',
      statusText: 'Cancelled',
      total: '₹599',
      address: '123 Green Street, Koramangala, Bangalore - 560034',
      paymentMethod: 'Refunded to Original Payment Method',
      items: [
        { id: 1, name: 'Leather & Suede', quantity: 1, price: '₹599' }
      ],
      timeline: [
        { status: 'Order Placed', date: '05 May, 11:45 AM', completed: true },
        { status: 'Pickup Scheduled', date: '05 May, 12:30 PM', completed: true },
        { status: 'Cancelled', date: '05 May, 02:15 PM', completed: true, isCancelled: true },
        { status: 'Refund Initiated', date: '05 May, 02:30 PM', completed: true },
        { status: 'Refund Completed', date: '06 May, 10:15 AM', completed: true }
      ]
    }
  ];
  
  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'Processing' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'pickup':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Box className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pickup':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleOrderExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Order History</h2>
      </div>
      
      {/* Filters and Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID or product"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="divide-y divide-gray-100">
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No orders found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No results matching "${searchQuery}"` 
                : activeTab === 'all' 
                  ? "You haven't placed any orders yet" 
                  : `You don't have any ${activeTab} orders`}
            </p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
              {/* Order Header */}
              <div 
                className="flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div className="flex items-start space-x-3">
                  {getStatusIcon(order.status)}
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-800">{order.id}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.statusText}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>{order.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Box className="h-3.5 w-3.5 mr-1.5" />
                        <span>
                          {order.items.reduce((total, item) => total + item.quantity, 0)} 
                          {order.items.reduce((total, item) => total + item.quantity, 0) === 1 ? ' item' : ' items'}
                        </span>
                      </div>
                      <div className="font-medium text-gray-800">{order.total}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mt-3 md:mt-0">
                  <button
                    className="text-primary text-sm font-medium flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      // In a real app, this would navigate to order details
                      alert(`View details for order ${order.id}`);
                    }}
                  >
                    View Details
                  </button>
                  <button className="ml-4 text-gray-500 focus:outline-none">
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Expanded Order Details */}
              {expandedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Order Items</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between py-1">
                          <div className="text-sm">
                            <span className="text-gray-800">{item.name}</span>
                            <span className="text-gray-500"> × {item.quantity}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-800">{item.price}</div>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-800">Total</div>
                        <div className="text-sm font-medium text-gray-800">{order.total}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Address */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Address</h4>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{order.address}</p>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Payment</h4>
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 text-gray-500 mr-2" />
                      <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                    </div>
                  </div>
                  
                  {/* Order Timeline */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Order Timeline</h4>
                    <div className="relative">
                      {order.timeline.map((step, index) => (
                        <div key={index} className="flex mb-4 last:mb-0">
                          {/* Status Indicator */}
                          <div className="mr-3 relative">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? step.isCancelled 
                                  ? 'bg-red-100 text-red-500' 
                                  : 'bg-primary/10 text-primary' 
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {step.completed ? (
                                step.isCancelled ? (
                                  <AlertTriangle className="h-3.5 w-3.5" />
                                ) : (
                                  <CheckCircle className="h-3.5 w-3.5" />
                                )
                              ) : (
                                <Clock className="h-3.5 w-3.5" />
                              )}
                            </div>
                            
                            {/* Vertical Line */}
                            {index < order.timeline.length - 1 && (
                              <div className={`absolute h-full w-0.5 top-6 left-1/2 transform -translate-x-1/2 ${
                                step.completed ? 'bg-primary' : 'bg-gray-200'
                              }`}></div>
                            )}
                          </div>
                          
                          {/* Status Text */}
                          <div>
                            <p className={`text-sm font-medium ${
                              step.isCancelled ? 'text-red-600' : 'text-gray-800'
                            }`}>
                              {step.status}
                            </p>
                            <p className="text-xs text-gray-500">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersSection; 