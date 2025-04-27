import Loading from './component/block/loadingScreen'
import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashScreen from './component/block/SplashScreen'
import { OrderProvider } from './context/OrderContext'
import OrderBarContainer from './component/block/OrderBarContainer'
import { ErrorBoundary } from './utils/error_handlers/errorBoundary.jsx'


// Lazy load the pages with prefetching
const HomePage = lazy(() => import('./pages/HomePage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPages'))


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



function App() {
    const [showSplash, setShowSplash] = useState(false);
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
                            {/* Main routes */}
                            <Route path='/' element={<Suspense fallback={<Loading />}> <HomePage /> </Suspense>} />

                            <Route path='/profile' element={
                                <ErrorBoundary>
                                    <Suspense fallback={<Loading />}> <ProfilePage /></Suspense>
                                </ErrorBoundary>}
                            />
                            <Route path='/services' element={
                                <Suspense fallback={<Loading />}><ServicesPage /></Suspense>}
                            />
                            <Route path='/services/:serviceId' element={
                                <Suspense fallback={<Loading />}><ServiceDetailsPage /></Suspense>}
                            />
                            <Route path='/address-selection/:serviceId' element={
                                <ErrorBoundary>
                                    <Suspense fallback={<Loading />}><AddressSelectionPage /></Suspense>
                                </ErrorBoundary>}
                            />
                            <Route path='/checkout/:serviceId' element={
                                <ErrorBoundary>
                                    <Suspense fallback={<Loading />}><CheckoutPage /></Suspense>
                                </ErrorBoundary>}
                            />
                            <Route path='/orders/:orderId?' element={
                                <ErrorBoundary>
                                    <Suspense fallback={<Loading />}><OrdersPage /></Suspense>
                                </ErrorBoundary>}
                            />
                            <Route path='/track-order/:orderId' element={
                                <ErrorBoundary>
                                    <Suspense fallback={<Loading />}> <OrderTrackingPage /> </Suspense>
                                </ErrorBoundary>}
                            />

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
