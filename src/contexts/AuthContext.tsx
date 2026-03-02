import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  profession: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  signUp: (name: string, email: string, password: string, profession: string) => Promise<boolean>;
  
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const STORAGE_USER_KEY = '@BuildStore:user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storagedUser = await AsyncStorage.getItem(STORAGE_USER_KEY);
        
        if (storagedUser) {
          // Desserialização do payload JSON para Objeto em memória RAM
          setUser(JSON.parse(storagedUser));
        }
      } catch (error) {
        console.error('Erro na leitura do AsyncStorage:', error);
      } finally {
        setIsAuthLoading(false); // Libera a UI Thread
      }
    }

    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.get('/users', { params: { email, password } });
      const users: User[] = response.data;

      if (users.length > 0) {
        const loggedUser = users[0];
        setUser(loggedUser);
        
        await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Falha na requisição de autenticação:', error);
      return false;
    }
  };


  const signUp = async (name: string, email: string, password: string, profession: string): Promise<boolean> => {
    try {
      const checkResponse = await api.get('/users', { params: { email } });
      if (checkResponse.data.length > 0) return false;

      // Injeção do novo atributo no payload do POST request
      const payload = { name, email, password, profession };
      const createResponse = await api.post('/users', payload);

      if (createResponse.status === 201) {
        const newUser = createResponse.data;
        setUser(newUser);
        await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  
  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAuthLoading, signIn, signOut, signUp }}>
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