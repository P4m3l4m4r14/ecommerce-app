import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';


export function MobileHeader() {
  const insets = useSafeAreaInsets();
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
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="shopping-cart" size={26} color={theme.colors.surface} />
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    height: 40,
    width: 60,
  },
  iconButton: {
    padding: 8,
    marginRight: 0,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginRight: 8,
    fontSize: 16,
  },
});