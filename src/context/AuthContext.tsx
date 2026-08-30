import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AuthUser } from 'firebase/auth';
import { auth, db, onAuthStateChanged, doc, getDoc, setDoc, collection, addDoc, getDocs } from '../lib/firebase';
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
  login: (email: string) => void; // Keeping for backward compat, though handled in Login.tsx
  logout: () => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  updateProfilePhoto: (base64String: string) => Promise<void>;
  updateProfile: (details: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          let userData: any = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || '',
            createdAt: Date.now()
          };

          if (userDoc.exists()) {
            userData = { ...userData, ...userDoc.data() };
          } else {
            // Create new profile
            await setDoc(userDocRef, userData);
          }

          // Fetch orders
          const ordersRef = collection(db, 'users', firebaseUser.uid, 'orders');
          const ordersSnap = await getDocs(ordersRef);
          const orders = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
          
          setUser({ ...userData, orders });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string) => {
    // Legacy mock function; actual login happens in Login.tsx via Firebase Auth
  };

  const logout = async () => {
    await auth.signOut();
  };

  const addOrder = async (order: Order) => {
    if (user && auth.currentUser) {
      try {
        const orderData = {
          total: order.total,
          status: order.status,
          date: order.date,
          deliveryDate: order.deliveryDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          items: order.items
        };
        const orderRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'orders'), orderData);
        const newOrder = { ...order, id: orderRef.id };
        setUser({ ...user, orders: [newOrder, ...user.orders] });
      } catch (err) {
        console.error("Failed to add order", err);
      }
    }
  };

  const updateProfilePhoto = async (base64String: string) => {
    if (user && auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, { photoURL: base64String }, { merge: true });
        setUser({ ...user, photoURL: base64String });
      } catch (err) {
        console.error("Failed to update photo", err);
      }
    }
  };

  const updateProfile = async (details: Partial<UserProfile>) => {
    if (user && auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        // Exclude orders array from being written to user doc directly
        const { orders, id, ...updateData } = details;
        await setDoc(userDocRef, updateData, { merge: true });
        setUser({ ...user, ...details });
      } catch (err) {
        console.error("Failed to update profile", err);
      }
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
