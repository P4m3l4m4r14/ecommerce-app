import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../Types/Products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const STORAGE_CART_KEY = '@BuildStore:cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartHydrated, setIsCartHydrated] = useState(false);

  useEffect(() => {
    async function loadCartData() {
      try {
        const storagedCart = await AsyncStorage.getItem(STORAGE_CART_KEY);
        if (storagedCart) {
          setCart(JSON.parse(storagedCart));
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      } finally {
        setIsCartHydrated(true);
      }
    }

    loadCartData();
  }, []);

  useEffect(() => {
    if (!isCartHydrated) return;
    async function syncStorage() {
      await AsyncStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    }
    syncStorage();
  }, [cart, isCartHydrated]);


  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === product.id);
      
      if (itemIndex >= 0) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider.');
  }
  return context;
}