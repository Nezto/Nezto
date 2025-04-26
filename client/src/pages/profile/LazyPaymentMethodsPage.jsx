import React, { Suspense, lazy } from 'react';

// Lazy load the PaymentMethodsPage component
const PaymentMethodsPage = lazy(() => import('./PaymentMethodsPage'));

// Loading component
const PaymentMethodsPageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const LazyPaymentMethodsPage = (props) => {
  return (
    <Suspense fallback={<PaymentMethodsPageLoading />}>
      <PaymentMethodsPage {...props} />
    </Suspense>
  );
};

export default LazyPaymentMethodsPage;
