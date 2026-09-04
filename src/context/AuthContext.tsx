import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../types';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  address?: string;
  phone?: string;
  notifications?: { orderUpdates: boolean; promos: boolean; };
  orders: Order[];
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string) => void; 
  logout: () => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  updateProfilePhoto: (base64String: string) => Promise<void>;
  updateProfile: (details: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const login = (email: string) => {
    setUser({
      id: 'local-user-123',
      name: email.split('@')[0],
      email: email,
      photoURL: '',
      createdAt: Date.now(),
      orders: []
    } as any);
  };

  const logout = async () => {
    setUser(null);
  };

  const addOrder = async (order: Order) => {
    if (user) {
      const orderId = order.id || `ORD-${Math.floor(Math.random() * 1000000)}`;
      const newOrder = { 
        ...order, 
        id: orderId,
        deliveryDate: order.deliveryDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };
      setUser({ ...user, orders: [newOrder, ...user.orders] });
    }
  };

  const updateProfilePhoto = async (base64String: string) => {
    if (user) {
      setUser({ ...user, photoURL: base64String });
    }
  };

  const updateProfile = async (details: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...details });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, addOrder, updateProfilePhoto, updateProfile }}>
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

