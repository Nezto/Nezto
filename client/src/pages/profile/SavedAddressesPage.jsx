import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../component/block/NavBar';
import Footer from '../../component/block/Footer';
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Briefcase, 
  Heart, 
  Edit, 
  Trash2, 
  Plus,
  Star,
  CheckCircle2
} from 'lucide-react';

// Mock user saved addresses
const useSavedAddresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 'addr1',
      type: 'home',
      name: 'Home',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      landmark: 'Near Central Park',
      isDefault: true,
      phone: '+91 9876543210'
    },
    {
      id: 'addr2',
      type: 'work',
      name: 'Office',
      address: '456 Business Park, Tower B, 9th Floor',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      landmark: 'Opposite Grand Hotel',
      isDefault: false,
      phone: '+91 9876543210'
    },
    {
      id: 'addr3',
      type: 'other',
      name: 'Parents\' Home',
      address: '789 Lake View Road, Villa 12',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      landmark: 'Near City Hospital',
      isDefault: false,
      phone: '+91 9876543210'
    }
  ]);

  const removeAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const setDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  return {
    addresses,
    removeAddress,
    setDefaultAddress
  };
};

const SavedAddressesPage = () => {
  const navigate = useNavigate();
  const { addresses, removeAddress, setDefaultAddress } = useSavedAddresses();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleRemoveAddress = (addressId) => {
    setShowDeleteConfirm(addressId);
  };

  const confirmRemoveAddress = () => {
    if (showDeleteConfirm) {
      removeAddress(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const cancelRemoveAddress = () => {
    setShowDeleteConfirm(null);
  };

  const handleSetDefault = (addressId) => {
    setDefaultAddress(addressId);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'home':
        return 'bg-blue-50 text-blue-500';
      case 'work':
        return 'bg-purple-50 text-purple-500';
      default:
        return 'bg-pink-50 text-pink-500';
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
          <h1 className="text-xl font-semibold">Saved Addresses</h1>
          <div className="w-5"></div> {/* Empty div for flex alignment */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Your Addresses</h3>
            <p className="text-sm text-gray-500">Manage your delivery locations</p>
          </div>
          <button 
            onClick={() => navigate('/add-address')} 
            className="p-2 rounded-full bg-primary text-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${address.isDefault ? 'border-primary' : 'border-transparent'}`}
              >
                {address.isDefault && (
                  <div className="bg-primary/10 px-4 py-2 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary">Default Address</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-lg ${getAddressTypeColor(address.type)} flex items-center justify-center mr-3 mt-1`}>
                        {getAddressIcon(address.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{address.name}</h4>
                        <p className="text-sm text-gray-700 mt-1">{address.address}</p>
                        <p className="text-sm text-gray-700">{address.city}, {address.state} - {address.pincode}</p>
                        {address.landmark && (
                          <p className="text-sm text-gray-500 mt-1">Landmark: {address.landmark}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">Phone: {address.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 space-x-2">
                    <button 
                      onClick={() => navigate(`/edit-address/${address.id}`)} 
                      className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center text-sm font-medium"
                    >
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleRemoveAddress(address.id)} 
                      className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </button>
                    {!address.isDefault && (
                      <button 
                        onClick={() => handleSetDefault(address.id)} 
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
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No saved addresses</h3>
            <p className="text-gray-500 mb-6 text-center">You haven't saved any addresses yet</p>
            <button 
              onClick={() => navigate('/add-address')} 
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Address
            </button>
          </div>
        )}

        {addresses.length > 0 && (
          <div className="mt-6">
            <button 
              onClick={() => navigate('/add-address')} 
              className="w-full py-3 border border-primary text-primary rounded-lg font-medium flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" /> Add New Address
            </button>
          </div>
        )}
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Delete Address</h3>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to delete this address? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                onClick={cancelRemoveAddress}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                onClick={confirmRemoveAddress}
              >
                Delete
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

export default SavedAddressesPage;
