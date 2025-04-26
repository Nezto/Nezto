import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Plus, Home, Building, Briefcase, Check, ChevronRight, ArrowLeft } from 'lucide-react';

const AddressSelectionPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const serviceData = location.state?.serviceData || {};

  // State for addresses and form
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usePickupAsDelivery, setUsePickupAsDelivery] = useState(true);

  // Form states
  const [pickupAddress, setPickupAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: '',
    addressType: 'home'
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: '',
    addressType: 'home'
  });

  // Mock fetch saved addresses - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAddresses = [
        {
          id: '1',
          name: 'John Doe',
          addressLine1: '123 Main Street',
          addressLine2: 'Apartment 4B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          phoneNumber: '9876543210',
          addressType: 'home',
          isDefault: true
        },
        {
          id: '2',
          name: 'John Doe',
          addressLine1: '456 Office Park',
          addressLine2: 'Building C, Floor 3',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400051',
          phoneNumber: '9876543210',
          addressType: 'work'
        }
      ];

      setSavedAddresses(mockAddresses);

      // If there are saved addresses, select the default one
      const defaultAddress = mockAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else if (mockAddresses.length > 0) {
        setSelectedAddressId(mockAddresses[0].id);
      } else {
        // If no addresses, show the form
        setShowAddressForm(true);
      }

      setIsLoading(false);
    }, 800);
  }, []);

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    setShowAddressForm(false);
  };

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
    setSelectedAddressId(null);
  };

  const handlePickupInputChange = (e) => {
    const { name, value } = e.target;
    setPickupAddress(prev => ({
      ...prev,
      [name]: value
    }));

    // If using pickup as delivery, update delivery address too
    if (usePickupAsDelivery) {
      setDeliveryAddress(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDeliveryInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressTypeSelect = (type, addressType) => {
    if (addressType === 'pickup') {
      setPickupAddress(prev => ({
        ...prev,
        addressType: type
      }));

      if (usePickupAsDelivery) {
        setDeliveryAddress(prev => ({
          ...prev,
          addressType: type
        }));
      }
    } else {
      setDeliveryAddress(prev => ({
        ...prev,
        addressType: type
      }));
    }
  };

  const handleUsePickupAsDeliveryChange = () => {
    setUsePickupAsDelivery(!usePickupAsDelivery);

    if (!usePickupAsDelivery) {
      // If enabling the checkbox, copy pickup address to delivery
      setDeliveryAddress({...pickupAddress});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically save the address(es) to your backend
    // For now, we'll just simulate success and continue

    // Create new address objects
    const newPickupAddress = {
      id: `new-${Date.now()}-pickup`,
      ...pickupAddress
    };

    let newDeliveryAddress = newPickupAddress;
    if (!usePickupAsDelivery) {
      newDeliveryAddress = {
        id: `new-${Date.now()}-delivery`,
        ...deliveryAddress
      };
    }

    // Add to saved addresses (in a real app, this would be after API confirmation)
    setSavedAddresses(prev => [...prev, newPickupAddress]);
    if (!usePickupAsDelivery && newDeliveryAddress.id !== newPickupAddress.id) {
      setSavedAddresses(prev => [...prev, newDeliveryAddress]);
    }

    // Proceed to next step (payment or confirmation)
    navigate(`/checkout/${serviceId}`, {
      state: {
        serviceData,
        pickupAddress: newPickupAddress,
        deliveryAddress: newDeliveryAddress
      }
    });
  };

  const handleContinue = () => {
    if (!selectedAddressId) return;

    const selectedAddress = savedAddresses.find(addr => addr.id === selectedAddressId);

    // Proceed to next step (payment or confirmation)
    navigate(`/checkout/${serviceId}`, {
      state: {
        serviceData,
        pickupAddress: selectedAddress,
        deliveryAddress: selectedAddress // Using same address for both in this case
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Address type icon mapping
  const addressTypeIcons = {
    home: <Home className="h-5 w-5" />,
    work: <Briefcase className="h-5 w-5" />,
    other: <Building className="h-5 w-5" />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Select Address</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Service summary */}
        {serviceData && Object.keys(serviceData).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
            <div className="flex items-center">
              {serviceData.image ? (
                <img
                  src={serviceData.image}
                  alt={serviceData.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
              ) : (
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="font-medium text-gray-800">{serviceData.name || 'Selected Service'}</h2>
                <p className="text-sm text-gray-500">{serviceData.description || ''}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-800">{serviceData.price || ''}</div>
                {serviceData.quantity > 1 && (
                  <div className="text-xs text-gray-500">Quantity: {serviceData.quantity}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          // Loading state
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : (
          <>
            {!showAddressForm && savedAddresses.length > 0 ? (
              // Saved addresses list
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Saved Addresses</h2>
                  <button
                    onClick={handleAddNewAddress}
                    className="flex items-center text-primary text-sm font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add New
                  </button>
                </div>

                <div className="space-y-4">
                  {savedAddresses.map(address => (
                    <div
                      key={address.id}
                      onClick={() => handleAddressSelect(address.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 ${
                          selectedAddressId === address.id
                            ? 'bg-primary/10 text-primary'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {addressTypeIcons[address.addressType]}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-800">{address.name}</span>
                              {address.isDefault && (
                                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>

                            {selectedAddressId === address.id && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>

                          <p className="text-gray-600 text-sm mt-1">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            Phone: {address.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!selectedAddressId}
                  className={`w-full mt-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                    selectedAddressId
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            ) : (
              // Address form
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  {savedAddresses.length > 0 ? 'Add New Address' : 'Add Address'}
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Pickup Address Section */}
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-md font-medium text-gray-800">Pickup Address</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={pickupAddress.name}
                          onChange={handlePickupInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={pickupAddress.addressLine1}
                          onChange={handlePickupInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="House/Flat No., Building Name, Street"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={pickupAddress.addressLine2}
                          onChange={handlePickupInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Landmark, Area"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={pickupAddress.city}
                          onChange={handlePickupInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="City"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          value={pickupAddress.state}
                          onChange={handlePickupInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="State"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          value={pickupAddress.pincode}
                          onChange={handlePickupInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Pincode"
                          required
                          pattern="[0-9]{6}"
                          maxLength="6"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={pickupAddress.phoneNumber}
                          onChange={handlePickupInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Phone Number"
                          required
                          pattern="[0-9]{10}"
                          maxLength="10"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => handleAddressTypeSelect('home', 'pickup')}
                            className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${
                              pickupAddress.addressType === 'home'
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <Home className="h-4 w-4 mr-2" />
                            Home
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddressTypeSelect('work', 'pickup')}
                            className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${
                              pickupAddress.addressType === 'work'
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <Briefcase className="h-4 w-4 mr-2" />
                            Work
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddressTypeSelect('other', 'pickup')}
                            className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${
                              pickupAddress.addressType === 'other'
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <Building className="h-4 w-4 mr-2" />
                            Other
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Use same address checkbox */}
                  <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={usePickupAsDelivery}
                        onChange={handleUsePickupAsDeliveryChange}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-gray-700">Use pickup address as delivery address</span>
                    </label>
                  </div>

                  {/* Delivery Address Section - only show if not using pickup as delivery */}
                  {!usePickupAsDelivery && (
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-md font-medium text-gray-800">Delivery Address</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={deliveryAddress.name}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                          <input
                            type="text"
                            name="addressLine1"
                            value={deliveryAddress.addressLine1}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="House/Flat No., Building Name, Street"
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                          <input
                            type="text"
                            name="addressLine2"
                            value={deliveryAddress.addressLine2}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Landmark, Area"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={deliveryAddress.city}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="City"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input
                            type="text"
                            name="state"
                            value={deliveryAddress.state}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="State"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            value={deliveryAddress.pincode}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Pincode"
                            required
                            pattern="[0-9]{6}"
                            maxLength="6"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={deliveryAddress.phoneNumber}
                            onChange={handleDeliveryInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Phone Number"
                            required
                            pattern="[0-9]{10}"
                            maxLength="10"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={() => handleAddressTypeSelect('home', 'delivery')}
                              className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${
                                deliveryAddress.addressType === 'home'
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <Home className="h-4 w-4 mr-2" />
                              Home
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddressTypeSelect('work', 'delivery')}
                              className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${
                                deliveryAddress.addressType === 'work'
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <Briefcase className="h-4 w-4 mr-2" />
                              Work
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddressTypeSelect('other', 'delivery')}
                              className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${
                                deliveryAddress.addressType === 'other'
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <Building className="h-4 w-4 mr-2" />
                              Other
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {savedAddresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary/90"
                    >
                      Save & Continue
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddressSelectionPage;
