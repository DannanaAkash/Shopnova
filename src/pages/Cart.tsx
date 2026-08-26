import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 bg-indigo-50 text-indigo-300 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added any AI-recommended products to your cart yet.</p>
        <Link to="/" className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white font-bold py-3 px-8 rounded-2xl hover:shadow-lg transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-10">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <Link to={`/product/${item.id}`} className="w-32 h-32 shrink-0 bg-slate-50 rounded-2xl overflow-hidden block">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
              </Link>
              
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">{item.category}</div>
                <Link to={`/product/${item.id}`} className="text-lg font-bold text-slate-900 hover:text-indigo-600 mb-2">
                  {item.name}
                </Link>
                <div className="text-xl font-extrabold text-slate-900 mb-4">
                  {formatCurrency(item.price * (1 - item.discount / 100))}
                </div>
                
                <div className="flex items-center justify-between w-full mt-auto">
                  <div className="flex items-center bg-slate-50 rounded-full border border-slate-200">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium text-slate-900">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-indigo-600">{formatCurrency(total)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
