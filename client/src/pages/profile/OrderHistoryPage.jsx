import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../component/block/NavBar';
import Footer from '../../component/block/Footer';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Package, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  ChevronDown,
  ShoppingCart,
  Download
} from 'lucide-react';

// Mock order data
const useOrderHistory = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD123456',
      status: 'completed',
      serviceName: 'Premium Laundry',
      orderDate: '2025-04-10T10:30:00',
      completionDate: '2025-04-12T15:45:00',
      totalAmount: 499,
      items: [
        { name: 'Shirt', quantity: 2, price: 150 },
        { name: 'Pants', quantity: 1, price: 199 }
      ],
      paymentMethod: 'Credit Card',
      address: '123 Main Street, Apartment 4B, Mumbai',
      invoiceUrl: '#'
    },
    {
      id: 'ORD789012',
      status: 'cancelled',
      serviceName: 'Express Dry Cleaning',
      orderDate: '2025-03-25T14:20:00',
      cancellationDate: '2025-03-25T16:30:00',
      totalAmount: 799,
      items: [
        { name: 'Suit', quantity: 1, price: 599 },
        { name: 'Tie', quantity: 2, price: 100 }
      ],
      paymentMethod: 'UPI',
      address: '456 Park Avenue, Villa 7, Delhi',
      cancellationReason: 'Customer requested cancellation',
      invoiceUrl: '#'
    },
    {
      id: 'ORD345678',
      status: 'active',
      serviceName: 'Shoe Cleaning',
      orderDate: '2025-04-20T09:15:00',
      estimatedCompletion: '2025-04-22T18:00:00',
      totalAmount: 399,
      items: [
        { name: 'Sneakers', quantity: 1, price: 299 },
        { name: 'Leather Polish', quantity: 1, price: 100 }
      ],
      paymentMethod: 'Cash on Delivery',
      address: '789 Lake View Road, Block C, Bangalore',
      trackingUrl: '#',
      pickupOtp: '1234',
      deliveryOtp: '5678'
    },
    {
      id: 'ORD901234',
      status: 'completed',
      serviceName: 'Curtain Cleaning',
      orderDate: '2025-03-15T11:45:00',
      completionDate: '2025-03-18T14:30:00',
      totalAmount: 1299,
      items: [
        { name: 'Large Curtains', quantity: 2, price: 499 },
        { name: 'Small Curtains', quantity: 1, price: 299 }
      ],
      paymentMethod: 'Credit Card',
      address: '234 Hill Road, Sector 9, Pune',
      invoiceUrl: '#'
    }
  ]);

  return {
    orders,
    cancelOrder: (orderId) => {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? {...order, status: 'cancelled', cancellationDate: new Date().toISOString(), cancellationReason: 'Customer requested cancellation'} 
          : order
      ));
    }
  };
};

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { orders, cancelOrder } = useOrderHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleCancelOrder = (e, orderId) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'active':
        return <RotateCcw className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'active':
        return 'In Progress';
      default:
        return 'Processing';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white mt-12">
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-full bg-white/10" onClick={() => navigate('/profile')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Order History</h1>
          <div className="w-5"></div> {/* Empty div for flex alignment */}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 sticky top-0 z-10 bg-gray-50">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search by order ID or service..."
            className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Filter by Status</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${statusFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${statusFilter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setStatusFilter('active')}
              >
                In Progress
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${statusFilter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${statusFilter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setStatusFilter('cancelled')}
              >
                Cancelled
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div 
                  className="p-4 border-b border-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggleExpand(order.id)}
                >
                  <div>
                    <div className="flex items-center">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </div>
                      <span className="text-sm text-gray-500">{order.id}</span>
                    </div>
                    <p className="text-gray-800 font-medium mt-1">{order.serviceName}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="text-lg font-semibold text-gray-800 mr-3">₹{order.totalAmount.toFixed(2)}</div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedOrderId === order.id ? 'transform rotate-180' : ''}`} />
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="p-4 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Order Details</h4>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Order Date:</div>
                          <div className="text-gray-800">{formatDate(order.orderDate)}</div>
                          
                          {order.status === 'completed' && (
                            <>
                              <div className="text-gray-500">Completion Date:</div>
                              <div className="text-gray-800">{formatDate(order.completionDate)}</div>
                            </>
                          )}
                          
                          {order.status === 'cancelled' && (
                            <>
                              <div className="text-gray-500">Cancellation Date:</div>
                              <div className="text-gray-800">{formatDate(order.cancellationDate)}</div>
                              
                              <div className="text-gray-500">Reason:</div>
                              <div className="text-gray-800">{order.cancellationReason || 'Not specified'}</div>
                            </>
                          )}
                          
                          {order.status === 'active' && (
                            <>
                              <div className="text-gray-500">Estimated Completion:</div>
                              <div className="text-gray-800">{formatDate(order.estimatedCompletion)}</div>
                            </>
                          )}
                          
                          <div className="text-gray-500">Payment Method:</div>
                          <div className="text-gray-800">{order.paymentMethod}</div>
                          
                          <div className="text-gray-500">Delivery Address:</div>
                          <div className="text-gray-800">{order.address}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
                      <div className="bg-white rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                              <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800 text-center">{item.quantity}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800 text-right">₹{item.price.toFixed(2)}</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50">
                              <td colSpan="2" className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-right">Total:</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-right">₹{order.totalAmount.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {order.status === 'active' && (
                        <>
                          <button
                            onClick={() => navigate(`/order-tracking/${order.id}`)}
                            className="flex-1 py-2 bg-primary/10 text-primary font-medium rounded-lg flex items-center justify-center text-sm"
                          >
                            <Package className="w-4 h-4 mr-1" /> Track Order
                          </button>
                          <button
                            onClick={(e) => handleCancelOrder(e, order.id)}
                            className="flex-1 py-2 bg-red-100 text-red-700 font-medium rounded-lg flex items-center justify-center text-sm"
                          >
                            <XCircle className="w-4 h-4 mr-1" /> Cancel Order
                          </button>
                        </>
                      )}
                      
                      {(order.status === 'completed' || order.status === 'cancelled') && (
                        <>
                          <button
                            onClick={() => navigate(`/order-details/${order.id}`)}
                            className="flex-1 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg flex items-center justify-center text-sm"
                          >
                            <Package className="w-4 h-4 mr-1" /> View Details
                          </button>
                          {order.status === 'completed' && (
                            <button
                              onClick={() => window.open(order.invoiceUrl, '_blank')}
                              className="flex-1 py-2 bg-primary/10 text-primary font-medium rounded-lg flex items-center justify-center text-sm"
                            >
                              <Download className="w-4 h-4 mr-1" /> Download Invoice
                            </button>
                          )}
                        </>
                      )}
                      
                      {order.status === 'completed' && (
                        <button
                          onClick={() => navigate(`/reorder/${order.id}`)}
                          className="flex-1 py-2 bg-primary text-white font-medium rounded-lg flex items-center justify-center text-sm"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" /> Reorder
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-6 mt-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6 text-center">
              {searchQuery || statusFilter !== 'all' 
                ? 'No orders match your search criteria' 
                : 'You haven\'t placed any orders yet'}
            </p>
            <button 
              onClick={() => navigate('/services')} 
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> Browse Services
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
