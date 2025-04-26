import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, Mail, MessageCircle, Clock, Check } from 'lucide-react';

const ContactSupportPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('message');

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Contact Support</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Contact Options Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'message'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('message')}
            >
              <div className="flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>Message Us</span>
              </div>
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'call'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('call')}
            >
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>Call Us</span>
              </div>
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'email'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('email')}
            >
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>Email</span>
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'message' && (
              <>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Order Number (if applicable)
                        </label>
                        <input
                          type="text"
                          name="orderNumber"
                          value={formData.orderNumber}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="order-issue">Order Issue</option>
                        <option value="payment-problem">Payment Problem</option>
                        <option value="service-quality">Service Quality</option>
                        <option value="account-issue">Account Issue</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 rounded-lg flex items-center justify-center font-medium text-white ${
                        isSubmitting ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'
                      } transition-colors shadow-md`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          message: '',
                          orderNumber: ''
                        });
                      }}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'call' && (
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Customer Support</h3>
                    <p className="text-gray-600 mb-2">For general inquiries and support</p>
                    <a
                      href="tel:+918001234567"
                      className="text-primary font-medium flex items-center"
                    >
                      +91 8001234567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Order Support</h3>
                    <p className="text-gray-600 mb-2">For issues with your orders</p>
                    <a
                      href="tel:+918002345678"
                      className="text-primary font-medium flex items-center"
                    >
                      +91 8002345678
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Support Hours</h3>
                    <p className="text-gray-600">Monday to Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">General Support</h3>
                    <p className="text-gray-600 mb-2">For general inquiries and assistance</p>
                    <a
                      href="mailto:support@nezto.com"
                      className="text-primary font-medium flex items-center"
                    >
                      support@nezto.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Order Support</h3>
                    <p className="text-gray-600 mb-2">For issues with your orders</p>
                    <a
                      href="mailto:orders@nezto.com"
                      className="text-primary font-medium flex items-center"
                    >
                      orders@nezto.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Feedback & Suggestions</h3>
                    <p className="text-gray-600 mb-2">Share your thoughts with us</p>
                    <a
                      href="mailto:feedback@nezto.com"
                      className="text-primary font-medium flex items-center"
                    >
                      feedback@nezto.com
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Help Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
            Quick Help
          </h2>
          <div className="p-4 space-y-3">
            <button 
              onClick={() => navigate('/faq')}
              className="w-full text-left p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">Frequently Asked Questions</span>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </button>
            
            <button 
              onClick={() => navigate('/terms')}
              className="w-full text-left p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">Terms & Conditions</span>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </button>
            
            <button 
              onClick={() => navigate('/privacy')}
              className="w-full text-left p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">Privacy Policy</span>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportPage;
