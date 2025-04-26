import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../component/block/NavBar';
import Footer from '../../component/block/Footer';
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Smartphone, 
  Plus, 
  Trash2, 
  CheckCircle2,
  Edit,
  Star,
  Shield
} from 'lucide-react';

// Mock payment methods data
const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'pm1',
      type: 'card',
      name: 'HDFC Credit Card',
      cardNumber: '•••• •••• •••• 4567',
      expiryDate: '05/26',
      cardType: 'visa',
      isDefault: true
    },
    {
      id: 'pm2',
      type: 'card',
      name: 'ICICI Debit Card',
      cardNumber: '•••• •••• •••• 8901',
      expiryDate: '12/25',
      cardType: 'mastercard',
      isDefault: false
    },
    {
      id: 'pm3',
      type: 'upi',
      name: 'Google Pay',
      upiId: 'user@okicici',
      isDefault: false
    },
    {
      id: 'pm4',
      type: 'wallet',
      name: 'Paytm Wallet',
      walletId: 'user@paytm',
      isDefault: false
    }
  ]);

  const removePaymentMethod = (paymentMethodId) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
  };

  const setDefaultPaymentMethod = (paymentMethodId) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentMethodId
    })));
  };

  return {
    paymentMethods,
    removePaymentMethod,
    setDefaultPaymentMethod
  };
};

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const { paymentMethods, removePaymentMethod, setDefaultPaymentMethod } = usePaymentMethods();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleRemovePaymentMethod = (paymentMethodId) => {
    setShowDeleteConfirm(paymentMethodId);
  };

  const confirmRemovePaymentMethod = () => {
    if (showDeleteConfirm) {
      removePaymentMethod(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const cancelRemovePaymentMethod = () => {
    setShowDeleteConfirm(null);
  };

  const handleSetDefault = (paymentMethodId) => {
    setDefaultPaymentMethod(paymentMethodId);
  };

  const getPaymentMethodIcon = (type) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'upi':
        return <Smartphone className="w-5 h-5" />;
      case 'wallet':
        return <Wallet className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getPaymentMethodColor = (type) => {
    switch (type) {
      case 'card':
        return 'bg-blue-50 text-blue-500';
      case 'upi':
        return 'bg-green-50 text-green-500';
      case 'wallet':
        return 'bg-purple-50 text-purple-500';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  const getCardTypeIcon = (cardType) => {
    if (cardType === 'visa') {
      return (
        <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold">
          VISA
        </div>
      );
    } else if (cardType === 'mastercard') {
      return (
        <div className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-xs font-bold">
          MC
        </div>
      );
    } else {
      return (
        <div className="px-2 py-1 bg-gray-600 text-white rounded text-xs font-bold">
          CARD
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white mt-12">
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-full bg-white/10" onClick={() => navigate('/profile')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Payment Methods</h1>
          <div className="w-5"></div> {/* Empty div for flex alignment */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Your Payment Methods</h3>
            <p className="text-sm text-gray-500">Manage your payment options</p>
          </div>
          <button 
            onClick={() => navigate('/add-payment-method')} 
            className="p-2 rounded-full bg-primary text-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center mr-3">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800">Secure Payments</h4>
            <p className="text-sm text-gray-500">Your payment information is encrypted and secure</p>
          </div>
        </div>

        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map((paymentMethod) => (
              <div 
                key={paymentMethod.id} 
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${paymentMethod.isDefault ? 'border-primary' : 'border-transparent'}`}
              >
                {paymentMethod.isDefault && (
                  <div className="bg-primary/10 px-4 py-2 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary">Default Payment Method</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-lg ${getPaymentMethodColor(paymentMethod.type)} flex items-center justify-center mr-3 mt-1`}>
                        {getPaymentMethodIcon(paymentMethod.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{paymentMethod.name}</h4>
                        {paymentMethod.type === 'card' && (
                          <div className="flex items-center mt-1">
                            <p className="text-sm text-gray-700 mr-2">{paymentMethod.cardNumber}</p>
                            {getCardTypeIcon(paymentMethod.cardType)}
                          </div>
                        )}
                        {paymentMethod.type === 'card' && (
                          <p className="text-sm text-gray-500 mt-1">Expires: {paymentMethod.expiryDate}</p>
                        )}
                        {paymentMethod.type === 'upi' && (
                          <p className="text-sm text-gray-700 mt-1">UPI ID: {paymentMethod.upiId}</p>
                        )}
                        {paymentMethod.type === 'wallet' && (
                          <p className="text-sm text-gray-700 mt-1">Wallet ID: {paymentMethod.walletId}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 space-x-2">
                    {paymentMethod.type === 'card' && (
                      <button 
                        onClick={() => navigate(`/edit-payment-method/${paymentMethod.id}`)} 
                        className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center text-sm font-medium"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </button>
                    )}
                    <button 
                      onClick={() => handleRemovePaymentMethod(paymentMethod.id)} 
                      className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </button>
                    {!paymentMethod.isDefault && (
                      <button 
                        onClick={() => handleSetDefault(paymentMethod.id)} 
                        className="flex-1 py-2 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-medium"
                      >
                        <Star className="w-4 h-4 mr-1" /> Set Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-6 mt-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No payment methods</h3>
            <p className="text-gray-500 mb-6 text-center">You haven't added any payment methods yet</p>
            <button 
              onClick={() => navigate('/add-payment-method')} 
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Payment Method
            </button>
          </div>
        )}

        {paymentMethods.length > 0 && (
          <div className="mt-6">
            <button 
              onClick={() => navigate('/add-payment-method')} 
              className="w-full py-3 border border-primary text-primary rounded-lg font-medium flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" /> Add New Payment Method
            </button>
          </div>
        )}

        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Payment Options</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">Credit & Debit Cards</span>
            </div>
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">UPI Payment</span>
            </div>
            <div className="flex items-center">
              <Wallet className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">Digital Wallets</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <Trash2 className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Remove Payment Method</h3>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to remove this payment method? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                onClick={cancelRemovePaymentMethod}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                onClick={confirmRemovePaymentMethod}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentMethodsPage;
