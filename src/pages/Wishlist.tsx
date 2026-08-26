import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 bg-red-50 text-red-300 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Your wishlist is empty</h2>
        <p className="text-slate-500 mb-8 max-w-md">Save items you like and they will show up here.</p>
        <Link to="/" className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white font-bold py-3 px-8 rounded-2xl hover:shadow-lg transition-all">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-red-500 w-8 h-8 fill-current" />
        <h1 className="text-3xl font-extrabold text-slate-900">My Wishlist</h1>
        <span className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full text-sm ml-2">
          {wishlist.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
