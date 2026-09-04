import React, { useState, useRef, useEffect } from 'react';
import { Package, MapPin, CreditCard, ChevronRight, Settings as SettingsIcon, LogOut, Camera, Loader2, Truck, CheckCircle2 } from 'lucide-react';
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
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        try {
          await updateProfilePhoto(compressedBase64);
        } catch (err) {
          console.error("Error saving photo:", err);
          alert("Failed to save photo. Please try a different image.");
        } finally {
          setIsUploading(false);
        }
      };
      img.src = event.target?.result as string;
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 dark:opacity-40"></div>
            
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-purple-500/20 mx-auto overflow-hidden ring-4 ring-white dark:ring-slate-900">
                {user.photoURL ? (
                   <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                   user.name.charAt(0).toUpperCase()
                )}
              </div>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
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
            
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">{user.email}</p>
            
            <div className="flex flex-col gap-2 relative z-10">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${activeTab === 'orders' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <Package className="w-5 h-5" /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${activeTab === 'settings' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <SettingsIcon className="w-5 h-5" /> Settings
              </button>
              <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-2"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <Package className="w-6 h-6" />
                      </div>
                      <ChevronRight className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">My Orders</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track, return, or buy things again</p>
                  </div>
                  {/* Addresses */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-lg hover:shadow-pink-500/10 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <ChevronRight className="text-slate-300 dark:text-slate-600 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Addresses</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Edit addresses for orders and gifts</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    Order History
                  </h3>
                  {user.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map(order => {
                        const isCompleted = new Date(order.deliveryDate) < new Date();
                        const displayStatus = isCompleted ? 'Completed' : order.status;
                        return (
                        <details key={order.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all open:ring-2 open:ring-indigo-500/30">
                          <summary className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer list-none">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                                <Package className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white">Order #{order.id.substring(0, 8).toUpperCase()}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">{new Date(order.date).toLocaleDateString()} &middot; {order.items.length} item(s)</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                              <div className="flex flex-col sm:items-end gap-1">
                                <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                                <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${
                                  displayStatus === 'Completed' || displayStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                  displayStatus === 'Processing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                }`}>
                                  {displayStatus}
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                            </div>
                          </summary>
                          
                          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            {/* Tracking Timeline */}
                            <div className="mb-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-indigo-200 dark:before:via-indigo-800/50 before:to-transparent">
                              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-4">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                                  <div className="font-bold text-slate-900 dark:text-white text-sm">Order Placed</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">{new Date(order.date).toLocaleString()}</div>
                                </div>
                              </div>
                              
                              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                                  <div className="font-bold text-slate-900 dark:text-white text-sm">Expected Delivery</div>
                                  <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                                    {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Pending calculation'}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Items in this order</h4>
                            <div className="space-y-3 mb-4">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-sm transition-shadow">
                                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-50 dark:bg-slate-900 mix-blend-multiply dark:mix-blend-normal" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Qty: {item.quantity} &middot; ₹{(item.price * (1 - item.discount / 100)).toLocaleString('en-IN', { maximumFractionDigits: 2 })} each</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <button 
                              onClick={() => window.location.href = `/track/${order.id}`}
                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/20"
                            >
                              <Truck className="w-4 h-4" />
                              View Full Tracking Details
                            </button>
                          </div>
                        </details>
                      );
                      })}
                    </div>
                  ) : (
                    <div className="text-slate-500 dark:text-slate-400 text-sm p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center py-8">
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
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    <SettingsIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Account Settings</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your profile details and preferences</p>
                  </div>
                </div>
                
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                      <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                      <input 
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 focus:outline-none transition-all"
                        readOnly
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Email address cannot be changed securely.</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Delivery Address</label>
                      <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full address for deliveries"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-400"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Notification Preferences</label>
                    <div className="space-y-4">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={orderUpdates}
                            onChange={(e) => setOrderUpdates(e.target.checked)}
                            className="peer sr-only" 
                          />
                          <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Order updates via Email</span>
                      </label>
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={promos}
                            onChange={(e) => setPromos(e.target.checked)}
                            className="peer sr-only" 
                          />
                          <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-purple-500 transition-colors"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Promotions and recommendations</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-6 flex items-center justify-between">
                    <button 
                      type="submit"
                      disabled={!!saveStatus}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-2xl transition-all disabled:opacity-50 shadow-md shadow-indigo-500/20"
                    >
                      {saveStatus || 'Save Changes'}
                    </button>
                    {saveStatus === 'Settings saved successfully!' && (
                      <span className="text-green-600 dark:text-emerald-400 font-bold text-sm animate-in fade-in flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        {saveStatus}
                      </span>
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
