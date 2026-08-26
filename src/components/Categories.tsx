import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Tv, Watch, Gamepad2, Shirt, ShoppingBag } from 'lucide-react';

const categories = [
  { name: 'Mobiles', icon: <Smartphone className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600' },
  { name: 'Laptops', icon: <Laptop className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Electronics', icon: <Tv className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600' },
  { name: 'Gaming', icon: <Gamepad2 className="w-8 h-8" />, color: 'bg-rose-100 text-rose-600' },
  { name: 'Fashion', icon: <Shirt className="w-8 h-8" />, color: 'bg-amber-100 text-amber-600' },
  { name: 'Shoes', icon: <ShoppingBag className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Grocery', icon: <ShoppingCart className="w-8 h-8" />, color: 'bg-lime-100 text-lime-600' },
  { name: 'Accessories', icon: <Watch className="w-8 h-8" />, color: 'bg-cyan-100 text-cyan-600' }
];

// Re-using an icon since ShoppingCart is not imported here but available in lucide
import { ShoppingCart } from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => navigate(`/search?q=${cat.name}`)}
              className="flex flex-col items-center p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group bg-slate-50 hover:bg-white"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="font-semibold text-slate-700 text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
