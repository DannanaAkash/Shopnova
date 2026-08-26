import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Sparkles, ArrowRight } from 'lucide-react';

export default function BudgetFinder() {
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    if (budget) {
      const query = `Best ${category || 'products'} under ₹${budget}`;
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 rounded-3xl overflow-hidden relative shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <Wallet className="w-4 h-4" />
            Shop Within My Budget
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Tell us your budget.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
              Nova AI will do the rest.
            </span>
          </h2>
          <p className="text-indigo-100/80 text-lg max-w-xl mx-auto lg:mx-0">
            Don't overspend. Enter your budget and what you're looking for, and our AI will recommend the absolute best products in that price range.
          </p>
        </div>
        
        <div className="w-full lg:w-[450px] shrink-0">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleFind} className="space-y-5">
              <div>
                <label className="block text-indigo-200 text-sm font-bold mb-2 uppercase tracking-wide">My Budget (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-white/50 font-bold">₹</span>
                  </div>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 30000"
                    className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition-all font-bold text-lg"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-indigo-200 text-sm font-bold mb-2 uppercase tracking-wide">I am looking for</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition-all font-bold appearance-none"
                >
                  <option value="" className="text-slate-900">Anything</option>
                  <option value="Smartphone" className="text-slate-900">Smartphone</option>
                  <option value="Laptop" className="text-slate-900">Laptop</option>
                  <option value="Headphones" className="text-slate-900">Headphones</option>
                  <option value="Shoes" className="text-slate-900">Shoes</option>
                  <option value="Gaming" className="text-slate-900">Gaming Console</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Find Best Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
