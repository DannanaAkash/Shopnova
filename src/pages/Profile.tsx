import React, { useState, useRef, useEffect } from 'react';
import { Package, MapPin, CreditCard, ChevronRight, Settings as SettingsIcon, LogOut, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { playSound } from '../lib/sounds';

export default function Profile() {
  const { user, logout, updateProfilePhoto, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promos, setPromos] = useState(true);
  
  const [saveStatus, setSaveStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAddress(user.address || '');
      setOrderUpdates(user.notifications?.orderUpdates ?? true);
      setPromos(user.notifications?.promos ?? true);
    }
  }, [user]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setSaveStatus('Saving...');
    
    try {
      await updateProfile({
        name,
        address,
        notifications: {
          orderUpdates,
          promos
        }
      });
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Error saving settings.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleLogout = async () => {
    playSound('click');
    await logout();
    navigate('/');
  };

  const handleTabChange = (tab: string) => {
    playSound('click');
    setActiveTab(tab);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      await updateProfilePhoto(base64String);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
            
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl mx-auto overflow-hidden">
                {user.photoURL ? (
                   <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                   user.name.charAt(0).toUpperCase()
                )}
              </div>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 w-8 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                title="Change Photo"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{user.name}</h1>
            <p className="text-slate-500 text-sm font-medium mb-8">{user.email}</p>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Package className="w-5 h-5" /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <SettingsIcon className="w-5 h-5" /> Settings
              </button>
              <div className="h-px w-full bg-slate-100 my-2"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
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
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:border-indigo-200 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                        <Package className="w-6 h-6" />
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">My Orders</h3>
                    <p className="text-slate-500 text-sm mt-1">Track, return, or buy things again</p>
                  </div>
                  {/* Addresses */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:border-indigo-200 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Addresses</h3>
                    <p className="text-slate-500 text-sm mt-1">Edit addresses for orders and gifts</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-slate-50 to-indigo-50 p-6 rounded-3xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h3>
                  {user.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map(order => (
                        <details key={order.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all open:ring-2 open:ring-indigo-500/20">
                          <summary className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 cursor-pointer list-none">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 shrink-0">
                                <Package className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">Order #{order.id.substring(0, 8).toUpperCase()}</div>
                                <div className="text-sm text-slate-500">{new Date(order.date).toLocaleDateString()} &middot; {order.items.length} item(s)</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                              <div className="flex flex-col sm:items-end gap-1">
                                <div className="font-extrabold text-indigo-600">₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                                <div className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full inline-block">
                                  {order.status}
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                            </div>
                          </summary>
                          
                          <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                            {/* Tracking Timeline */}
                            <div className="mb-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-4">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border border-slate-200 bg-white shadow-sm">
                                  <div className="font-bold text-slate-900 text-sm">Order Placed</div>
                                  <div className="text-xs text-slate-500">{new Date(order.date).toLocaleString()}</div>
                                </div>
                              </div>
                              
                              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border border-slate-200 bg-white shadow-sm">
                                  <div className="font-bold text-slate-900 text-sm">Expected Delivery</div>
                                  <div className="text-xs text-blue-600 font-medium">
                                    {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Pending calculation'}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <h4 className="font-bold text-slate-900 mb-3 text-sm">Items in this order</h4>
                            <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-50" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-slate-900 truncate">{item.name}</div>
                                    <div className="text-xs text-slate-500">Qty: {item.quantity} &middot; ₹{(item.price * (1 - item.discount / 100)).toLocaleString('en-IN', { maximumFractionDigits: 2 })} each</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </details>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-500 text-sm p-4 bg-white rounded-2xl border border-slate-100 text-center py-8">
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input 
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 text-slate-500"
                        readOnly
                      />
                      <p className="text-xs text-slate-500 mt-2">Email address cannot be changed.</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Address</label>
                      <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full address for deliveries"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Notification Preferences</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={orderUpdates}
                          onChange={(e) => setOrderUpdates(e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="text-slate-700">Order updates (Email)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={promos}
                          onChange={(e) => setPromos(e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                        />
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
