import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar, Footer } from "../../component/init";
import { Clock, CheckCircle, Star, ArrowLeft, Phone, Calendar } from 'lucide-react';
import { getServiceDetail, getAllServices } from '../../utils/serviceDetails';

// Lazy-loaded components
const RelatedServices = lazy(() => import('../../component/block/RelatedServices'));
const ServiceReviews = lazy(() => import('../../component/block/ServiceReviews'));

// Loading component for suspense
const Loading = () => (
  <div className="animate-pulse space-y-4 p-4">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-32 bg-gray-200 rounded"></div>
  </div>
);

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        // Get service details
        const serviceData = await getServiceDetail(serviceId);
        setService(serviceData);
        
        // Get related services
        const allServices = await getAllServices();
        const filtered = allServices
          .filter(s => s.id !== serviceId && s.category === serviceData.category)
          .slice(0, 3);
        setRelatedServices(filtered);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError('Failed to load service details. Please try again later.');
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleBookNow = () => {
    navigate(`/address-selection/${serviceId}`, { state: { serviceData: service } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex-1 max-w-screen-lg mx-auto w-full p-4">
          <div className="animate-pulse space-y-4 mt-16">
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
            <p className="text-gray-600 mb-6">{error || "We couldn't find the service you're looking for."}</p>
            <button 
              onClick={() => navigate('/services')}
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Browse Services
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero Section with Image */}
      <div className="relative w-full h-64 md:h-80 mt-12">
        <img 
          src={service.image || 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80'} 
          alt={service.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <button 
          className="absolute top-4 left-4 p-2 rounded-full bg-white/20 text-white"
          onClick={handleBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 max-w-screen-lg mx-auto w-full px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{service.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 text-gray-800 font-medium">{service.rating}</span>
                </div>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{service.reviewCount} reviews</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="text-2xl font-bold text-primary">₹{service.price}</div>
              {service.originalPrice && (
                <div className="text-sm text-gray-500 line-through">₹{service.originalPrice}</div>
              )}
            </div>
          </div>
          
          {/* Quick Info */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full text-sm">
              <Clock className="w-4 h-4 text-gray-600 mr-1" />
              <span>{service.duration || '45 mins'}</span>
            </div>
            {service.isAvailable && (
              <div className="flex items-center px-3 py-1.5 bg-green-100 rounded-full text-sm text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Available Now</span>
              </div>
            )}
            {service.tags && service.tags.map((tag, index) => (
              <div key={index} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                {tag}
              </div>
            ))}
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mt-6">
            <div className="flex space-x-6">
              <button 
                className={`py-3 text-sm font-medium border-b-2 ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-gray-600'}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button 
                className={`py-3 text-sm font-medium border-b-2 ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-600'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About this service</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                {service.features && service.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">What's included</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mr-3">1</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Book your service</h4>
                        <p className="text-sm text-gray-600">Select your preferred date and time</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mr-3">2</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Professional arrives</h4>
                        <p className="text-sm text-gray-600">Our verified professional will reach your location</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mr-3">3</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Service completion</h4>
                        <p className="text-sm text-gray-600">Sit back and relax while we take care of your needs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <Suspense fallback={<Loading />}>
                <ServiceReviews serviceId={serviceId} />
              </Suspense>
            )}
          </div>
          
          {/* Book Now Button */}
          <button 
            className="w-full py-3 bg-primary text-white rounded-lg font-medium"
            onClick={handleBookNow}
          >
            Book Now
          </button>
          
          {/* Contact */}
          <div className="mt-4 flex justify-center">
            <button className="flex items-center text-primary text-sm">
              <Phone className="w-4 h-4 mr-1" />
              <span>Contact for more information</span>
            </button>
          </div>
        </div>
        
        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">You might also like</h2>
            <Suspense fallback={<Loading />}>
              <RelatedServices services={relatedServices} />
            </Suspense>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
