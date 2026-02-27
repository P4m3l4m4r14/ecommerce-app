import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext'; 
import { CartProvider } from './src/contexts/CartContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}