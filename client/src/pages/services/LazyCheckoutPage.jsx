import React, { Suspense, lazy } from 'react';

// Lazy load the CheckoutPage component
const CheckoutPage = lazy(() => import('./CheckoutPage'));

// Loading component
const CheckoutPageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const LazyCheckoutPage = (props) => {
  return (
    <Suspense fallback={<CheckoutPageLoading />}>
      <CheckoutPage {...props} />
    </Suspense>
  );
};

export default LazyCheckoutPage;
