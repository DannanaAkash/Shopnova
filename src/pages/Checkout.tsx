import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, CreditCard, MapPin, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { playSound } from '../lib/sounds';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user, addOrder, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const total = cart.reduce((sum, item) => sum + (item.price * (1 - item.discount / 100)) * item.quantity, 0);

  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
      const deliveryIso = estimatedDelivery.toISOString();
      setDeliveryDate(estimatedDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
      
      const newOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      setOrderId(newOrderId);
      
      if (user) {
        await addOrder({
          id: newOrderId,
          date: new Date().toISOString(),
          deliveryDate: deliveryIso,
          total,
          items: [...cart],
          status: 'Processing'
        });
      }
      
      clearCart();
      setLoading(false);
      setStep(3);
      playSound('payment');
    } catch (err) {
      console.error("Failed to place order", err);
      setLoading(false);
      alert("Failed to place order. Please try again.");
    }
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

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><MapPin className="text-blue-500" /> Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input type="text" defaultValue={user?.name} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                  <input type="text" defaultValue={user?.phone || ''} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" placeholder="+91 9876543210" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Address</label>
                  <textarea defaultValue={user?.address || ''} className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white" placeholder="123 Main St, Apt 4B" rows={3}></textarea>
                </div>
              </div>
              <button 
                onClick={() => { playSound('click'); setStep(2); }}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                Continue to Payment <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white"><CreditCard className="text-purple-500" /> Payment Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col items-center gap-3 p-5 border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-2xl cursor-pointer relative overflow-hidden transition-all shadow-md shadow-purple-100 dark:shadow-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10"></div>
                <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-purple-600 absolute top-4 right-4 z-10" onChange={() => playSound('click')} />
                <CreditCard className="w-8 h-8 text-purple-600 dark:text-purple-400 relative z-10" />
                <div className="text-center relative z-10">
                  <div className="font-bold text-purple-900 dark:text-purple-100">Credit / Debit</div>
                  <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">Visa, Mastercard</div>
                </div>
              </label>

              <label className="flex flex-col items-center gap-3 p-5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                <input type="radio" name="payment" className="w-5 h-5 absolute top-4 right-4 opacity-50" onChange={() => playSound('click')} />
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">U</div>
                <div className="text-center">
                  <div className="font-bold text-slate-800 dark:text-white">UPI / Wallet</div>
                  <div className="text-xs text-slate-500 mt-1">GPay, PhonePe</div>
                </div>
              </label>

              <label className="flex flex-col items-center gap-3 p-5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
                <input type="radio" name="payment" className="w-5 h-5 absolute top-4 right-4 opacity-50" onChange={() => playSound('click')} />
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">₹</div>
                <div className="text-center">
                  <div className="font-bold text-slate-800 dark:text-white">Cash on Delivery</div>
                  <div className="text-xs text-slate-500 mt-1">Pay at doorstep</div>
                </div>
              </label>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
               <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Card Number</label>
                  <input type="text" className="w-full p-3 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-slate-500" placeholder="0000 0000 0000 0000" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Expiry Date</label>
                    <input type="text" className="w-full p-3 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder-slate-500" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">CVV</label>
                    <input type="password" maxLength={3} className="w-full p-3 border border-slate-700 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder-slate-500" placeholder="•••" />
                  </div>
               </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-slate-800 dark:text-white">Total to Pay</span>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{formatCurrency(total)}</span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-70 transition-all"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Complete Payment <CheckCircle2 className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 animate-in zoom-in">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-50 dark:border-green-900/10">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Payment Successful!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">Your order has been confirmed and is now being processed. You will receive an email confirmation shortly.</p>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-3xl p-6 mb-8 text-indigo-800 dark:text-indigo-300 flex items-center justify-center gap-4 max-w-md mx-auto shadow-sm">
              <MapPin className="w-8 h-8 text-indigo-500" />
              <div className="text-left">
                <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">Estimated Delivery</div>
                <div className="text-xl font-extrabold">{deliveryDate}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button 
                onClick={() => navigate(`/track/${orderId}`)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-lg transition-all shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Track Order Route
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-4 px-8 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
        </div>
        
        {step !== 3 && (
          <div className="w-full lg:w-96 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-slate-100 dark:border-slate-800" />
                    <div>
                      <h4 className="font-bold text-sm dark:text-white line-clamp-1">{item.name}</h4>
                      <div className="text-slate-500 text-sm">Qty: {item.quantity}</div>
                      <div className="font-bold text-blue-600">{formatCurrency((item.price * (1 - item.discount / 100)) * item.quantity)}</div>
                    </div>
                  </div>
              ))}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-center font-bold text-lg dark:text-white">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
