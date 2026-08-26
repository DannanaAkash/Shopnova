import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Sparkles, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-indigo-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-red-500 via-yellow-500 to-purple-600 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 hidden sm:block">
              Shopping Zone
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-1 max-w-2xl px-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-indigo-100 rounded-2xl leading-5 bg-indigo-50/30 placeholder-indigo-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                  placeholder="Ask Nova AI to find something... (e.g. Best phone under ₹30,000)"
                />
                <button type="submit" className="absolute inset-y-1 right-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white px-4 rounded-xl text-sm font-medium hover:shadow-md transition-all">
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/wishlist" className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50">
              <Heart className="w-6 h-6" />
            </Link>
            
            <Link to="/cart" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50 relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <Link to="/profile" className="hidden sm:flex items-center gap-2 p-2 text-slate-700 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50 font-bold">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 flex items-center justify-center text-white text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm">{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-2 p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50">
                <User className="w-6 h-6" />
              </Link>
            )}

            <button className="md:hidden p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on mobile */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearch} className="w-full relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-indigo-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-indigo-100 rounded-xl leading-5 bg-indigo-50/30 placeholder-indigo-300 focus:outline-none focus:bg-white focus:border-indigo-500 sm:text-sm"
              placeholder="Search products..."
            />
          </form>
        </div>
      </div>
    </header>
  );
}
