import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { X, Sparkles } from 'lucide-react';

export default function CompareBar() {
  const { compareList, toggleCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-indigo-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] p-4 z-40 transform transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pr-24">
        <div className="flex items-center gap-4 overflow-x-auto w-full sm:w-auto">
          <div className="text-sm font-bold text-slate-700 shrink-0">Compare ({compareList.length}/3)</div>
          <div className="flex gap-2">
            {compareList.map(product => (
              <div key={product.id} className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2 pr-8 shrink-0">
                <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded bg-white mix-blend-multiply" />
                <span className="text-xs font-medium text-slate-900 truncate max-w-[100px]">{product.name}</span>
                <button 
                  onClick={() => toggleCompare(product)}
                  className="absolute right-1 top-1 bottom-1 w-6 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => navigate('/compare')}
          disabled={compareList.length < 2}
          className="w-full sm:w-auto shrink-0 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Compare with AI
        </button>
      </div>
    </div>
  );
}
