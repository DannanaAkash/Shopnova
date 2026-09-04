import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

interface ReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export default function Reviews({ productId, rating, reviewCount }: ReviewsProps) {
  const [reviews] = useState([
    { id: 1, user: 'Alex D.', rating: 5, date: '2 days ago', text: 'Absolutely love this product! The quality is outstanding and it exceeded my expectations.', likes: 12 },
    { id: 2, user: 'Sam M.', rating: 4, date: '1 week ago', text: 'Very good overall. Shipping was fast, but the packaging could have been slightly better.', likes: 5 },
    { id: 3, user: 'Jamie L.', rating: 5, date: '2 weeks ago', text: 'This changed how I work. Highly recommended for anyone looking for reliability.', likes: 18 }
  ]);

  return (
    <div id="reviews" className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Customer Reviews</h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center min-w-[250px] shadow-sm">
          <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">{rating}</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-6 h-6 ${star <= Math.round(rating) ? 'text-amber-500 fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
            ))}
          </div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Based on {reviewCount} reviews</div>
        </div>
        
        <div className="flex-1 space-y-6 w-full">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{review.user}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{review.date}</div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-amber-500 fill-current' : 'text-slate-200 dark:text-slate-800'}`} />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed font-medium">{review.text}</p>
              <div className="flex gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" /> Helpful ({review.likes})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
