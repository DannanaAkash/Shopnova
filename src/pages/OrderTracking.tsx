import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Truck, CheckCircle2, Package, ArrowLeft, Clock, Info } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { Order } from '../types';
import DeliveryMap from '../components/DeliveryMap';

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user && id) {
      const foundOrder = user.orders.find(o => o.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [user, id]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Package className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">We couldn't find the tracking details for this order.</p>
        <Link to="/profile" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
          Return to Profile
        </Link>
      </div>
    );
  }

  // Calculate fake progress based on status
  let progressPercentage = 25;
  if (order.status === 'Shipped') progressPercentage = 60;
  if (order.status === 'Delivered') progressPercentage = 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/profile" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            Track Order
            <span className={`text-sm px-3 py-1 rounded-full border font-bold ${
              order.status === 'Delivered' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
              order.status === 'Shipped' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
              'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
            }`}>
              {order.status}
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Order #{order.id} • Placed on {new Date(order.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="text-indigo-500" />
              Delivery Status
            </h2>
          </div>
          
          <div className="p-8">
            {/* Map UI Simulation */}
            <div className="mb-10">
              <DeliveryMap />
            </div>

            {/* Timeline steps */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-slate-300 before:to-slate-300 dark:before:via-slate-700 dark:before:to-slate-700">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">Order Confirmed</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">We received your order.</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${progressPercentage >= 60 ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {progressPercentage >= 60 ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Package className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm opacity-100">
                  <div className="flex flex-col">
                    <span className={`font-bold ${progressPercentage >= 60 ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Order Shipped</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Your item is on the way.</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${progressPercentage === 100 ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {progressPercentage === 100 ? <CheckCircle2 className="w-5 h-5 text-white" /> : <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm">
                  <div className="flex flex-col">
                    <span className={`font-bold ${progressPercentage === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>Delivered</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{order.deliveryDate ? `Expected ${order.deliveryDate}` : 'Pending delivery date'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-500" />
              Order Summary
            </h3>
            
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {formatCurrency((item.price * (1 - item.discount / 100)) * item.quantity)}
                    </p>
                    {order.status === 'Delivered' && (
                      <button className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                        ⭐ Write a Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center font-extrabold text-lg">
                <span className="text-slate-900 dark:text-white">Total</span>
                <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
