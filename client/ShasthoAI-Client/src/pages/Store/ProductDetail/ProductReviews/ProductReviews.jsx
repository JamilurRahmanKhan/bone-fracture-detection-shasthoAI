import React, { useState } from 'react';
import { Star, User, Calendar } from 'lucide-react';

/**
 * ProductReviews Component
 * 
 * Displays customer reviews and ratings using product data from useStore
 */
const ProductReviews = ({ product }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock reviews data based on product rating and reviews count
  const mockReviews = [
    {
      id: 1,
      user: 'John D.',
      rating: Math.min(5, Math.max(1, Math.round(product.rating))),
      date: '2024-01-15',
      comment: `Excellent ${product.name}! Works exactly as described. Very effective for my needs.`,
      verified: true
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: Math.min(5, Math.max(1, Math.round(product.rating - 0.3))),
      date: '2024-01-10',
      comment: `Good product quality. The ${product.dosage} works well and I'm satisfied with the results.`,
      verified: true
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: Math.min(5, Math.max(1, Math.round(product.rating + 0.2))),
      date: '2024-01-08',
      comment: `Fast shipping and great quality. ${product.manufacturer} never disappoints. Will buy again!`,
      verified: false
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-slate-900 mb-2">{product.rating}</div>
          <div className="flex justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <div className="text-slate-600">Based on {product.reviews} reviews</div>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center space-x-3">
              <span className="text-sm text-slate-600 w-8">{stars} star</span>
              <div className="flex-1 bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${(stars / 5) * 100}%` }}
                />
              </div>
              <span className="text-sm text-slate-600 w-12">
                ({Math.floor(product.reviews * (stars / 5))})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-slate-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{review.user}</div>
                  <div className="flex items-center space-x-1 text-slate-600 text-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{review.date}</span>
                    {review.verified && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium py-3 px-8 rounded-xl transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;