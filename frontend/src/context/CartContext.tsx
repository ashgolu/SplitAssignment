'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
  _id: string;
  name: string;
  price: number;
};

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const clearCart = () => {
  setCart([]);
};

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>

      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
