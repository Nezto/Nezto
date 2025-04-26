import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../component/block/NavBar';
import Footer from '../component/block/Footer';
import { 
  User, 
  ArrowLeft,
  Bell, 
  Heart,
  Clock,
  MapPin,
  CreditCard,
  HelpCircle,
  Headphones,
  Info,
  FileText,
  Settings,
  LogOut,
  ShoppingCart,
  Plus,
  Calendar,
  Package,
  Map,
  Cog,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

// Mock user context until we integrate with real auth
const useUser = () => {
  const [userData, setUserData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 8915556785',
    profilePic: null,
    memberSince: 'March 2022',
    unreadNotifications: 3,
    wishlist: [],
    savedLocations: []
  });
  
  const orders = [
    {
      id: 'ORD123456',
      status: 'active',
      serviceName: 'Laundry Service',
      orderDate: new Date().toISOString(),
      totalAmount: 499,
      pickupOtp: '1234',
      deliveryOtp: '5678',
      items: [
        { name: 'Shirt', quantity: 2 },
        { name: 'Pants', quantity: 1 }
      ]
    }
  ];
  
  // Improved logout function that will be used by the ProfilePage
  const logout = () => {
    console.log('User logged out');
    // Any additional cleanup can be added here
  };
  
  return {
    userData,
    updateUserData: () => {},
    logout,
    toggleNotifications: () => {},
    orders,
    isSignedIn: true
  };
};

const ProfilePage = () => {
  const { userData, updateUserData, logout, toggleNotifications, orders, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // This will help catch any errors during rendering
    const handleError = (error) => {
      console.error("ProfilePage Error:", error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      // Call the local logout function
      logout();
      
      // Clear the authentication token from localStorage
      localStorage.removeItem('authToken');
      
      // Reload the page to trigger the authentication flow
      // This will redirect to the login page since the auth token is now removed
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleNotificationsToggle = () => {
    toggleNotifications();
  };

  const handleViewAllOrders = () => {
    navigate('/order-history');
  };

  // If not signed in, show sign-in prompt with improved design
  if (hasError) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center p-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
          <LogOut className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Something went wrong</h2>
        <p className="text-gray-600 mb-6 text-center">There was an error loading the profile page.</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white text-center rounded-b-3xl shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            <User />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Nezto</h2>
          <p className="text-white/90">Sign in to manage your laundry services, track orders, and access personalized features.</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center mr-4">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Order History</h3>
                <p className="text-sm text-gray-500">Track all your previous orders</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center mr-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Saved Addresses</h3>
                <p className="text-sm text-gray-500">Quick checkout with saved locations</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
              <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center mr-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Exclusive Offers</h3>
                <p className="text-sm text-gray-500">Access to member-only discounts</p>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 rounded-xl font-medium flex items-center justify-center">
            Sign In <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <NavBar />

      {/* Modern Header with gradient background */}
      <div 
        className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white mt-12"
        style={{ willChange: 'transform' }}
      >
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-full bg-white/10" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
          <div className="flex space-x-2">
            <button onClick={() => navigate('/notifications')} className="p-2 rounded-full bg-white/10 relative">
              <Bell className="w-5 h-5" />
              {userData.unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {userData.unreadNotifications}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center mt-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
            {userData.profilePic ? (
              <img 
                src={userData.profilePic} 
                alt={userData.name} 
                className="w-full h-full object-cover"
                width="64"
                height="64"
                loading="lazy"
              />
            ) : (
              <User className="w-8 h-8" />
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{userData.name}</h2>
            <p className="text-sm text-white/90">{userData.email}</p>
            <p className="text-sm text-white/90">{userData.phone}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-6 border-b border-white/20">
          <button 
            className={`flex-1 py-2 flex flex-col items-center ${activeTab === 'profile' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-sm">Profile</span>
          </button>
          <button 
            className={`flex-1 py-2 flex flex-col items-center ${activeTab === 'orders' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package className="w-5 h-5 mb-1" />
            <span className="text-sm">Orders</span>
          </button>
          <button 
            className={`flex-1 py-2 flex flex-col items-center ${activeTab === 'settings' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Cog className="w-5 h-5 mb-1" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>

      {/* Profile Content Section */}
      <div className="flex-1 p-4 pb-20">
        {activeTab === 'profile' && (
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Your Account</h3>
              <p className="text-sm text-gray-500">Manage your personal preferences</p>
            </div>

            <div className="space-y-3 mb-8">
              <Link to="/saved-services" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Saved Services</h4>
                    <p className="text-sm text-gray-500">Items you've saved for later</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {userData.wishlist && userData.wishlist.length > 0 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">{userData.wishlist.length}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>

              <Link to="/order-history" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Order History</h4>
                    <p className="text-sm text-gray-500">View and manage your past orders</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {orders && orders.length > 0 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">{orders.length}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>

              <Link 
                to="/saved-locations" 
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Saved Addresses</h4>
                    <p className="text-sm text-gray-500">Manage your delivery locations</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {userData.savedLocations && userData.savedLocations.length > 0 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">{userData.savedLocations.length}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>

              <Link to="/payment-methods" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Payment Methods</h4>
                    <p className="text-sm text-gray-500">Manage your payment options</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Support & Help</h3>
              <p className="text-sm text-gray-500">Get assistance and information</p>
            </div>

            <div className="space-y-3">
              <Link to="/faq" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center mr-3">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">FAQ & Help Center</h4>
                    <p className="text-sm text-gray-500">Answers to common questions</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/contact-support" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center mr-3">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Contact Support</h4>
                    <p className="text-sm text-gray-500">Get help from our team</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/about" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">About Nezto</h4>
                    <p className="text-sm text-gray-500">Learn about our company</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/terms-conditions" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Terms & Conditions</h4>
                    <p className="text-sm text-gray-500">Our policies and agreements</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Orders</h3>
              <p className="text-sm text-gray-500">Track your current orders and view OTP codes</p>
            </div>

            <div className="space-y-4">
              {orders && orders.filter(order => order.status === 'active').length > 0 ? (
                <>
                  {orders.filter(order => order.status === 'active').map(order => (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <div>
                          <div className="inline-flex items-center px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                            <RotateCcw className="w-3 h-3 mr-1 animate-spin" />
                            <span>In Progress</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'Processing'}
                          </p>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</div>
                      </div>

                      <div className="p-4 flex">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-primary">
                          <Package className="w-6 h-6" />
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-800">{order.serviceName || 'Service'}</h4>
                          <p className="text-xs text-gray-500">Order ID: {order.id}</p>
                          <p className="text-sm text-gray-700 mt-1">
                            {order.items && order.items.length > 0
                              ? order.items.map((item, idx) => (
                                  <span key={idx}>
                                    {item.quantity || 1} x {item.name || 'Item'}
                                    {idx < order.items.length - 1 ? ', ' : ''}
                                  </span>
                                ))
                              : 'Items processing'
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex border-t border-gray-100">
                        <div className="flex-1 px-4 py-3 border-r border-gray-100 text-center">
                          <div className="text-xs text-gray-500">Pickup OTP</div>
                          <div className="text-lg font-semibold text-primary">{order.pickupOtp || '1234'}</div>
                        </div>
                        <div className="flex-1 px-4 py-3 text-center">
                          <div className="text-xs text-gray-500">Delivery OTP</div>
                          <div className="text-lg font-semibold text-primary">{order.deliveryOtp || '5678'}</div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 flex space-x-2">
                        <button
                          onClick={() => navigate(`/order-tracking/${order.id}`)}
                          className="flex-1 py-2 bg-primary/10 text-primary font-medium rounded-lg flex items-center justify-center text-sm"
                        >
                          <MapPin className="w-4 h-4 mr-1" /> Track Order
                        </button>
                        <button
                          onClick={() => navigate(`/order-details/${order.id}`)}
                          className="flex-1 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg flex items-center justify-center text-sm"
                        >
                          <Info className="w-4 h-4 mr-1" /> Details
                            </button>
                        </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No active orders</h3>
                  <p className="text-gray-500 mb-6">You don't have any active orders right now</p>
                  <Link to="/services" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium">
                    <Plus className="w-4 h-4 mr-2" /> Book a Service
                  </Link>
                </div>
              )}

              {orders && orders.length > 0 && (
                <div className="text-center mt-4">
                  <button 
                    onClick={handleViewAllOrders}
                    className="inline-flex items-center px-4 py-2 text-primary font-medium"
                  >
                    View All Orders <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">App Settings</h3>
              <p className="text-sm text-gray-500">Customize your app experience</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center mr-3">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Notifications</h4>
                    <p className="text-sm text-gray-500">Manage push notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={userData.notificationsEnabled} onChange={handleNotificationsToggle} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <Link to="/edit-profile" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Edit Profile</h4>
                    <p className="text-sm text-gray-500">Update your personal information</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/preferences" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center mr-3">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Preferences</h4>
                    <p className="text-sm text-gray-500">Customize your experience</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/privacy" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Privacy Policy</h4>
                    <p className="text-sm text-gray-500">How we handle your data</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/terms" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Terms & Conditions</h4>
                    <p className="text-sm text-gray-500">View our terms of service</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/about" className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center mr-3">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">About Nezto</h4>
                    <p className="text-sm text-gray-500">Learn more about our company</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <button 
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between w-full text-left hover:shadow-md transition-shadow" 
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Logout</h4>
                    <p className="text-sm text-gray-500">Sign out of your account</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <LogOut className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Sign Out</h3>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to sign out of your account?</p>
            <div className="flex space-x-3">
              <button 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                onClick={confirmLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;