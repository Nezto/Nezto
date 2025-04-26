import React, { Suspense, lazy } from 'react';

// Lazy load the PrivacyPolicyPage component
const PrivacyPolicyPage = lazy(() => import('./PrivacyPolicyPage'));

// Loading component
const PrivacyPolicyPageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const LazyPrivacyPolicyPage = (props) => {
  return (
    <Suspense fallback={<PrivacyPolicyPageLoading />}>
      <PrivacyPolicyPage {...props} />
    </Suspense>
  );
};

export default LazyPrivacyPolicyPage;
