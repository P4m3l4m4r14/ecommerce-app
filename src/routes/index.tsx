import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { RootStackParamList } from '../Types/Navigation';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import ProductModal from '../screens/ProductModal';
import LoginScreen from '../screens/Login'; 
import RegisterScreen from '../screens/Register';
import { WebHeader } from '../components/WebHeader';
import { MobileHeader } from '../components/MobileHeader';
import CartScreen from '../screens/Cart';

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

// Controlador do escopo das abas inferiores
function TabRoutes() {
  const { isAuthenticated } = useAuth();
  const insets = useSafeAreaInsets();

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
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom + 8, 
          paddingTop: 8,
          height: 60 + insets.bottom,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,

       header: () => Platform.OS === 'web' ? <WebHeader /> : <MobileHeader />,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Catálogo',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          )
        }}
      />
      {/* Renderização Condicional da Tab Baseada no Estado */}
      {isAuthenticated ? (
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Meu Perfil',
            tabBarIcon: ({ color, size }) => (
              <Feather name="user-check" size={size} color={color} />
            )
          }}
        />
      ) : (
        <Tab.Screen 
          name="LoginTab" 
          component={LoginScreen} 
          options={{ 
            title: 'Login',
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            )
          }} 
        />
      )}
    </Tab.Navigator>
  );
}

export function Routes() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={TabRoutes} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductModal" component={ProductModal} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
     {/* <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />*/}
    </Stack.Navigator>
  );
}