import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext'; 
import { CartProvider } from './src/contexts/CartContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}