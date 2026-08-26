import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, CreditCard, MapPin, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * (1 - item.discount / 100)) * item.quantity, 0);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      if (user) {
        addOrder({
          id: `ORD-${Math.floor(Math.random() * 1000000)}`,
          date: new Date().toISOString(),
          total,
          items: [...cart],
          status: 'Processing'
        });
      }
      clearCart();
    }, 1500);
  };

  if (cart.length === 0 && step !== 3) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Checkout</h1>
      
      {/* Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -z-10 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 -translate-y-1/2 transition-all" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
        
        <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>1</div>
          <span className="text-sm font-semibold">Address</span>
        </div>
        <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>2</div>
          <span className="text-sm font-semibold">Payment</span>
        </div>
        <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>3</div>
          <span className="text-sm font-semibold">Done</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-bold flex items-center gap-2"><MapPin className="text-blue-500" /> Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-xl" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-xl" placeholder="+91 9876543210" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                <textarea className="w-full p-3 border border-slate-200 rounded-xl" placeholder="123 Main St, Apt 4B" rows={3}></textarea>
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              Continue to Payment <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-bold flex items-center gap-2"><CreditCard className="text-blue-500" /> Payment Method</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-blue-200 bg-blue-50/50 rounded-2xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-bold">Credit / Debit Card</div>
                  <div className="text-sm text-slate-500">Pay securely with your card</div>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50">
                <input type="radio" name="payment" className="w-5 h-5" />
                <div>
                  <div className="font-bold">UPI / Wallet</div>
                  <div className="text-sm text-slate-500">Google Pay, PhonePe, Paytm</div>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50">
                <input type="radio" name="payment" className="w-5 h-5" />
                <div>
                  <div className="font-bold">Cash on Delivery</div>
                  <div className="text-sm text-slate-500">Pay when you receive the order</div>
                </div>
              </label>
            </div>

            <div className="border-t border-slate-100 pt-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total to Pay</span>
                <span className="text-2xl font-extrabold text-blue-600">{formatCurrency(total)}</span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-70 transition-all"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Place Order <CheckCircle2 className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 animate-in zoom-in">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Your order has been confirmed. You will receive an email confirmation shortly.</p>
            <button 
              onClick={() => navigate('/profile')}
              className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-colors"
            >
              View My Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
