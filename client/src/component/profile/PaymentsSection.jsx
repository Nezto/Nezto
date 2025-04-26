import React, { useState } from 'react';
import { CreditCard, Plus, Edit2, Trash2, X, ChevronsUpDown, ChevronDown, ChevronUp } from 'lucide-react';

const PaymentsSection = () => {
  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      cardNumber: '•••• •••• •••• 4242',
      cardType: 'visa',
      nameOnCard: 'Rahul Sharma',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      cardNumber: '•••• •••• •••• 5678',
      cardType: 'mastercard',
      nameOnCard: 'Rahul Sharma',
      expiryDate: '08/26',
      isDefault: false,
    }
  ]);

  // State for form
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formExpanded, setFormExpanded] = useState(false);
  const [currentCard, setCurrentCard] = useState({
    id: null,
    cardNumber: '',
    cardType: '',
    nameOnCard: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false,
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setIsEditing(false);
      setCurrentCard({
        id: null,
        cardNumber: '',
        cardType: '',
        nameOnCard: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        isDefault: false,
      });
      setErrors({});
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCurrentCard({
        ...currentCard,
        [name]: formatted.substring(0, 19),
        cardType: detectCardType(value),
      });
    } else {
      setCurrentCard({
        ...currentCard,
        [name]: value,
      });
    }
    
    // Clear error for this field if exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setCurrentCard({
      ...currentCard,
      isDefault: e.target.checked,
    });
  };

  // Detect card type based on first digit
  const detectCardType = (number) => {
    const firstDigit = number.replace(/\D/g, '').substring(0, 1);
    
    if (firstDigit === '4') return 'visa';
    if (['5', '2'].includes(firstDigit)) return 'mastercard';
    if (firstDigit === '3') return 'amex';
    if (firstDigit === '6') return 'discover';
    
    return '';
  };

  // Get card logo based on type
  const getCardLogo = (type) => {
    // In a real app, you'd use actual images
    switch (type) {
      case 'visa':
        return <span className="font-bold text-blue-700">VISA</span>;
      case 'mastercard':
        return <span className="font-bold text-orange-600">MC</span>;
      case 'amex':
        return <span className="font-bold text-blue-500">AMEX</span>;
      case 'discover':
        return <span className="font-bold text-orange-500">DISC</span>;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!currentCard.cardNumber || currentCard.cardNumber.replace(/\D/g, '').length < 15) {
      newErrors.cardNumber = 'Enter a valid card number';
    }
    
    if (!currentCard.nameOnCard) {
      newErrors.nameOnCard = 'Name on card is required';
    }
    
    if (!currentCard.expiryMonth) {
      newErrors.expiryMonth = 'Month is required';
    }
    
    if (!currentCard.expiryYear) {
      newErrors.expiryYear = 'Year is required';
    }
    
    if (!currentCard.cvv || currentCard.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save payment method
  const savePaymentMethod = () => {
    if (!validateForm()) return;
    
    // Format card for display
    const lastFour = currentCard.cardNumber.replace(/\D/g, '').slice(-4);
    const displayCard = {
      id: currentCard.id || Date.now(),
      cardNumber: `•••• •••• •••• ${lastFour}`,
      cardType: currentCard.cardType,
      nameOnCard: currentCard.nameOnCard,
      expiryDate: `${currentCard.expiryMonth}/${currentCard.expiryYear.slice(-2)}`,
      isDefault: currentCard.isDefault,
    };
    
    if (isEditing) {
      // Update existing card
      setPaymentMethods(paymentMethods.map(card =>
        card.id === currentCard.id ? displayCard :
        // If this card is set as default, remove default from others
        currentCard.isDefault && card.isDefault ? { ...card, isDefault: false } : card
      ));
    } else {
      // Add new card
      if (displayCard.isDefault) {
        setPaymentMethods(paymentMethods.map(card => ({ ...card, isDefault: false })).concat(displayCard));
      } else {
        // If first card, make it default
        if (paymentMethods.length === 0) {
          displayCard.isDefault = true;
        }
        setPaymentMethods([...paymentMethods, displayCard]);
      }
    }
    
    // Reset and hide form
    toggleForm();
  };

  // Edit payment method
  const editPaymentMethod = (card) => {
    // Convert stored format to editable format
    const [month, year] = card.expiryDate.split('/');
    
    setCurrentCard({
      id: card.id,
      cardNumber: card.cardNumber, // We'd actually need to retrieve the full number from an API in real app
      cardType: card.cardType,
      nameOnCard: card.nameOnCard,
      expiryMonth: month,
      expiryYear: `20${year}`,
      cvv: '',
      isDefault: card.isDefault,
    });
    
    setIsEditing(true);
    setShowForm(true);
    setFormExpanded(true);
  };

  // Delete payment method
  const deletePaymentMethod = (id) => {
    // Check if deleting default card
    const cardToDelete = paymentMethods.find(card => card.id === id);
    let newCards = paymentMethods.filter(card => card.id !== id);
    
    // If deleting default card and other cards exist, make another one default
    if (cardToDelete.isDefault && newCards.length > 0) {
      newCards[0].isDefault = true;
    }
    
    setPaymentMethods(newCards);
  };

  // Set default payment method
  const setDefaultPaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  // Generate month options
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return (
      <option key={month} value={month.toString().padStart(2, '0')}>
        {month.toString().padStart(2, '0')}
      </option>
    );
  });

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear + i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Payment Methods</h2>
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
              Add Payment Method
            </>
          )}
        </button>
      </div>
      
      {/* Form Toggle for Mobile */}
      {showForm && (
        <div className="p-4 bg-gray-50 border-b border-gray-100 lg:hidden">
          <button
            onClick={() => setFormExpanded(!formExpanded)}
            className="w-full flex justify-between items-center text-gray-700 font-medium"
          >
            {isEditing ? 'Edit Payment Method' : 'Add Payment Method'}
            {formExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      )}
      
      {/* Payment Method Form */}
      {showForm && (formExpanded || window.innerWidth >= 1024) && (
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={currentCard.cardNumber}
                  onChange={handleInputChange}
                  maxLength="19"
                  className={`w-full px-3 py-2 pl-10 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
                />
                <div className="absolute left-3 top-2.5">
                  {getCardLogo(currentCard.cardType)}
                </div>
              </div>
              {errors.cardNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                name="nameOnCard"
                placeholder="Name as it appears on your card"
                value={currentCard.nameOnCard}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.nameOnCard ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.nameOnCard && (
                <p className="mt-1 text-xs text-red-500">{errors.nameOnCard}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <select
                    name="expiryMonth"
                    value={currentCard.expiryMonth}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.expiryMonth ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
                  >
                    <option value="">Month</option>
                    {monthOptions}
                  </select>
                  {errors.expiryMonth && (
                    <p className="mt-1 text-xs text-red-500">{errors.expiryMonth}</p>
                  )}
                </div>
                <div>
                  <select
                    name="expiryYear"
                    value={currentCard.expiryYear}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.expiryYear ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
                  >
                    <option value="">Year</option>
                    {yearOptions}
                  </select>
                  {errors.expiryYear && (
                    <p className="mt-1 text-xs text-red-500">{errors.expiryYear}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                placeholder="123"
                maxLength="4"
                value={currentCard.cvv}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-primary/50 focus:border-primary`}
              />
              {errors.cvv && (
                <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={currentCard.isDefault}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Make this my default payment method</span>
              </label>
            </div>
            
            <div className="sm:col-span-2 flex justify-end space-x-3">
              <button
                onClick={toggleForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePaymentMethod}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                {isEditing ? 'Update Payment Method' : 'Save Payment Method'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment Methods List */}
      <div className="divide-y divide-gray-100">
        {paymentMethods.length === 0 ? (
          <div className="py-16 text-center">
            <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No payment methods</h3>
            <p className="text-gray-500">
              Add a payment method for faster checkout
            </p>
            <button 
              onClick={toggleForm}
              className="mt-4 px-4 py-2 bg-primary text-white font-medium rounded-lg flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </button>
          </div>
        ) : (
          paymentMethods.map(card => (
            <div key={card.id} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                {/* Card Icon and Type */}
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className={`p-2 rounded-full ${card.isDefault ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                    {getCardLogo(card.cardType)}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{card.cardNumber}</span>
                      {card.isDefault && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Expires {card.expiryDate}</p>
                  </div>
                </div>
                
                {/* Name on Card */}
                <div className="sm:ml-12 text-sm text-gray-600 mt-2 sm:mt-0 sm:flex-grow">
                  <p>{card.nameOnCard}</p>
                </div>
                
                {/* Actions */}
                <div className="flex mt-4 sm:mt-0 space-x-2">
                  {!card.isDefault && (
                    <button
                      onClick={() => setDefaultPaymentMethod(card.id)}
                      className="p-1.5 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => editPaymentMethod(card)}
                    className="p-1.5 text-primary border border-primary/30 rounded-md hover:bg-primary/5"
                    title="Edit Payment Method"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deletePaymentMethod(card.id)}
                    className="p-1.5 text-red-500 border border-red-200 rounded-md hover:bg-red-50"
                    title="Delete Payment Method"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentsSection; 