import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CompareProvider } from './context/CompareContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Compare from './pages/Compare';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import OrderTracking from './pages/OrderTracking';
import NovaAssistant from './components/NovaAssistant';
import CompareBar from './components/CompareBar';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <CompareProvider>
              <Router>
                <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 relative pb-20 transition-colors duration-300">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/products" element={<Search />} />
                      <Route path="/compare" element={<Compare />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/track/:id" element={<OrderTracking />} />
                    </Routes>
                  </main>
                  <CompareBar />
                  <NovaAssistant />
                </div>
              </Router>
            </CompareProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
