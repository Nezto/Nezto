import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, ChevronDown, ChevronUp, Search } from 'lucide-react';

const PrivacyPolicyPage = () => {
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

  const policySections = [
    {
      title: 'Introduction',
      content: `
        <p>Last updated: April 21, 2025</p>
        <p>Welcome to Nezto ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Platform").</p>
        <p>Please read this Privacy Policy carefully. By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Platform.</p>
      `
    },
    {
      title: 'Information We Collect',
      content: `
        <p>We collect several types of information from and about users of our Platform, including:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Personal Information:</strong> This includes your name, email address, phone number, postal address, profile picture, and payment information.</li>
          <li><strong>Usage Information:</strong> Details of your visits to our Platform, including traffic data, location data, logs, and other communication data.</li>
          <li><strong>Device Information:</strong> Information about your device and internet connection, including your device's unique device identifier, IP address, operating system, browser type, and mobile network information.</li>
          <li><strong>Location Information:</strong> We collect real-time information about the location of your device to provide location-based services.</li>
          <li><strong>Transaction Information:</strong> Details about orders, purchases, and payment methods you use on our Platform.</li>
        </ul>
      `
    },
    {
      title: 'How We Collect Information',
      content: `
        <p>We collect information in the following ways:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Direct Collection:</strong> Information you provide when you register, create a profile, place an order, contact customer support, or otherwise interact with our Platform.</li>
          <li><strong>Automated Collection:</strong> As you navigate through our Platform, we may use cookies, web beacons, and other tracking technologies to collect usage information.</li>
          <li><strong>Third-Party Sources:</strong> We may receive information about you from third-party partners, such as social media platforms, payment processors, and marketing partners.</li>
        </ul>
      `
    },
    {
      title: 'How We Use Your Information',
      content: `
        <p>We use the information we collect for various purposes, including:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Providing, maintaining, and improving our Platform and services</li>
          <li>Processing and fulfilling your orders and transactions</li>
          <li>Communicating with you about your orders, account, and customer support inquiries</li>
          <li>Sending you promotional communications about new services, special offers, and other news</li>
          <li>Personalizing your experience on our Platform</li>
          <li>Analyzing usage patterns to improve our Platform and services</li>
          <li>Detecting, preventing, and addressing technical issues, fraud, and illegal activities</li>
          <li>Complying with legal obligations</li>
        </ul>
      `
    },
    {
      title: 'Sharing Your Information',
      content: `
        <p>We may share your information with:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, and customer service.</li>
          <li><strong>Service Partners:</strong> Local service providers who fulfill your orders and provide services to you.</li>
          <li><strong>Business Partners:</strong> Trusted businesses with whom we collaborate to offer joint promotions or products.</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, safety, and property, or the rights, safety, and property of others.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as a business asset.</li>
        </ul>
        <p>We do not sell your personal information to third parties for their marketing purposes without your explicit consent.</p>
      `
    },
    {
      title: 'Data Security',
      content: `
        <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>
        <p>We use industry-standard encryption technologies when transferring and receiving consumer data. We also have appropriate security measures in place in our physical facilities to protect against the loss, misuse, or alteration of information that we have collected from you.</p>
        <p>Despite our efforts, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures. You are responsible for maintaining the confidentiality of your account credentials and limiting access to your device.</p>
      `
    },
    {
      title: 'Your Choices and Rights',
      content: `
        <p>You have certain choices and rights regarding your personal information:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Account Information:</strong> You can review and update your account information through your account settings.</li>
          <li><strong>Marketing Communications:</strong> You can opt out of receiving promotional emails by following the unsubscribe instructions in those emails or by adjusting your notification preferences in your account settings.</li>
          <li><strong>Location Information:</strong> You can control location tracking through your device settings.</li>
          <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can choose to set your browser to refuse cookies or to alert you when cookies are being sent.</li>
          <li><strong>Data Access and Portability:</strong> You may request a copy of your personal information that we hold.</li>
          <li><strong>Data Deletion:</strong> You may request the deletion of your personal information, subject to certain exceptions.</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
      `
    },
    {
      title: 'Children\'s Privacy',
      content: `
        <p>Our Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our systems.</p>
      `
    },
    {
      title: 'Changes to Our Privacy Policy',
      content: `
        <p>We may update our Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice on our Platform prior to the changes becoming effective. We encourage you to review this Privacy Policy periodically for any changes.</p>
        <p>Your continued use of our Platform after we post changes to the Privacy Policy means that you accept and agree to the updated terms.</p>
      `
    },
    {
      title: 'Contact Us',
      content: `
        <p>If you have any questions or concerns about our Privacy Policy or our data practices, please contact us at:</p>
        <p>Email: privacy@nezto.com</p>
        <p>Phone: +91 8001234567</p>
        <p>Address: Nezto Technologies Pvt. Ltd., 123 Tech Park, Koramangala, Bangalore - 560034, India</p>
      `
    }
  ];

  const filteredSections = searchQuery.trim() === '' 
    ? policySections 
    : policySections.filter(section => 
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
            <h1 className="text-xl font-semibold">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Nezto Privacy Policy</h2>
          </div>
          <p className="text-gray-600">
            At Nezto, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search in Privacy Policy..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary bg-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Policy Sections */}
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
            If you have any questions about our Privacy Policy, please{' '}
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

export default PrivacyPolicyPage;
