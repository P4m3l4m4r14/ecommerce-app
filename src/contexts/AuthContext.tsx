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
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const checkResponse = await api.get('/users', { params: { email } });
      
      if (checkResponse.data.length > 0) {
        Alert.alert('Conflito de Dados', 'Este e-mail já está registrado no sistema.');
        return false;
      }

      const payload = { name, email, password };
      const createResponse = await api.post('/users', payload);

      if (createResponse.status === 201) { 
        setUser(createResponse.data); 
        return true;
      }
      return false;
    } catch (error) {
      console.error('Falha na requisição de cadastro:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível contatar o servidor.');
      return false;
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.get('/users', { params: { email, password } });
      
      if (response.data.length > 0) {
        setUser(response.data[0]);
        return true;
      }
      
      Alert.alert('Erro de Autenticação', 'E-mail ou senha incorretos.');
      return false;
    } catch (error) {
      console.error('Falha na requisição de login:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível contatar o servidor.');
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
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