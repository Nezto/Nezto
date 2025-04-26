import React, { Suspense, lazy } from 'react';

// Lazy load the EditProfilePage component
const EditProfilePage = lazy(() => import('./EditProfilePage'));

// Loading component
const EditProfilePageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <div className="animate-pulse space-y-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const LazyEditProfilePage = (props) => {
  return (
    <Suspense fallback={<EditProfilePageLoading />}>
      <EditProfilePage {...props} />
    </Suspense>
  );
};

export default LazyEditProfilePage;
