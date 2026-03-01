import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';
import { api } from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.get('/users', {
        params: { email, password }
      });

      const users: User[] = response.data;

      if (users.length > 0) {
        setUser(users[0]); 
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Falha na requisição de autenticação:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível contatar o servidor de autenticação.');
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser invocado dentro de um AuthProvider.');
  }
  return context;
}