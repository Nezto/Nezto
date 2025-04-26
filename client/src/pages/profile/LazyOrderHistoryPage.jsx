import React, { Suspense, lazy } from 'react';

// Lazy load the OrderHistoryPage component
const OrderHistoryPage = lazy(() => import('./OrderHistoryPage'));

// Loading component
const OrderHistoryPageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const LazyOrderHistoryPage = (props) => {
  return (
    <Suspense fallback={<OrderHistoryPageLoading />}>
      <OrderHistoryPage {...props} />
    </Suspense>
  );
};

export default LazyOrderHistoryPage;
