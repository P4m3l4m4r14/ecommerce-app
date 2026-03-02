import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../Types/Products';

interface FavoritesContextData {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

const STORAGE_FAVORITES_KEY = '@BuildStore:favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const storagedFavorites = await AsyncStorage.getItem(STORAGE_FAVORITES_KEY);
        if (storagedFavorites) {
          setFavorites(JSON.parse(storagedFavorites));
        }
      } catch (error) {
        console.error('Falha na I/O do AsyncStorage (Favoritos):', error);
      } finally {
        setIsHydrated(true);
      }
    }
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    async function syncStorage() {
      await AsyncStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    }
    syncStorage();
  }, [favorites, isHydrated]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);
      if (exists) {
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.id === productId);
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites deve ser invocado dentro de um FavoritesProvider.');
  return context;
}