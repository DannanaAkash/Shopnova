import React, { useState } from 'react';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative z-10">
        <div>
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-yellow-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            {isLogin ? 'Sign in to access your saved items.' : 'Join to get personalized AI recommendations.'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none"
            >
              {isLogin ? 'Sign in' : 'Sign up'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-purple-600 hover:text-purple-500 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
