import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Award, MapPin, Calendar, Star, Briefcase, Heart } from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const teamMembers = [
    {
      name: 'Rajiv Kumar',
      position: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Rajiv has over 15 years of experience in the service industry and founded Nezto with a vision to transform everyday services.'
    },
    {
      name: 'Priya Sharma',
      position: 'COO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Priya oversees all operations at Nezto, ensuring service excellence and customer satisfaction across all locations.'
    },
    {
      name: 'Vikram Singh',
      position: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      bio: 'Vikram leads our technology team, building innovative solutions to make service delivery seamless and efficient.'
    },
    {
      name: 'Ananya Patel',
      position: 'Head of Customer Experience',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      bio: 'Ananya ensures that every customer interaction with Nezto exceeds expectations and builds lasting relationships.'
    }
  ];

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
            <h1 className="text-xl font-semibold">About Nezto</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
            <img 
              src="/img/logo/logo-white.png" 
              alt="Nezto Logo" 
              className="h-16"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/160x80?text=Nezto';
              }}
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Simplifying Everyday Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nezto is a leading service platform connecting customers with trusted service providers for laundry, cleaning, and home services. Our mission is to make everyday tasks easier, giving you more time for what matters most.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Our Story
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Founded in 2020, Nezto was born from a simple observation: people spend too much time on routine tasks that could be better handled by professionals. Our founder, Rajiv Kumar, experienced firsthand the challenges of finding reliable service providers for everyday needs.
            </p>
            <p>
              What started as a small operation in Bangalore has now grown into a nationwide service platform, connecting thousands of customers with verified service providers across major Indian cities.
            </p>
            <p>
              Our journey has been guided by a commitment to quality, reliability, and customer satisfaction. We've continuously evolved our platform based on customer feedback, introducing new features and expanding our service offerings to meet the growing needs of our community.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                <Star className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Quality Excellence</h3>
                <p className="text-gray-600">We maintain the highest standards in every service we offer, ensuring consistent quality and customer satisfaction.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Community Focus</h3>
                <p className="text-gray-600">We build meaningful relationships with customers and service providers, creating a community of trust and mutual respect.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Reliability</h3>
                <p className="text-gray-600">We deliver on our promises, ensuring timely and dependable service that customers can count on.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center mr-4">
                <Briefcase className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Empowerment</h3>
                <p className="text-gray-600">We empower service providers with fair opportunities and customers with convenient solutions for their everyday needs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Presence */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            Our Presence
          </h2>
          <p className="text-gray-600 mb-4">
            Nezto currently operates in 8 major cities across India, with plans for expansion to 15+ cities by the end of 2025.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Delhi NCR</h3>
              <p className="text-sm text-gray-500">Since 2020</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Mumbai</h3>
              <p className="text-sm text-gray-500">Since 2020</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Bangalore</h3>
              <p className="text-sm text-gray-500">Since 2020</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Hyderabad</h3>
              <p className="text-sm text-gray-500">Since 2021</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Chennai</h3>
              <p className="text-sm text-gray-500">Since 2021</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Kolkata</h3>
              <p className="text-sm text-gray-500">Since 2022</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Pune</h3>
              <p className="text-sm text-gray-500">Since 2022</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <h3 className="font-medium text-gray-800">Ahmedabad</h3>
              <p className="text-sm text-gray-500">Since 2023</p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-gray-800">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.position}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-sm p-6 text-white text-center">
          <h2 className="text-xl font-semibold mb-3">Join the Nezto Family</h2>
          <p className="mb-4 max-w-2xl mx-auto">
            Whether you're looking for reliable services or want to join our network of service providers, Nezto welcomes you to be part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => navigate('/services')}
              className="px-6 py-2 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Explore Services
            </button>
            <button 
              onClick={() => navigate('/contact-support')}
              className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
