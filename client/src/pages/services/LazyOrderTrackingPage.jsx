import React, { Suspense, lazy } from 'react';

// Lazy load the OrderTrackingPage component
const OrderTrackingPage = lazy(() => import('./OrderTrackingPage'));

// Loading component
const OrderTrackingLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-32"></div>
    </div>
  </div>
);

const LazyOrderTrackingPage = (props) => {
  return (
    <Suspense fallback={<OrderTrackingLoading />}>
      <OrderTrackingPage {...props} />
    </Suspense>
  );
};

export default LazyOrderTrackingPage;
