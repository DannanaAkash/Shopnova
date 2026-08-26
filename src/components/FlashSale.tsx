import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Timer, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });
  const [flashProducts, setFlashProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?limit=4')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        // Boost discount for flash sale items
        const boosted = data.map((p: Product) => ({
          ...p,
          discount: Math.max(p.discount, 45) // At least 45% off
        }));
        setFlashProducts(boosted);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || flashProducts.length === 0) return null;

  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center animate-pulse">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold flex items-center gap-2">
                Flash Sale <Sparkles className="text-yellow-400 w-5 h-5" />
              </h2>
              <p className="text-slate-400">Limited time offers you can't miss!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Hours</div>
            </div>
            <div className="text-2xl font-bold text-red-500 animate-pulse">:</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Mins</div>
            </div>
            <div className="text-2xl font-bold text-red-500 animate-pulse">:</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Secs</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map(product => (
            <div key={product.id} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-[2rem] blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/products" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-bold transition-all">
            View All Offers <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
