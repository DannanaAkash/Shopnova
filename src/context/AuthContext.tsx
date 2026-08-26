import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Order } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    setUser({ email, name: email.split('@')[0], orders: [] });
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    if (user) {
      setUser({ ...user, orders: [order, ...user.orders] });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
