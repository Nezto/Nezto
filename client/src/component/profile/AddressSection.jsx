import React, { useState } from 'react';
import { Home, MapPin, Plus, Edit2, Trash2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const AddressSection = () => {
  // State for address list
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      addressLine1: '123 Park Avenue',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '9876543210',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Office',
      addressLine1: 'Tech Park Building',
      addressLine2: 'Floor 5, Cubicle 12',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400072',
      phone: '9876543211',
      isDefault: false,
    }
  ]);

  // State for form visibility and editing
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    id: null,
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false,
  });

  // Validation state
  const [errors, setErrors] = useState({});
  // Form toggle state for mobile
  const [formExpanded, setFormExpanded] = useState(false);

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setIsEditing(false);
      setCurrentAddress({
        id: null,
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        isDefault: false,
      });
    }
    setErrors({});
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({
      ...currentAddress,
      [name]: value,
    });
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setCurrentAddress({
      ...currentAddress,
      isDefault: e.target.checked,
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!currentAddress.name) newErrors.name = 'Name is required';
    if (!currentAddress.addressLine1) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!currentAddress.city) newErrors.city = 'City is required';
    if (!currentAddress.state) newErrors.state = 'State is required';
    if (!currentAddress.pincode) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(currentAddress.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    if (!currentAddress.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(currentAddress.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save address
  const saveAddress = () => {
    if (!validateForm()) return;
    
    if (isEditing) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === currentAddress.id ? currentAddress : 
        // If this address is set as default, remove default from others
        currentAddress.isDefault && addr.isDefault ? { ...addr, isDefault: false } : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...currentAddress,
        id: Date.now(),
      };
      
      // If this is the first address or it's set as default, handle other addresses
      if (newAddress.isDefault) {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })).concat(newAddress));
      } else {
        // If this is the first address, make it default
        if (addresses.length === 0) {
          newAddress.isDefault = true;
        }
        setAddresses([...addresses, newAddress]);
      }
    }
    
    // Reset and hide form
    toggleForm();
  };

  // Edit address
  const editAddress = (address) => {
    setCurrentAddress(address);
    setIsEditing(true);
    setShowForm(true);
    setFormExpanded(true);
  };

  // Delete address
  const deleteAddress = (id) => {
    // Check if deleting default address
    const addressToDelete = addresses.find(addr => addr.id === id);
    let newAddresses = addresses.filter(addr => addr.id !== id);
    
    // If deleting default address and other addresses exist, make another one default
    if (addressToDelete.isDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true;
    }
    
    setAddresses(newAddresses);
  };

  // Set default address
  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Saved Addresses</h2>
        <button 
          onClick={toggleForm}
          className="flex items-center text-sm font-medium text-primary hover:text-primary-dark"
        >
          {showForm ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Add New Address
            </>
          )}
        </button>
      </div>
      
      {/* Add/Edit Address Form - Mobile Toggle Button */}
      {showForm && (
        <div className="p-4 bg-gray-50 border-b border-gray-100 lg:hidden">
          <button
            onClick={() => setFormExpanded(!formExpanded)}
            className="w-full flex justify-between items-center text-gray-700 font-medium"
          >
            {isEditing ? 'Edit Address' : 'Add New Address'}
            {formExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      )}
      
      {/* Add/Edit Address Form */}
      {showForm && (formExpanded || window.innerWidth >= 1024) && (
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Home, Office, etc."
                value={currentAddress.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="10-digit mobile number"
                value={currentAddress.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                placeholder="House No., Building Name, Street"
                value={currentAddress.addressLine1}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.addressLine1 && (
                <p className="mt-1 text-xs text-red-500">{errors.addressLine1}</p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                name="addressLine2"
                placeholder="Apartment, Suite, Floor, etc."
                value={currentAddress.addressLine2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={currentAddress.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">{errors.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={currentAddress.state}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">{errors.state}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                placeholder="6-digit pincode"
                value={currentAddress.pincode}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.pincode && (
                <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={currentAddress.isDefault}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Make this my default address</span>
              </label>
            </div>
          </div>
          
          <div className="mt-5 flex justify-end space-x-3">
            <button
              onClick={toggleForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={saveAddress}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {isEditing ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </div>
      )}
      
      {/* Address List */}
      <div className="divide-y divide-gray-100">
        {addresses.length === 0 ? (
          <div className="p-5 text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p>You don't have any saved addresses yet.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center">
              {/* Address Type and Contact */}
              <div className="flex items-start sm:w-1/3">
                <div className="mt-1 flex-shrink-0">
                  {address.isDefault ? (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Home className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <MapPin className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{address.name}</span>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>
              </div>
              
              {/* Address Details */}
              <div className="sm:ml-12 mt-3 sm:mt-0 sm:flex-grow text-sm text-gray-600">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{`${address.city}, ${address.state}, ${address.pincode}`}</p>
              </div>
              
              {/* Actions */}
              <div className="flex mt-4 sm:mt-0 space-x-2">
                {!address.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(address.id)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => editAddress(address)}
                  className="p-1.5 text-primary border border-primary/30 rounded-md hover:bg-primary/5"
                  title="Edit Address"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="p-1.5 text-red-500 border border-red-200 rounded-md hover:bg-red-50"
                  title="Delete Address"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressSection; 