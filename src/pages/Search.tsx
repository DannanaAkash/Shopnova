import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Sparkles, Search as SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setAiResponse(null);
    
    // Fetch products
    fetch(`/api/products${query ? `?q=${encodeURIComponent(query)}` : ''}`)
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

    // If there is a natural language query, ask AI Assistant
    if (query) {
      fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `The user is searching for: "${query}". Briefly recommend the best options from the store or give a helpful tip.` })
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch AI response');
        return res.json();
      })
      .then(data => {
        setAiResponse(data.response);
      })
      .catch(err => {
        console.error(err);
        setAiResponse('Sorry, I am having trouble fetching recommendations right now.');
      });
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <SearchIcon className="w-8 h-8 text-indigo-500" />
        <h1 className="text-3xl font-extrabold text-slate-900">
          {query ? `Results for "${query}"` : 'All Products'}
        </h1>
      </div>

      {query && (
        <div className="mb-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 md:p-8 border border-indigo-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Assistant Insights</h3>
              {aiResponse ? (
                <div className="prose prose-indigo max-w-none text-slate-700">
                  {aiResponse}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-indigo-500 font-medium">
                  <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  Analyzing your search...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : products.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <SearchIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No products found</h2>
          <p className="text-slate-500">Try adjusting your search terms or ask AI Assistant for help.</p>
        </div>
      )}
    </div>
  );
}
