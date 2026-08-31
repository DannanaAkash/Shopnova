import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import BudgetFinder from '../components/BudgetFinder';
import Categories from '../components/Categories';
import FlashSale from '../components/FlashSale';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?limit=12')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-br from-red-50 via-yellow-50 via-green-50 to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 dark:bg-red-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 -left-40 w-80 h-80 bg-yellow-200 dark:bg-yellow-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 transition-colors">
            Smart Shopping.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 drop-shadow-sm">
              For Everyone.
            </span>
          </h1>
          <div className="flex justify-center gap-4 flex-col sm:flex-row mt-10">
            <button 
              onClick={() => {
                const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (searchInput) searchInput.focus();
              }}
              className="px-8 py-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Ask AI Assistant
            </button>
            <a href="#trending" className="px-8 py-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-indigo-100 dark:border-slate-700 transition-all flex items-center justify-center">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Smart Score</h3>
              <p className="text-slate-600 dark:text-slate-400">AI rates every product on value and quality so you always buy the best.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Explain Simply</h3>
              <p className="text-slate-600 dark:text-slate-400">Confusing specs? Our AI breaks down technical jargon into plain English.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-fuchsia-50/50 dark:bg-fuchsia-950/20 border border-fuchsia-100 dark:border-fuchsia-900/30">
              <div className="w-14 h-14 bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-600 dark:text-fuchsia-400 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Review Summary</h3>
              <p className="text-slate-600 dark:text-slate-400">Don't read hundreds of reviews. AI Assistant summarizes the pros and cons instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Categories />

      {/* Flash Sale */}
      <FlashSale />

      {/* Budget Finder */}
      <section className="py-12 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BudgetFinder />
        </div>
      </section>

      {/* Products Section */}
      <section id="trending" className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <TrendingUp className="text-indigo-500 w-8 h-8" />
              Trending Now
            </h2>
            <Link to="/products" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300">View All →</Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
