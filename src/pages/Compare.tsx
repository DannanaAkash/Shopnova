import React, { useEffect, useState } from 'react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { ArrowLeftRight, Sparkles, ShoppingCart, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Compare() {
  const { compareList, toggleCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [aiVerdict, setAiVerdict] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (compareList.length > 1) {
      setLoading(true);
      fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productNames: compareList.map(p => p.name) })
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch AI comparison');
        return res.json();
      })
      .then(data => {
        setAiVerdict(data.comparison);
      })
      .catch(err => {
        console.error(err);
        setAiVerdict("Sorry, AI comparison is currently unavailable.");
      })
      .finally(() => setLoading(false));
    } else {
      setAiVerdict(null);
    }
  }, [compareList]);

  if (compareList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 bg-indigo-50 text-indigo-300 rounded-full flex items-center justify-center mb-6">
          <ArrowLeftRight className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Nothing to compare</h2>
        <p className="text-slate-500 mb-8 max-w-md">Add at least 2 products to compare their features and get an AI verdict.</p>
        <Link to="/" className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white font-bold py-3 px-8 rounded-2xl hover:shadow-lg transition-all">
          Browse Products
        </Link>
      </div>
    );
  }

  // Get all unique specs keys across all selected products
  const allSpecsKeys = Array.from(new Set(compareList.flatMap(p => Object.keys(p.specs))));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <ArrowLeftRight className="text-indigo-500 w-8 h-8" />
          Compare Products
        </h1>
        <button 
          onClick={clearCompare}
          className="text-slate-500 hover:text-rose-500 transition-colors flex items-center gap-2 font-medium"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      {compareList.length > 1 && (
        <div className="mb-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <Sparkles className="w-7 h-7 text-indigo-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Nova AI Verdict</h2>
              {loading ? (
                <div className="flex items-center gap-2 text-indigo-200 font-medium">
                  <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                  Analyzing products...
                </div>
              ) : (
                <div className="text-indigo-100 text-lg leading-relaxed prose prose-invert max-w-none">
                  {aiVerdict}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto pb-6">
        <div className="min-w-[800px] grid grid-flow-col auto-cols-fr gap-6">
          {compareList.map(product => (
            <div key={product.id} className="flex flex-col bg-white rounded-3xl border border-slate-100 p-6 shadow-sm relative">
              <button 
                onClick={() => toggleCompare(product)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
              
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-2xl mb-4 bg-slate-50" />
              <div className="text-xs text-indigo-500 font-bold uppercase mb-1">{product.category}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight h-12">{product.name}</h3>
              <div className="text-2xl font-extrabold text-indigo-600 mb-6">
                {formatCurrency(product.price * (1 - product.discount / 100))}
              </div>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-8 hover:-translate-y-0.5"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>

              <div className="space-y-4 flex-1">
                <div className="font-bold text-slate-900 border-b border-slate-100 pb-2">Smart Score</div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="font-bold text-slate-700">{product.smartScore || 'N/A'}/100</span>
                </div>

                {allSpecsKeys.map(key => (
                  <React.Fragment key={key}>
                    <div className="font-bold text-slate-900 border-b border-slate-100 pb-2 mt-4">{key}</div>
                    <div className="text-slate-600 text-sm">{product.specs[key] || '-'}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

          {compareList.length < 3 && (
            <div className="flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-6 min-h-[400px]">
              <div className="text-slate-400 font-medium mb-4">Add another product to compare</div>
              <button 
                onClick={() => navigate('/')}
                className="bg-white text-indigo-600 border border-indigo-100 font-bold py-2 px-6 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Browse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Quick inline X icon since I didn't import it at top
const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
