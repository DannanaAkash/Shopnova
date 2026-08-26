import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface CompareContextType {
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Product[]>([]);

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert("You can only compare up to 3 products at a time.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
