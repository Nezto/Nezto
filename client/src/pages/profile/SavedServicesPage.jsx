import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../component/block/NavBar';
import Footer from '../../component/block/Footer';
import { ArrowLeft, Heart, Trash2, Star, Search, Filter, ShoppingCart } from 'lucide-react';

// Mock user context with saved services
const useUserSavedServices = () => {
  const [savedServices, setSavedServices] = useState([
    {
      id: 'svc1',
      name: 'Premium Laundry',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      rating: 4.8,
      reviewCount: 245,
      price: 599,
      description: 'Premium laundry service with stain removal and fabric care',
      tags: ['Premium', 'Stain Removal']
    },
    {
      id: 'svc2',
      name: 'Express Dry Cleaning',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      rating: 4.6,
      reviewCount: 189,
      price: 799,
      description: 'Same-day dry cleaning service for your urgent needs',
      tags: ['Express', 'Same Day']
    },
    {
      id: 'svc3',
      name: 'Shoe Cleaning',
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      rating: 4.7,
      reviewCount: 132,
      price: 399,
      description: 'Professional shoe cleaning and restoration service',
      tags: ['Shoes', 'Restoration']
    }
  ]);

  const removeFromSaved = (serviceId) => {
    setSavedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  return {
    savedServices,
    removeFromSaved
  };
};

const SavedServicesPage = () => {
  const navigate = useNavigate();
  const { savedServices, removeFromSaved } = useUserSavedServices();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = savedServices.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRemoveService = (e, serviceId) => {
    e.stopPropagation();
    removeFromSaved(serviceId);
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white mt-12">
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-full bg-white/10" onClick={() => navigate('/profile')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Saved Services</h1>
          <div className="w-5"></div> {/* Empty div for flex alignment */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 sticky top-0 z-10 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search saved services..."
            className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        {filteredServices.length > 0 ? (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="400"
                    height="200"
                  />
                  <button 
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
                    onClick={(e) => handleRemoveService(e, service.id)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{service.name}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#FBBF24" />
                      <span>{service.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{service.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {service.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-primary font-semibold">₹{service.price}</div>
                    <button className="px-3 py-2 bg-primary text-white rounded-lg text-sm flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-1" /> Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-6 mt-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No saved services</h3>
            <p className="text-gray-500 mb-6 text-center">You haven't saved any services yet</p>
            <button 
              onClick={() => navigate('/services')} 
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
            >
              Explore Services
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SavedServicesPage;
