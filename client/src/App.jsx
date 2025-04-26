import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashScreen from './component/block/SplashScreen'
import { Helmet } from 'react-helmet'
import { OrderProvider } from './context/OrderContext'
import OrderBarContainer from './component/block/OrderBarContainer'

// Lazy load the pages with prefetching
const HomePage = lazy(() => import(/* webpackPrefetch: true */ './pages/HomePage'))
const ProfilePage = lazy(() => import(/* webpackPrefetch: true */ './pages/ProfilePage'))
const ServicesPage = lazy(() => import(/* webpackPrefetch: true */ './pages/ServicesPages'))
// Lazy load services-related pages
const ServiceDetailsPage = lazy(() => import('./pages/services/ServiceDetailsPage'))
const AddressSelectionPage = lazy(() => import('./pages/services/LazyAddressSelectionPage'))
const CheckoutPage = lazy(() => import('./pages/services/LazyCheckoutPage'))
const OrdersPage = lazy(() => import('./pages/services/OrdersPage'))

// Lazy load profile-related pages
const SavedServicesPage = lazy(() => import('./pages/profile/LazySavedServicesPage'))
const OrderHistoryPage = lazy(() => import('./pages/profile/LazyOrderHistoryPage'))
const SavedAddressesPage = lazy(() => import('./pages/profile/LazySavedAddressesPage'))
const PaymentMethodsPage = lazy(() => import('./pages/profile/LazyPaymentMethodsPage'))
const EditProfilePage = lazy(() => import('./pages/profile/LazyEditProfilePage'))
const PreferencesPage = lazy(() => import('./pages/profile/LazyPreferencesPage'))

// Lazy load support-related pages
const FAQPage = lazy(() => import('./pages/support/LazyFAQPage'))
const ContactSupportPage = lazy(() => import('./pages/support/LazyContactSupportPage'))
const AboutPage = lazy(() => import('./pages/support/LazyAboutPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/support/LazyPrivacyPolicyPage'))
const TermsPage = lazy(() => import('./pages/support/LazyTermsPage'))

// Lazy load auth-related pages
const AuthPage = lazy(() => import('./pages/auth/LazyAuthPage'))

// Lazy load order tracking page
const OrderTrackingPage = lazy(() => import('./pages/services/LazyOrderTrackingPage'))

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div
      className="text-primary text-xl font-bold animate-pulse"
      style={{
        // Reserve space to prevent layout shift
        height: '24px',
        minWidth: '120px'
      }}
    >
      Loading...
    </div>
  </div>
);

// Error Boundary for handling failed suspense
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-white flex-col">
          <div className="text-red-500 text-xl font-bold mb-4">Something went wrong</div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Auto-hide splash after 2 seconds

    // Check if user is already authenticated (e.g., from localStorage)
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  
  const handleLogin = () => {
    setIsAuthenticated(true);
    // In a real app, you would store the auth token
    localStorage.setItem('authToken', 'sample-token');
  };

  return (
    <>
      <Helmet>
        {/* Preconnect to necessary domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        {/* Preload critical assets */}
        <link rel="preload" href="/img/logo/logo-header.png" as="image" />

        {/* Add font display strategies */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          media="print"
          onload="this.media='all'"
        />

        {/* Delay non-critical scripts */}
        <script src="/js/analytics.js" async defer></script>

        {/* Meta for PWA */}
        <meta name="theme-color" content="#40BFC1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Helmet>

      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : !isAuthenticated ? (
        <BrowserRouter>
          <Routes>
            <Route path='*' element={
              <Suspense fallback={<Loading />}>
                <AuthPage onLogin={handleLogin} />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      ) : (
        <OrderProvider>
          <BrowserRouter>
            <Routes>
            <Route path='/' element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            } />
            <Route path='/profile' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <ProfilePage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/services' element={
              <Suspense fallback={<Loading />}>
                <ServicesPage />
              </Suspense>
            } />
            <Route path='/services/:serviceId' element={
              <Suspense fallback={<Loading />}>
                <ServiceDetailsPage />
              </Suspense>
            } />
            <Route path='/address-selection/:serviceId' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <AddressSelectionPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/checkout/:serviceId' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <CheckoutPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/orders/:orderId?' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <OrdersPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/track-order/:orderId' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <OrderTrackingPage />
                </Suspense>
              </ErrorBoundary>
            } />
            
            {/* Profile-related routes */}
            <Route path='/saved-services' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <SavedServicesPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/order-history' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <OrderHistoryPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/saved-locations' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <SavedAddressesPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/payment-methods' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PaymentMethodsPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/edit-profile' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <EditProfilePage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/preferences' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PreferencesPage />
                </Suspense>
              </ErrorBoundary>
            } />
            
            {/* Support-related routes */}
            <Route path='/faq' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <FAQPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/contact-support' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <ContactSupportPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/about' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <AboutPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/privacy' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PrivacyPolicyPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/terms' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <TermsPage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/terms-conditions' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <TermsPage />
                </Suspense>
              </ErrorBoundary>
            } />
            </Routes>
            <OrderBarContainer />
          </BrowserRouter>
        </OrderProvider>
      )}
    </>
  );
}

export default App
