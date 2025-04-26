import React, { Suspense, lazy } from 'react';

// Lazy load the AboutPage component
const AboutPage = lazy(() => import('./AboutPage'));

// Loading component
const AboutPageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-32 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 rounded w-full"></div>
          <div className="h-24 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const LazyAboutPage = (props) => {
  return (
    <Suspense fallback={<AboutPageLoading />}>
      <AboutPage {...props} />
    </Suspense>
  );
};

export default LazyAboutPage;
