import React, { useState } from 'react';
import { Heart, Search, Trash2, PlusCircle } from 'lucide-react';

const WishlistSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Dry Cleaning',
      description: 'Professional dry cleaning for premium garments',
      price: '₹349',
      category: 'Clothes',
      imageUrl: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      name: 'Sofa Deep Cleaning',
      description: 'Deep cleaning for all types of sofas',
      price: '₹499',
      category: 'Furniture',
      imageUrl: 'https://via.placeholder.com/80'
    },
    {
      id: 3,
      name: 'Curtain Cleaning',
      description: 'Professional cleaning for all types of curtains',
      price: '₹149/piece',
      category: 'Home',
      imageUrl: 'https://via.placeholder.com/80'
    },
    {
      id: 4,
      name: 'Carpet Cleaning',
      description: 'Deep cleaning for carpets and rugs',
      price: '₹15/sq.ft.',
      category: 'Home',
      imageUrl: 'https://via.placeholder.com/80'
    }
  ]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter wishlist items based on search query
  const filteredItems = wishlistItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Remove item from wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  // Add to cart (in a real app, this would add the service to the cart)
  const addToCart = (itemId) => {
    // This is just a placeholder for demonstration
    alert(`Added service ID ${itemId} to cart`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Saved Services</h2>
      </div>
      
      {/* Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search saved services"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
      
      {/* Wishlist Items */}
      <div className="divide-y divide-gray-100">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <Heart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No saved services</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No results matching "${searchQuery}"` 
                : "You haven't saved any services yet"}
            </p>
            <button className="mt-4 px-4 py-2 bg-primary text-white font-medium rounded-lg flex items-center mx-auto">
              <Heart className="w-4 h-4 mr-2" />
              Explore Services
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {filteredItems.map(item => (
                <div 
                  key={item.id} 
                  className="relative flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-3"
                >
                  {/* Service Image */}
                  <div className="flex-shrink-0 h-20 w-20 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Service Info */}
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                        <div className="mt-1 flex items-center">
                          <span className="text-sm font-medium text-gray-800 mr-2">{item.price}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="p-2 text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                      title="Add to Cart"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                      title="Remove from Saved"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSection; 