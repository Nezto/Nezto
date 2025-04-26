import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronDown, ChevronUp, MessageCircle, Phone } from 'lucide-react';

const FAQPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFAQ = (index) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };

  const faqCategories = [
    {
      title: 'General Questions',
      faqs: [
        {
          question: 'What is Nezto?',
          answer: 'Nezto is a comprehensive service platform that connects you with local service providers for laundry, cleaning, and home services. We aim to make everyday tasks easier by providing reliable, high-quality services at your doorstep.'
        },
        {
          question: 'How do I place an order?',
          answer: 'To place an order, simply browse through our available services, select the one you need, choose your preferred time slot, provide your address details, and proceed to checkout. You can track your order status in real-time through the app.'
        },
        {
          question: 'What areas do you service?',
          answer: 'We currently operate in major metropolitan areas including Delhi NCR, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, and Ahmedabad. We\'re continuously expanding to new locations.'
        }
      ]
    },
    {
      title: 'Orders & Payments',
      faqs: [
        {
          question: 'How can I track my order?',
          answer: 'You can track your order in real-time through the "Orders" section in your profile. You\'ll receive notifications at each stage of the process, from pickup to delivery.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept credit/debit cards, UPI payments, digital wallets, and cash on delivery. All online transactions are secure and encrypted for your safety.'
        },
        {
          question: 'Can I cancel my order?',
          answer: 'Yes, you can cancel your order through the app as long as the service provider hasn\'t started processing it. Navigate to your orders, select the order you wish to cancel, and click on the "Cancel Order" button.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer refunds in case of service cancellation or if you\'re not satisfied with the quality of service. Please refer to our refund policy for more details.'
        }
      ]
    },
    {
      title: 'Services & Quality',
      faqs: [
        {
          question: 'What quality standards do you maintain?',
          answer: 'We partner only with verified and trained service providers who meet our strict quality standards. All services come with a satisfaction guarantee, and we regularly audit our partners to ensure consistent quality.'
        },
        {
          question: 'How do you handle delicate items?',
          answer: 'Our service providers are trained to handle delicate items with special care. For laundry services, we use appropriate cleaning methods based on fabric type and care instructions.'
        },
        {
          question: 'What if I\'m not satisfied with the service?',
          answer: 'Customer satisfaction is our priority. If you\'re not happy with any service, please report it within 24 hours, and we\'ll arrange for a re-service or provide a refund as appropriate.'
        }
      ]
    },
    {
      title: 'Account & Profile',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking on the "Sign Up" button and providing your name, email, phone number, and creating a password. Alternatively, you can sign up using your Google or Facebook account.'
        },
        {
          question: 'How can I update my profile information?',
          answer: 'You can update your profile information by navigating to the Profile section, clicking on "Edit Profile," and making the necessary changes to your personal details.'
        },
        {
          question: 'How do I manage my saved addresses?',
          answer: 'You can manage your saved addresses in the "Saved Addresses" section of your profile. Here, you can add new addresses, edit existing ones, or delete addresses you no longer use.'
        }
      ]
    }
  ];

  const filteredFAQs = searchQuery.trim() === '' 
    ? faqCategories 
    : faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0);

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
            <h1 className="text-xl font-semibold">FAQ & Help Center</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary bg-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Categories */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-6">
            {filteredFAQs.map((category, categoryIndex) => (
              category.faqs.length > 0 && (
                <div key={categoryIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <h2 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">
                    {category.title}
                  </h2>
                  <div className="divide-y divide-gray-100">
                    {category.faqs.map((faq, faqIndex) => {
                      const index = `${categoryIndex}-${faqIndex}`;
                      return (
                        <div key={index} className="cursor-pointer">
                          <div 
                            className="flex justify-between items-center p-4 hover:bg-gray-50"
                            onClick={() => toggleFAQ(index)}
                          >
                            <h3 className="font-medium text-gray-800 pr-4">{faq.question}</h3>
                            {expandedFAQ === index ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </div>
                          {expandedFAQ === index && (
                            <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any FAQs matching your search query.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Contact Options */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-primary">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Chat Support</h3>
                <p className="text-sm text-gray-600 mb-3">Get instant answers from our support team</p>
                <button 
                  onClick={() => navigate('/contact-support')}
                  className="text-primary font-medium text-sm flex items-center"
                >
                  Start Chat <ChevronDown className="h-4 w-4 ml-1 rotate-270" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-indigo-500">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mr-4">
                <Phone className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
                <p className="text-sm text-gray-600 mb-3">Available Mon-Sat, 9AM to 8PM</p>
                <a 
                  href="tel:+918001234567" 
                  className="text-indigo-500 font-medium text-sm flex items-center"
                >
                  +91 8001234567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
