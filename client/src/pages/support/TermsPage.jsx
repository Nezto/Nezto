import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, ChevronDown, ChevronUp, Search } from 'lucide-react';

const TermsPage = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const toggleSection = (index) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };

  const termsSections = [
    {
      title: 'Introduction',
      content: `
        <p>Last updated: April 21, 2025</p>
        <p>Welcome to Nezto. These Terms and Conditions ("Terms") govern your use of the Nezto mobile application and website (collectively, the "Platform") operated by Nezto Technologies Pvt. Ltd. ("we," "our," or "us").</p>
        <p>By accessing or using our Platform, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Platform.</p>
      `
    },
    {
      title: 'Definitions',
      content: `
        <p>For the purpose of these Terms:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>"User"</strong> refers to any individual who accesses or uses our Platform.</li>
          <li><strong>"Service Provider"</strong> refers to third-party professionals or businesses that offer services through our Platform.</li>
          <li><strong>"Services"</strong> refers to the various services offered through our Platform, including but not limited to laundry, cleaning, and home services.</li>
          <li><strong>"Content"</strong> refers to text, images, videos, audio, graphics, and other material that may be available on our Platform.</li>
        </ul>
      `
    },
    {
      title: 'Account Registration',
      content: `
        <p>To use certain features of our Platform, you may need to register for an account. When you register, you agree to:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Provide accurate, current, and complete information.</li>
          <li>Maintain and promptly update your account information.</li>
          <li>Keep your account credentials confidential and secure.</li>
          <li>Be responsible for all activities that occur under your account.</li>
          <li>Notify us immediately of any unauthorized use of your account or any other breach of security.</li>
        </ul>
        <p>We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, false, or outdated.</p>
      `
    },
    {
      title: 'Platform Use and Restrictions',
      content: `
        <p>You may use our Platform only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Use the Platform in any way that violates applicable laws or regulations.</li>
          <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.</li>
          <li>Interfere with or disrupt the operation of the Platform or servers or networks connected to the Platform.</li>
          <li>Attempt to gain unauthorized access to any portion of the Platform or any other systems or networks connected to the Platform.</li>
          <li>Use any robot, spider, or other automatic device to access the Platform for any purpose without our express written permission.</li>
          <li>Introduce viruses, trojans, worms, logic bombs, or other malicious or technologically harmful material.</li>
          <li>Collect or harvest any information from the Platform, including personal information, without our consent.</li>
        </ul>
      `
    },
    {
      title: 'Service Booking and Delivery',
      content: `
        <p>Our Platform facilitates the booking of services provided by third-party Service Providers. When you book a service:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>You agree to provide accurate information regarding your service requirements.</li>
          <li>You understand that the Service Provider, not Nezto, is responsible for the actual provision of services.</li>
          <li>You agree to be present at the scheduled time and location for service delivery or make appropriate arrangements for access.</li>
          <li>You acknowledge that service availability may vary based on your location and the Service Provider's schedule.</li>
        </ul>
        <p>We strive to ensure that all services are delivered as scheduled. However, there may be circumstances beyond our control that result in delays or cancellations. We will make reasonable efforts to notify you of any changes to your scheduled service.</p>
      `
    },
    {
      title: 'Payments and Fees',
      content: `
        <p>By using our Platform, you agree to pay all fees associated with the services you book. Payment terms:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>All prices listed on our Platform are in Indian Rupees (INR) and include applicable taxes unless otherwise stated.</li>
          <li>We accept various payment methods, including credit/debit cards, UPI, digital wallets, and cash on delivery (for select services).</li>
          <li>For online payments, you authorize us to charge the payment method you provide for the full amount of your order plus any applicable taxes and fees.</li>
          <li>If your payment cannot be processed, we reserve the right to cancel your order or suspend service delivery until payment is received.</li>
          <li>Certain promotions and discounts may be subject to additional terms and conditions.</li>
        </ul>
      `
    },
    {
      title: 'Cancellations and Refunds',
      content: `
        <p>Our cancellation and refund policy:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>You may cancel a service booking up to 2 hours before the scheduled service time without incurring a cancellation fee.</li>
          <li>Cancellations made less than 2 hours before the scheduled service time may incur a cancellation fee of up to 50% of the service cost.</li>
          <li>If you are not present at the scheduled time and location, and have not made arrangements for access, you may be charged a no-show fee.</li>
          <li>If a Service Provider cancels or fails to deliver a service, you will receive a full refund or the option to reschedule.</li>
          <li>If you are dissatisfied with a service, you must report it within 24 hours of service completion to be eligible for a refund or re-service.</li>
          <li>Refunds will be processed to the original payment method within 5-7 business days.</li>
        </ul>
      `
    },
    {
      title: 'Intellectual Property',
      content: `
        <p>The Platform and its original content, features, and functionality are owned by Nezto and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
        <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Platform, except as follows:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
          <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
          <li>You may print or download one copy of a reasonable number of pages of the Platform for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
        </ul>
      `
    },
    {
      title: 'Limitation of Liability',
      content: `
        <p>To the fullest extent permitted by applicable law, Nezto and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Your access to or use of or inability to access or use the Platform.</li>
          <li>Any conduct or content of any third party on the Platform, including without limitation, any defamatory, offensive, or illegal conduct of other users or third parties.</li>
          <li>Any content obtained from the Platform.</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
        </ul>
        <p>Our total liability to you for all claims arising from or relating to these Terms or your use of the Platform shall not exceed the amount you have paid to us for services through the Platform in the six (6) months immediately preceding the date on which the claim arose.</p>
      `
    },
    {
      title: 'Indemnification',
      content: `
        <p>You agree to defend, indemnify, and hold harmless Nezto, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Your violation of these Terms.</li>
          <li>Your use of the Platform, including, but not limited to, your User Contributions, any use of the Platform's content, services, and products other than as expressly authorized in these Terms.</li>
          <li>Your violation of any third party's rights, including but not limited to intellectual property rights, privacy rights, or publicity rights.</li>
        </ul>
      `
    },
    {
      title: 'Modifications to Terms',
      content: `
        <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <p>By continuing to access or use our Platform after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Platform.</p>
      `
    },
    {
      title: 'Governing Law',
      content: `
        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
        <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
      `
    },
    {
      title: 'Contact Us',
      content: `
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>Email: legal@nezto.com</p>
        <p>Phone: +91 8001234567</p>
        <p>Address: Nezto Technologies Pvt. Ltd., 123 Tech Park, Koramangala, Bangalore - 560034, India</p>
      `
    }
  ];

  const filteredSections = searchQuery.trim() === '' 
    ? termsSections 
    : termsSections.filter(section => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        section.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

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
            <h1 className="text-xl font-semibold">Terms & Conditions</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Nezto Terms & Conditions</h2>
          </div>
          <p className="text-gray-600">
            Please read these Terms and Conditions carefully before using our services. By accessing or using Nezto, you agree to be bound by these terms.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search in Terms & Conditions..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary bg-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Terms Sections */}
        {filteredSections.length > 0 ? (
          <div className="space-y-4">
            {filteredSections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="font-medium text-gray-800">{section.title}</h3>
                  {expandedSection === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedSection === index && (
                  <div 
                    className="p-4 pt-0 text-gray-600 border-t border-gray-100"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any sections matching your search query.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Last updated: April 21, 2025</p>
          <p className="mt-2">
            If you have any questions about our Terms & Conditions, please{' '}
            <button 
              onClick={() => navigate('/contact-support')}
              className="text-primary hover:underline"
            >
              contact us
            </button>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
