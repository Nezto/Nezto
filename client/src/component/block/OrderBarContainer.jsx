import React, { useEffect } from 'react';
import { useOrder } from '../../context/OrderContext';
import ActiveOrderBar from './ActiveOrderBar';

const OrderBarContainer = () => {
  const { activeOrder } = useOrder();

  // Add padding to main content when there's an active order
  useEffect(() => {
    const mainElements = document.querySelectorAll('main');

    if (activeOrder) {
      mainElements.forEach(el => el.classList.add('has-active-order'));
    } else {
      mainElements.forEach(el => el.classList.remove('has-active-order'));
    }

    return () => {
      mainElements.forEach(el => el.classList.remove('has-active-order'));
    };
  }, [activeOrder]);

  return activeOrder ? (
    <div className="order-bar-container">
      <ActiveOrderBar order={activeOrder} />
    </div>
  ) : null;
};

export default OrderBarContainer;
