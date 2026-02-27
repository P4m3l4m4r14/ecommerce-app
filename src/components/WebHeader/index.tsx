import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from './styles';
import { useCart } from '../../contexts/CartContext';

export function WebHeader() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <View style={styles.headerWrapper}>
        <View style={styles.container}>
        {/* Bloco 1: Logo */}
          <Image 
            source={theme.assets.logo} // Mantém a logo completa na web
            style={styles.logo} 
            resizeMode="contain" 
          />
        {/* Bloco 2: Search Bar (Renderização similar ao referencial) */}
        <View style={styles.searchBox}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Busque aqui seu produto" 
            placeholderTextColor={theme.colors.textSecondary}
          />
          <Feather name="search" size={20} color={theme.colors.primary} />
        </View>
        
        {/* Bloco 3: Ações e Ícones */}
        <View style={styles.navContainer}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate(isAuthenticated ? 'Profile' : 'LoginTab')}
          >
            <Feather name="user" size={24} color={theme.colors.surface} />
            <View style={styles.textWrapper}>
              <Text style={styles.navTextSmall}>olá, faça seu login</Text>
              <Text style={styles.navTextBold}>ou cadastre-se</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
            <Feather name="shopping-cart" size={24} color={theme.colors.surface} />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}