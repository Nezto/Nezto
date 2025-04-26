import React, { useState, useEffect } from 'react';
import { NavBar, Footer } from "../component/init";
import ServiceCard from '../component/ui/cards/ServiceCard';
import { 
  Shirt, 
  Hammer, 
  WashingMachine, 
  Footprints, 
  Search, 
  PackageOpen, 
  Sparkles, 
  Clock, 
  Briefcase, 
  ShoppingBag, 
  Home, 
  Sofa, 
  Bed, 
  Wind, 
  Umbrella, 
  Leaf, 
  Star, 
  BadgeCheck, 
  ChevronDown,
  Filter
} from 'lucide-react';
import { CarpetCleaning } from '../assets/icons';

const ServicesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredServices, setFilteredServices] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortOption, setSortOption] = useState('popularity');

    // Service categories
    const categories = [
        { id: 'all', name: 'All Services' },
        { id: 'daily', name: 'Daily Wear' },
        { id: 'premium', name: 'Premium' },
        { id: 'home', name: 'Home Care' },
        { id: 'express', name: 'Express' },
        { id: 'seasonal', name: 'Seasonal' }
    ];

    // Complete list of services
    const allServices = [
        // Daily Wear Category
        {
            id: "regular-dry-cleaning",
            name: 'Regular Dry Cleaning',
            description: 'Professional dry cleaning for regular clothes',
            price: '₹69',
            category: 'daily',
            popular: true,
            turnaround: '24-48 hours',
            icon: (<Shirt className='text-white'/>),
        },
        {
            id: "wash-fold",
            name: 'Wash & Fold',
            description: 'Washing, drying and folding service',
            price: '₹99/kg',
            category: 'daily',
            popular: true,
            turnaround: '24 hours',
            icon: (<WashingMachine className='text-white'/>),
        },
        {
            id: "ironing-service",
            name: 'Ironing Service',
            description: 'Professional pressing for wrinkle-free clothes',
            price: '₹25/piece',
            category: 'daily',
            popular: true,
            turnaround: 'Same day',
            icon: (<Hammer className='text-white'/>),
        },
        {
            id: "wash-iron",
            name: 'Wash & Iron',
            description: 'Complete laundry with washing and ironing',
            price: '₹129/kg',
            category: 'daily',
            popular: false,
            turnaround: '24-48 hours',
            icon: (<WashingMachine className='text-white'/>),
        },
        
        // Premium Category
        {
            id: "premium-suit-care",
            name: 'Premium Suit Care',
            description: 'Special care for business suits and formal wear',
            price: '₹399/piece',
            category: 'premium',
            popular: true,
            turnaround: '48-72 hours',
            icon: (<Briefcase className='text-white'/>),
        },
        {
            id: "designer-wear",
            name: 'Designer Wear',
            description: 'Specialized cleaning for high-end designer clothes',
            price: '₹499/piece',
            category: 'premium',
            popular: false,
            turnaround: '72 hours',
            icon: (<ShoppingBag className='text-white'/>),
        },
        {
            id: "wedding-dress",
            name: 'Wedding Dress',
            description: 'Expert care for wedding dresses and formal gowns',
            price: '₹799/piece',
            category: 'premium',
            popular: false,
            turnaround: '5-7 days',
            icon: (<Sparkles className='text-white'/>),
        },
        {
            id: "leather-suede",
            name: 'Leather & Suede',
            description: 'Specialized cleaning for leather and suede items',
            price: '₹599/piece',
            category: 'premium',
            popular: true,
            turnaround: '3-5 days',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        
        // Home Care Category
        {
            id: "carpet-cleaning",
            name: 'Carpet Cleaning',
            description: 'Deep cleaning for carpets and rugs',
            price: '₹30/sq.ft',
            category: 'home',
            popular: true,
            turnaround: '3-4 days',
            icon: (<CarpetCleaning/>),
        },
        {
            id: "curtain-cleaning",
            name: 'Curtain Cleaning',
            description: 'Professional cleaning for all types of curtains',
            price: '₹149/piece',
            category: 'home',
            popular: true,
            turnaround: '3 days',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21V7a2 2 0 012-2h2a2 2 0 012 2v14M5 21V11a2 2 0 012-2h10a2 2 0 012 2v10M3 21h18" />
                </svg>
            ),
        },
        {
            id: "sofa-cleaning",
            name: 'Sofa Cleaning',
            description: 'Refresh your sofa with deep cleaning service',
            price: '₹299/seat',
            category: 'home',
            popular: false,
            turnaround: '2-3 days',
            icon: (<Sofa className='text-white'/>),
        },
        {
            id: "bedding-package",
            name: 'Bedding Package',
            description: 'Complete cleaning for bedsheets, covers & pillowcases',
            price: '₹349/set',
            category: 'home',
            popular: true,
            turnaround: '2-3 days',
            icon: (<Bed className='text-white'/>),
        },
        
        // Express Category
        {
            id: "express-dry-clean",
            name: 'Express Dry Clean',
            description: 'Quick turnaround dry cleaning service',
            price: '₹129/piece',
            category: 'express',
            popular: true,
            turnaround: '6 hours',
            icon: (<Clock className='text-white'/>),
        },
        {
            id: "same-day-laundry",
            name: 'Same Day Laundry',
            description: 'Complete laundry service delivered same day',
            price: '₹149/kg',
            category: 'express',
            popular: true,
            turnaround: 'Same day',
            icon: (<WashingMachine className='text-white'/>),
        },
        {
            id: "express-ironing",
            name: 'Express Ironing',
            description: 'Quick ironing service for urgent needs',
            price: '₹35/piece',
            category: 'express',
            popular: false,
            turnaround: '2-4 hours',
            icon: (<Hammer className='text-white'/>),
        },
        {
            id: "urgent-stain-removal",
            name: 'Urgent Stain Removal',
            description: 'Quick treatment for fresh stains',
            price: '₹199/piece',
            category: 'express',
            popular: false,
            turnaround: '4 hours',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
        },
        
        // Seasonal Category
        {
            id: "winter-wear",
            name: 'Winter Wear',
            description: 'Special care for jackets, coats & sweaters',
            price: '₹249/piece',
            category: 'seasonal',
            popular: false,
            turnaround: '3 days',
            icon: (<Wind className='text-white'/>),
        },
        {
            id: "monsoon-package",
            name: 'Monsoon Package',
            description: 'Special treatment for monsoon-affected clothes',
            price: '₹299/set',
            category: 'seasonal',
            popular: false,
            turnaround: '2-3 days',
            icon: (<Umbrella className='text-white'/>),
        },
        {
            id: "summer-fabrics",
            name: 'Summer Fabrics',
            description: 'Gentle cleaning for light summer fabrics',
            price: '₹159/kg',
            category: 'seasonal',
            popular: true,
            turnaround: '24 hours',
            icon: (<Leaf className='text-white'/>),
        },
        
        // Additional Services
        {
            id: "shoe-care",
            name: 'Shoe Care',
            description: 'Professional cleaning for all types of shoes',
            price: '₹199/pair',
            category: 'daily',
            popular: true,
            turnaround: '3 days',
            icon: (<Footprints className='text-white'/>),
        },
        {
            id: "bag-cleaning",
            name: 'Bag Cleaning',
            description: 'Restoration and cleaning for bags & purses',
            price: '₹249/piece',
            category: 'premium',
            popular: false,
            turnaround: '3-4 days',
            icon: (<PackageOpen className='text-white'/>),
        },
        {
            id: "deep-stain-treatment",
            name: 'Deep Stain Treatment',
            description: 'Advanced stain removal for tough stains',
            price: '₹179/stain',
            category: 'daily',
            popular: true,
            turnaround: '2 days',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
        },
        {
            id: "premium-package",
            name: 'Premium Package',
            description: 'Complete laundry solution for premium clothes',
            price: '₹799/set',
            category: 'premium',
            popular: false,
            turnaround: '4-5 days',
            icon: (<BadgeCheck className='text-white'/>),
        },
        {
            id: "home-linen-package",
            name: 'Home Linen Package',
            description: 'Complete care for all home linens',
            price: '₹499/set',
            category: 'home',
            popular: true,
            turnaround: '3 days',
            icon: (<Home className='text-white'/>),
        },
    ];

    // Filter services based on category and search query
    useEffect(() => {
        let filtered = [...allServices];
        
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(service => service.category === selectedCategory);
        }
        
        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(service => 
                service.name.toLowerCase().includes(query) || 
                service.description.toLowerCase().includes(query)
            );
        }
        
        // Sort services
        if (sortOption === 'popularity') {
            filtered = [...filtered.filter(s => s.popular), ...filtered.filter(s => !s.popular)];
        } else if (sortOption === 'priceAsc') {
            filtered.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
        } else if (sortOption === 'priceDesc') {
            filtered.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
        }
        
        setFilteredServices(filtered);
    }, [selectedCategory, searchQuery, sortOption]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-20">
                {/* Page Title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Our Services</h1>
                    <p className="text-gray-600 mt-1">Choose from our wide range of professional cleaning services</p>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Search Input */}
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search services..." 
                                className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        {/* Filter Button (Mobile) */}
                        <button 
                            className="md:hidden flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 rounded-lg text-gray-700"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={16} />
                            <span>Filters</span>
                        </button>
                        
                        {/* Sort Dropdown */}
                        <div className="relative flex-shrink-0 w-full md:w-48">
                            <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg cursor-pointer">
                                <span className="text-gray-700 text-sm">Sort by: {sortOption === 'popularity' ? 'Popular' : sortOption === 'priceAsc' ? 'Price: Low to High' : 'Price: High to Low'}</span>
                                <ChevronDown size={16} className="text-gray-500" />
                            </div>
                            
                            {/* Dropdown Options */}
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10 hidden group-hover:block">
                                <div 
                                    className="py-2 px-3 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSortOption('popularity')}
                                >
                                    Popular
                                </div>
                                <div 
                                    className="py-2 px-3 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSortOption('priceAsc')}
                                >
                                    Price: Low to High
                                </div>
                                <div 
                                    className="py-2 px-3 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSortOption('priceDesc')}
                                >
                                    Price: High to Low
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile Filters (Expandable) */}
                    {showFilters && (
                        <div className="mt-3 md:hidden">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            className={`py-1.5 px-3 rounded-full text-sm ${
                                                selectedCategory === category.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white border border-gray-200 text-gray-700'
                                            }`}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Categories (Desktop) */}
                <div className="hidden md:block mb-6">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`py-2 px-4 rounded-lg text-sm font-medium ${
                                    selectedCategory === category.id
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredServices.map((service) => (
                            <div key={service.id} className="relative">
                                {service.popular && (
                                    <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
                                        <div className="flex items-center bg-amber-100 py-1 px-2 rounded-full">
                                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                            <span className="text-xs text-amber-700 ml-1">Popular</span>
                                        </div>
                                    </div>
                                )}
                                <ServiceCard 
                                    id={service.id}
                                    icon={service.icon} 
                                    cardTitle={service.name} 
                                    cardDescription={service.description} 
                                    cardPrice={service.price}
                                    cardButtonText="Book Now"
                                    extraInfo={service.turnaround}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-gray-500">No services found. Try adjusting your search or filters.</p>
                    </div>
                )}

                {/* Bulk Order CTA */}
                <div className="mt-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold mb-2">Need bulk service for business?</h3>
                            <p className="text-white/90">We offer special rates for hotels, restaurants, and businesses.</p>
                        </div>
                        <button className="bg-white text-primary font-medium py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                            Get a Quote
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ServicesPage;