import React, { Suspense, lazy } from 'react';

// Lazy load the PreferencesPage component
const PreferencesPage = lazy(() => import('./PreferencesPage'));

// Loading component
const PreferencesPageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="space-y-3">
          <div className="h-32 bg-gray-200 rounded w-full"></div>
          <div className="h-24 bg-gray-200 rounded w-full"></div>
          <div className="h-24 bg-gray-200 rounded w-full"></div>
          <div className="h-24 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const LazyPreferencesPage = (props) => {
  return (
    <Suspense fallback={<PreferencesPageLoading />}>
      <PreferencesPage {...props} />
    </Suspense>
  );
};

export default LazyPreferencesPage;
