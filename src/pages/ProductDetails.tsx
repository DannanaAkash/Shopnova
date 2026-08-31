import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../lib/utils';
import { Sparkles, Star, ShieldCheck, Zap, Heart, Truck, Check, MessageSquare } from 'lucide-react';
import Reviews from '../components/Reviews';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState<Record<string, string>>({});
  const [explaining, setExplaining] = useState<string | null>(null);
  const [reviewSummary, setReviewSummary] = useState<string | null>(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const handleExplain = async (key: string, value: string) => {
    if (explanation[key]) return;
    setExplaining(key);
    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `${key}: ${value}` })
      });
      const data = await res.json();
      setExplanation(prev => ({ ...prev, [key]: data.explanation }));
    } catch (err) {
      console.error(err);
    } finally {
      setExplaining(null);
    }
  };

  const fetchReviewSummary = async (productName: string) => {
    setLoadingReviews(true);
    try {
      const res = await fetch('/api/ai/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName })
      });
      const data = await res.json();
      setReviewSummary(data.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReviews(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!product) return <div className="text-center py-20 text-xl font-medium">Product not found</div>;

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm group">
            <img 
              src={product.images && product.images.length > 0 ? product.images[activeImage] : product.image} 
              alt={product.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal" 
            />
            {product.discount > 0 && (
              <div className="absolute top-6 left-6 bg-rose-500 text-white font-bold px-4 py-2 rounded-full shadow-lg">
                {product.discount}% OFF
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all snap-start ${
                    activeImage === idx ? 'border-indigo-600 shadow-md ring-2 ring-indigo-100 dark:ring-indigo-900/50' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-900/30">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <span className="text-amber-800 dark:text-amber-300 font-bold ml-1">{product.rating}</span>
            </div>
            <a href="#reviews" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium underline underline-offset-4">
              {product.reviews} reviews
            </a>
            {product.smartScore && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 px-3 py-1 rounded-full text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="font-bold text-sm">AI Score: {product.smartScore}/100</span>
              </div>
            )}
          </div>
          
          <div className="mb-8 flex items-end gap-3">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(discountedPrice)}</span>
            {product.discount > 0 && (
              <span className="text-xl text-slate-500 dark:text-slate-400 line-through mb-1">{formatCurrency(product.price)}</span>
            )}
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg mb-8 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex gap-4 mb-10">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:-translate-y-0.5 transition-all text-lg flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`w-16 flex items-center justify-center rounded-2xl border-2 transition-colors ${
                isInWishlist(product.id) 
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-500' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-red-500 hover:text-red-500 dark:hover:border-red-500 dark:hover:text-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
              <Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
              <div>
                <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">Free Delivery</div>
                <div className="text-xs text-emerald-700 dark:text-emerald-500">Usually in 2-3 days</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">Secure Payment</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">SSL Encrypted</div>
              </div>
            </div>
          </div>
          
          {/* AI Specs Feature */}
          <div className="border border-indigo-100 dark:border-indigo-900/30 rounded-3xl p-6 bg-white dark:bg-slate-900 relative overflow-hidden mb-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 relative z-10">
              <Sparkles className="text-indigo-500 dark:text-indigo-400" />
              AI Technical Specs
            </h3>
            
            <div className="space-y-4 relative z-10">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">{key}</span>
                      <span className="text-slate-900 dark:text-slate-300 font-medium">{value}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleExplain(key, value)}
                      disabled={!!explanation[key] || explaining === key}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        explanation[key] 
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' 
                          : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50'
                      }`}
                    >
                      {explaining === key ? (
                        <div className="w-3 h-3 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : explanation[key] ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Zap className="w-3 h-3" />
                      )}
                      {explanation[key] ? 'Explained' : 'Explain Simply'}
                    </button>
                  </div>
                  
                  {explanation[key] && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-red-50 via-yellow-50 to-blue-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 flex gap-2 font-medium">
                      <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <div>{explanation[key]}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Review Summary Feature */}
          <div className="border border-purple-100 dark:border-purple-900/30 rounded-3xl p-6 bg-white dark:bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 dark:bg-purple-900/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="text-purple-500 dark:text-purple-400" />
                AI Review Summary
              </h3>
              {!reviewSummary && !loadingReviews && (
                <button 
                  onClick={() => fetchReviewSummary(product.name)}
                  className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Summarize Reviews
                </button>
              )}
            </div>

            <div className="relative z-10">
              {loadingReviews ? (
                <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 font-medium py-4">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  Reading {product.reviews} reviews...
                </div>
              ) : reviewSummary ? (
                <div className="prose prose-sm max-w-none text-slate-800 dark:text-slate-200 p-5 bg-gradient-to-r from-red-50 via-yellow-50 via-green-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 font-medium">
                  {/* For Markdown formatting handling, using dangerouslySetInnerHTML or simply simple text replacement */}
                  <div dangerouslySetInnerHTML={{ __html: reviewSummary.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                </div>
              ) : (
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">Get an instant AI summary of what customers are saying about this product.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Real Reviews Section */}
      <Reviews productId={product.id} rating={product.rating} reviewCount={product.reviews} />
    </div>
  );
}
