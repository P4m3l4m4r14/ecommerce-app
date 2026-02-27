import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Platform, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { theme } from '../../theme';
import  { styles }  from './styles';
import { RootStackParamList } from '../../Types/Navigation';
import { useCart } from '../../contexts/CartContext';

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function MobileHeader() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HeaderNavigationProp>();
 
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const paddingTop = Platform.OS === 'android' ? insets.top + 12 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Linha 1: Marca e Ação Primária */}
      <View style={styles.topRow}>
          <Image
            source={theme.assets.logoSimples} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('Cart')}
        >
          <Feather name="shopping-cart" size={26} color={theme.colors.surface} />
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Linha 2: Input de Busca */}
      <View style={styles.searchBox}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Busque aqui seu produto" 
          placeholderTextColor={theme.colors.textSecondary}
        />
        <Feather name="search" size={20} color={theme.colors.primary} />
      </View>
    </View>
  );
}