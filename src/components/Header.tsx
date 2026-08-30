import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Sparkles, Menu, Camera, Loader2, Music, Volume2, VolumeX } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambient lo-fi background music
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play error", e));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Data = (reader.result as string).split(',')[1];
        const res = await fetch('/api/ai/visual-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data, mimeType: file.type })
        });
        const data = await res.json();
        if (data.query) {
          setSearchQuery(data.query);
          navigate(`/search?q=${encodeURIComponent(data.query)}`);
        }
      } catch (err) {
        console.error("Visual search error", err);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-indigo-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="p-2 bg-gradient-to-br from-red-500 via-yellow-500 to-purple-600 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 hidden sm:block">
              Shopping Zone
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-1 max-w-2xl px-4 lg:px-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative group flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-24 py-3 border border-indigo-100 rounded-2xl leading-5 bg-indigo-50/30 placeholder-indigo-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                  placeholder="Ask AI Assistant to find something... (e.g. Best phone under ₹30,000)"
                />
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div className="absolute inset-y-1 right-1 flex items-center gap-1">
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    title="Search by image"
                    className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                  >
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                  </button>
                  <button type="submit" className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white px-3 py-1.5 rounded-xl text-sm font-medium hover:shadow-md transition-all">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={toggleMusic} 
              title={isPlayingMusic ? "Mute Background Music" : "Play Background Music"}
              className="hidden sm:flex p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50 items-center justify-center relative group"
            >
              {isPlayingMusic ? <Volume2 className="w-6 h-6 text-indigo-500 animate-pulse" /> : <VolumeX className="w-6 h-6" />}
              {isPlayingMusic && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
              )}
            </button>
            <Link to="/wishlist" className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50">
              <Heart className="w-6 h-6" />
            </Link>
            
            <Link to="/cart" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50 relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 p-2 text-slate-700 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50 font-bold">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 flex items-center justify-center text-white text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm hidden sm:block">{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50">
                <User className="w-6 h-6" />
              </Link>
            )}

            <button className="md:hidden p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on mobile */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearch} className="w-full relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-indigo-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-indigo-100 rounded-xl leading-5 bg-indigo-50/30 placeholder-indigo-300 focus:outline-none focus:bg-white focus:border-indigo-500 sm:text-sm"
              placeholder="Search products..."
            />
          </form>
        </div>
      </div>
    </header>
  );
}
