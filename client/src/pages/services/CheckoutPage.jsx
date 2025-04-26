import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Truck, Calendar, Check } from 'lucide-react';
import OrderConfirmationScreen from '../../component/block/OrderConfirmationScreen';
import { useOrder } from '../../context/OrderContext';

const CheckoutPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceData, pickupAddress, deliveryAddress } = location.state || {};
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { createOrder } = useOrder();

  const handleBack = () => {
    navigate(-1);
  };

  const handlePayment = () => {
    // Create order details
    const newOrderDetails = {
      serviceName: serviceData?.name || 'Laundry Service',
      serviceId: serviceId,
      quantity: serviceData?.quantity || 1,
      price: serviceData?.price || '₹0',
      pickupAddress: pickupAddress,
      deliveryAddress: deliveryAddress || pickupAddress,
      status: 'confirmed',
      statusDescription: 'Your order has been confirmed. Pickup scheduled soon.',
      pickupTime: 'Today, 4:00 PM - 6:00 PM',
      estimatedCompletion: 'Tomorrow, 6:00 PM',
      riderPhone: '9876543210',
      supportPhone: '1800123456',
      paymentMethod: 'card',
      totalAmount: serviceData ?
        (parseInt(serviceData.price.replace(/[^0-9]/g, '')) * (serviceData.quantity || 1)) + 49 + 30 - 50 :
        29
    };

    setOrderDetails(newOrderDetails);
    setShowConfirmation(true);
  };

  const handleConfirmationComplete = (details) => {
    // Create the order in context
    createOrder(details);
    // Navigate to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfirmation && (
        <OrderConfirmationScreen
          orderDetails={orderDetails}
          onComplete={handleConfirmationComplete}
        />
      )}
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
            <h1 className="text-xl font-semibold text-gray-800">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>

          {serviceData && (
            <div className="flex items-start mb-4 pb-4 border-b border-gray-100">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                {serviceData.image ? (
                  <img
                    src={serviceData.image}
                    alt={serviceData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{serviceData.name || 'Selected Service'}</h3>
                <p className="text-sm text-gray-500 mt-1">{serviceData.description || ''}</p>
                {serviceData.quantity > 1 && (
                  <p className="text-xs text-primary font-medium mt-1">Quantity: {serviceData.quantity}</p>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-800">{serviceData.price || ''}</div>
                {serviceData.oldPrice && (
                  <div className="text-sm text-gray-400 line-through">{serviceData.oldPrice}</div>
                )}
              </div>
            </div>
          )}

          {/* Pickup & Delivery Details */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Pickup & Delivery</h3>

            {pickupAddress && (
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <Truck className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Pickup Address</span>
                </div>
                <div className="ml-7 text-sm text-gray-600">
                  <p>{pickupAddress.name}</p>
                  <p>{pickupAddress.addressLine1}{pickupAddress.addressLine2 ? `, ${pickupAddress.addressLine2}` : ''}</p>
                  <p>{pickupAddress.city}, {pickupAddress.state} - {pickupAddress.pincode}</p>
                </div>
              </div>
            )}

            {deliveryAddress && deliveryAddress.id !== pickupAddress?.id && (
              <div>
                <div className="flex items-center mb-1">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <Truck className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Delivery Address</span>
                </div>
                <div className="ml-7 text-sm text-gray-600">
                  <p>{deliveryAddress.name}</p>
                  <p>{deliveryAddress.addressLine1}{deliveryAddress.addressLine2 ? `, ${deliveryAddress.addressLine2}` : ''}</p>
                  <p>{deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}</p>
                </div>
              </div>
            )}

            {(!deliveryAddress || deliveryAddress.id === pickupAddress?.id) && (
              <div className="ml-7 text-sm text-gray-600 italic">
                <p>Delivery to same address as pickup</p>
              </div>
            )}
          </div>

          {/* Schedule */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Schedule</h3>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-700">Pickup: Tomorrow, 10:00 AM - 12:00 PM</p>
                <p className="text-sm text-gray-600">Delivery: Day after tomorrow, 4:00 PM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Price Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Service Charge
                  {serviceData?.quantity > 1 && ` (${serviceData.quantity} items)`}
                </span>
                <span className="text-gray-800">
                  {serviceData ? (
                    serviceData.price.includes('/')
                      ? serviceData.price
                      : `₹${parseInt(serviceData.price.replace(/[^0-9]/g, '')) * (serviceData.quantity || 1)}`
                  ) : '₹0'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-800">₹49</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxes</span>
                <span className="text-gray-800">₹30</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹50</span>
              </div>
              <div className="border-t border-gray-100 pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-800">Total Amount</span>
                  <span className="text-primary text-lg">
                    {serviceData ? (
                      `₹${(parseInt(serviceData.price.replace(/[^0-9]/g, '')) * (serviceData.quantity || 1)) + 49 + 30 - 50}`
                    ) : '₹29'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h2>

          <div className="space-y-3">
            <div className="border border-primary rounded-lg p-3 bg-primary/5">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  defaultChecked
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-800">Credit/Debit Card</span>
                </div>
                <Check className="ml-auto h-5 w-5 text-primary" />
              </label>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 hover:border-gray-300">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <Wallet className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-800">UPI</span>
                </div>
              </label>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 hover:border-gray-300">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <Wallet className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-800">Cash on Delivery</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePayment}
          className="w-full py-4 bg-primary text-white rounded-lg font-medium text-lg hover:bg-primary/90 transition-colors shadow-md"
        >
          Place Order
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          By placing your order, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
