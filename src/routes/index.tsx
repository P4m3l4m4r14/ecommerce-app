import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../Types/Navigation';
import { theme } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import ProductModal from '../screens/ProductModal';
import LoginScreen from '../screens/Login'; 
import RegisterScreen from '../screens/Register';
import { WebHeader } from '../components/WebHeader';
import { Feather } from '@expo/vector-icons';

// Instanciação dos objetos controladores
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Controlador do escopo das abas inferiores
function TabRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          // Branching de UI: Oculta a barra inferior se o interpretador for um navegador
          display: Platform.OS === 'web' ? 'none' : 'flex',
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,

        // Branching de UI: Substitui o header nativo pela Navbar customizada na web
        header: Platform.OS === 'web' ? () => <WebHeader /> : undefined,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Catálogo' }}/>
      {/* Renderização Condicional da Tab Baseada no Estado */}
      {isAuthenticated ? (
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Meu Perfil' }} 
        />
      ) : (
        <Tab.Screen 
          name="LoginTab" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
      )}
    </Tab.Navigator>
  );
}

export function Routes() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={TabRoutes} options={{ headerShown: false }} />
      
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      
      <Stack.Screen name="ProductModal" component={ProductModal} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}