import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

// Mock review data - in a real app, this would come from an API
const mockReviews = {
  "regular-dry-cleaning": [
    { id: 1, name: "Rahul M.", rating: 5, comment: "Outstanding service! Delivery was on time and my clothes have never looked better.", date: "2 weeks ago", avatar: "https://randomuser.me/api/portraits/men/32.jpg", likes: 4 },
    { id: 2, name: "Priya S.", rating: 4, comment: "Very good service. They handled my delicate clothes with care. Would recommend!", date: "1 month ago", avatar: "https://randomuser.me/api/portraits/women/44.jpg", likes: 2 },
    { id: 3, name: "Amit K.", rating: 5, comment: "Fast delivery and professional service. I've been using them for months now.", date: "2 months ago", avatar: "https://randomuser.me/api/portraits/men/68.jpg", likes: 7 },
  ],
  "premium-suit-care": [
    { id: 4, name: "Vikram S.", rating: 5, comment: "The premium suit cleaning is worth every penny. Exceptional quality and attention to detail.", date: "3 weeks ago", avatar: "https://randomuser.me/api/portraits/men/22.jpg", likes: 8 },
    { id: 5, name: "Neha P.", rating: 4, comment: "Good service overall. My suit came back looking fresh, though delivery was slightly delayed.", date: "1 month ago", avatar: "https://randomuser.me/api/portraits/women/24.jpg", likes: 3 },
  ],
  "express-dry-clean": [
    { id: 6, name: "Ravi T.", rating: 5, comment: "Super fast service! Needed my shirt cleaned for an interview and they delivered in just 5 hours.", date: "2 weeks ago", avatar: "https://randomuser.me/api/portraits/men/42.jpg", likes: 6 },
    { id: 7, name: "Ananya M.", rating: 5, comment: "Incredible turnaround time without compromising quality. Worth the premium price.", date: "3 weeks ago", avatar: "https://randomuser.me/api/portraits/women/29.jpg", likes: 4 },
    { id: 8, name: "Karan S.", rating: 4, comment: "Reliable express service. Have used multiple times for urgent needs.", date: "1 month ago", avatar: "https://randomuser.me/api/portraits/men/77.jpg", likes: 2 },
  ],
  "carpet-cleaning": [
    { id: 9, name: "Deepak J.", rating: 5, comment: "They removed stains I thought would never come out! My carpet looks almost new.", date: "1 month ago", avatar: "https://randomuser.me/api/portraits/men/52.jpg", likes: 9 },
    { id: 10, name: "Meera V.", rating: 4, comment: "Professional team, good service. Took good care of my expensive Persian rug.", date: "2 months ago", avatar: "https://randomuser.me/api/portraits/women/67.jpg", likes: 5 },
  ]
};

// Default reviews for services without specific reviews
const defaultReviews = [
  { id: 11, name: "Sanjay R.", rating: 4, comment: "Good service and professional staff. Would use again.", date: "1 month ago", avatar: "https://randomuser.me/api/portraits/men/92.jpg", likes: 3 },
  { id: 12, name: "Anjali D.", rating: 5, comment: "Excellent quality service. My clothes came back perfectly clean.", date: "2 months ago", avatar: "https://randomuser.me/api/portraits/women/37.jpg", likes: 6 },
];

const ServiceReviews = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Use service-specific reviews or fall back to default reviews
      const serviceReviews = mockReviews[serviceId] || defaultReviews;
      setReviews(serviceReviews);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [serviceId]);

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleCommentChange = (e) => {
    setNewReview(prev => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, this would send the review to an API
    alert('Thank you for your review! It will be published after moderation.');
    setShowWriteReview(false);
    setNewReview({ rating: 5, comment: '' });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex space-x-4">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10" id="reviews">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Customer Reviews</h2>
        <button 
          className="text-primary font-medium hover:text-primary/80 transition-colors"
          onClick={() => setShowWriteReview(!showWriteReview)}
        >
          Write a Review
        </button>
      </div>

      {/* Review Stats */}
      {reviews.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col md:flex-row md:items-center">
          <div className="flex items-center mb-3 md:mb-0 md:mr-6">
            <div className="flex items-center mr-2">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <span className="ml-1 text-xl font-bold text-gray-800">{calculateAverageRating()}</span>
            </div>
            <div className="text-sm text-gray-500">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </div>
          </div>
          
          <div className="flex gap-1 flex-wrap">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = Math.round((count / reviews.length) * 100);
              
              return (
                <div key={rating} className="flex items-center text-xs">
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded mr-1">
                    {rating}★ ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Write Your Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-6 w-6 ${
                        star <= newReview.rating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">Your Review</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                rows="3"
                placeholder="Share your experience with this service..."
                value={newReview.comment}
                onChange={handleCommentChange}
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowWriteReview(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center mb-1">
                    <h3 className="font-medium text-gray-800 mr-2">{review.name}</h3>
                    <span className="text-gray-500 text-xs">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-3">{review.comment}</p>
                  <div className="flex text-xs text-gray-500">
                    <button className="flex items-center mr-4 hover:text-gray-700 transition-colors">
                      <ThumbsUp size={14} className="mr-1" />
                      Helpful ({review.likes})
                    </button>
                    <button className="flex items-center hover:text-gray-700 transition-colors">
                      <MessageSquare size={14} className="mr-1" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {reviews.length > 3 && (
            <div className="text-center mt-4">
              <button className="text-primary font-medium hover:text-primary/80 transition-colors">
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => setShowWriteReview(true)}
          >
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceReviews; 