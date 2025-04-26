import React, { Suspense, lazy } from 'react';

// Lazy load the ContactSupportPage component
const ContactSupportPage = lazy(() => import('./ContactSupportPage'));

// Loading component
const ContactSupportPageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-32 bg-gray-200 rounded w-full"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const LazyContactSupportPage = (props) => {
  return (
    <Suspense fallback={<ContactSupportPageLoading />}>
      <ContactSupportPage {...props} />
    </Suspense>
  );
};

export default LazyContactSupportPage;
