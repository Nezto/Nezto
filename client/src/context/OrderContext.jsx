import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const OrderContext = createContext();

// Custom hook to use the order context
export const useOrder = () => useContext(OrderContext);

// Provider component
export const OrderProvider = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  // Load orders from localStorage on initial render
  useEffect(() => {
    const savedActiveOrder = localStorage.getItem('activeOrder');
    const savedOrderHistory = localStorage.getItem('orderHistory');
    
    if (savedActiveOrder) {
      try {
        setActiveOrder(JSON.parse(savedActiveOrder));
      } catch (error) {
        console.error('Error parsing active order from localStorage:', error);
        localStorage.removeItem('activeOrder');
      }
    }
    
    if (savedOrderHistory) {
      try {
        setOrderHistory(JSON.parse(savedOrderHistory));
      } catch (error) {
        console.error('Error parsing order history from localStorage:', error);
        localStorage.removeItem('orderHistory');
      }
    }
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('activeOrder', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('activeOrder');
    }
    
    if (orderHistory.length > 0) {
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }
  }, [activeOrder, orderHistory]);

  // Generate a 4-digit OTP
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Create a new order
  const createOrder = (orderDetails) => {
    // Generate a random order ID if not provided
    if (!orderDetails.orderId) {
      orderDetails.orderId = Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    // Set default status if not provided
    if (!orderDetails.status) {
      orderDetails.status = 'confirmed';
    }
    
    // Set creation timestamp
    orderDetails.createdAt = new Date().toISOString();
    
    // Generate OTPs for pickup and delivery
    orderDetails.pickupOTP = generateOTP();
    orderDetails.deliveryOTP = generateOTP();
    
    // Set as active order
    setActiveOrder(orderDetails);
    
    // Add to order history
    setOrderHistory(prev => [orderDetails, ...prev]);
    
    return orderDetails;
  };

  // Update an existing order
  const updateOrder = (orderId, updates) => {
    // Update active order if it matches
    if (activeOrder && activeOrder.orderId === orderId) {
      const updatedOrder = { ...activeOrder, ...updates };
      setActiveOrder(updatedOrder);
    }
    
    // Update in order history
    setOrderHistory(prev => 
      prev.map(order => 
        order.orderId === orderId ? { ...order, ...updates } : order
      )
    );
  };

  // Complete an active order
  const completeOrder = (orderId) => {
    if (activeOrder && activeOrder.orderId === orderId) {
      // Update status in history
      updateOrder(orderId, { 
        status: 'delivered', 
        completedAt: new Date().toISOString() 
      });
      
      // Remove from active
      setActiveOrder(null);
    }
  };

  // Cancel an order
  const cancelOrder = (orderId) => {
    if (activeOrder && activeOrder.orderId === orderId) {
      // Update status in history
      updateOrder(orderId, { 
        status: 'cancelled', 
        cancelledAt: new Date().toISOString() 
      });
      
      // Remove from active
      setActiveOrder(null);
    }
  };

  // Get order by ID
  const getOrder = (orderId) => {
    return orderHistory.find(order => order.orderId === orderId);
  };

  // Value to be provided to consumers
  const value = {
    activeOrder,
    orderHistory,
    createOrder,
    updateOrder,
    completeOrder,
    cancelOrder,
    getOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
