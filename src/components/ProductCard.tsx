import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Sparkles, ShoppingCart, ArrowLeftRight, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { compareList, toggleCompare } = useCompare();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const discountedPrice = product.price * (1 - product.discount / 100);
  const isComparing = compareList.some(p => p.id === product.id);
  const isLiked = isInWishlist(product.id);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.discount > 0 && (
          <div className="bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        {product.smartScore && (
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-indigo-700 dark:text-indigo-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-indigo-100 dark:border-slate-700 mb-2">
            <Sparkles className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
            AI Score: {product.smartScore}
          </div>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400 dark:text-slate-500'}`} />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800">
        <img 
          src={product.image} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold uppercase tracking-wider">{product.category}</div>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCompare(product); }}
            className={`p-1.5 rounded-full transition-colors ${isComparing ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
            title="Compare"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-slate-700 dark:text-slate-300 font-medium ml-1 text-sm">{product.rating}</span>
          </div>
          <span className="text-slate-400 dark:text-slate-500 text-xs">({product.reviews})</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(discountedPrice)}</div>
            {product.discount > 0 && (
              <div className="text-sm text-slate-400 dark:text-slate-500 line-through">{formatCurrency(product.price)}</div>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
