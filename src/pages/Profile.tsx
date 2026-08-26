import React, { useState } from 'react';
import { Package, MapPin, CreditCard, ChevronRight, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold">Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500 text-sm mb-6">{user.email}</p>
            
            <button 
              onClick={logout}
              className="w-full py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`text-lg font-extrabold pb-2 transition-colors relative ${activeTab === 'orders' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              My Account
              {activeTab === 'orders' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></motion.div>}
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`text-lg font-extrabold pb-2 transition-colors relative ${activeTab === 'settings' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Settings
              {activeTab === 'settings' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></motion.div>}
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'orders' ? (
              <motion.div 
                key="orders-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Orders */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:border-blue-200 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                        <Package className="w-6 h-6" />
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">My Orders</h3>
                    <p className="text-slate-500 text-sm mt-1">Track, return, or buy things again</p>
                  </div>

                  {/* Addresses */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:border-green-200 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-green-500 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Addresses</h3>
                    <p className="text-slate-500 text-sm mt-1">Edit addresses for orders and gifts</p>
                  </div>

                  {/* Payments */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:border-yellow-200 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-yellow-500 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Payment Options</h3>
                    <p className="text-slate-500 text-sm mt-1">Edit or add payment methods</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-slate-50 to-indigo-50 p-6 rounded-3xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h3>
                  {user.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map(order => (
                        <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div>
                            <div className="font-bold text-slate-900">{order.id}</div>
                            <div className="text-sm text-slate-500">{new Date(order.date).toLocaleDateString()} &middot; {order.items.length} item(s)</div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-1">
                            <div className="font-extrabold text-indigo-600">₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                            <div className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full inline-block">
                              {order.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-500 text-sm p-4 bg-white rounded-2xl border border-slate-100">
                      You haven't placed any orders yet. Start shopping!
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="settings-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                    <SettingsIcon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
                </div>
                
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user.name} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user.email} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50"
                        readOnly
                      />
                      <p className="text-xs text-slate-500 mt-2">Email address cannot be changed.</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Notification Preferences</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-slate-700">Order updates (Email)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-slate-700">Promotions and recommendations (Email)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button 
                      type="submit"
                      disabled={!!saveStatus}
                      className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    >
                      {saveStatus || 'Save Changes'}
                    </button>
                    {saveStatus === 'Settings saved successfully!' && (
                      <span className="text-green-600 font-medium text-sm animate-in fade-in">{saveStatus}</span>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
