import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const RelatedServices = ({ services = [] }) => {
  const navigate = useNavigate();

  if (services.length === 0) {
    return null;
  }

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Related Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <div 
            key={service.id}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
            onClick={() => handleServiceClick(service.id)}
          >
            <h3 className="font-medium text-gray-800 mb-1">{service.name}</h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-primary">{service.price}</span>
              <button className="text-primary text-xs flex items-center">
                View Details <ArrowRight size={12} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices; 