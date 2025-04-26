import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Package, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationScreen = ({ orderDetails, onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { 
      icon: <CheckCircle className="h-16 w-16 text-primary" />, 
      title: "Order Confirmed!", 
      description: "Your order has been successfully placed." 
    },
    { 
      icon: <Package className="h-16 w-16 text-primary" />, 
      title: "Preparing Your Order", 
      description: "We're getting everything ready." 
    },
    { 
      icon: <Truck className="h-16 w-16 text-primary" />, 
      title: "Rider On The Way", 
      description: "Our pickup executive is on the way to collect your items." 
    },
    { 
      icon: <MapPin className="h-16 w-16 text-primary" />, 
      title: "Arriving Soon", 
      description: "The rider will arrive at your location shortly." 
    }
  ];

  useEffect(() => {
    // Progress through animation steps
    const timer = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(timer);
        // After the last step, wait a moment and then redirect
        setTimeout(() => {
          if (onComplete) {
            onComplete(orderDetails);
          }
        }, 1500);
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [currentStep, steps.length, orderDetails, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md w-full mx-auto text-center">
        <motion.div
          key={currentStep}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="mb-6"
        >
          {steps[currentStep].icon}
        </motion.div>
        
        <motion.h2 
          key={`title-${currentStep}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          {steps[currentStep].title}
        </motion.h2>
        
        <motion.p
          key={`desc-${currentStep}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mb-8"
        >
          {steps[currentStep].description}
        </motion.p>
        
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          {steps.map((_, index) => (
            <motion.div 
              key={index}
              className={`h-2 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}`}
              initial={{ width: "20px" }}
              animate={{ 
                width: index === currentStep ? "40px" : "20px",
                backgroundColor: index <= currentStep ? "#31c0ce" : "#e5e7eb"
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        
        {/* Order details summary */}
        {orderDetails && (
          <motion.div 
            className="bg-gray-50 rounded-lg p-4 text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-gray-500 mb-1">Order #{orderDetails.orderId}</p>
            <p className="font-medium text-gray-800">{orderDetails.serviceName}</p>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-600">Pickup time:</span>
              <span className="text-gray-800">{orderDetails.pickupTime}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderConfirmationScreen;
