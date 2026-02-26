import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useAuth } from '../../contexts/AuthContext';

export function WebHeader() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  return (
    <View style={styles.headerWrapper}>
        <View style={styles.container}>
        {/* Bloco 1: Logo */}
        <Image 
          source={theme.assets.logo} 
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

          <TouchableOpacity style={styles.iconButton}>
            <Feather name="shopping-cart" size={24} color={theme.colors.surface} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    headerWrapper: {
    width: '100%',
    backgroundColor: theme.colors.primary, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  container: {
    height: 80,
    width: '100%',
    maxWidth: 1200,
    //backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  logo: {
    height: 50,
    width: 150,
  },
  searchBox: {
    flex: 1, 
    maxWidth: 600,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 32,
    height: 48,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginRight: 8,
    //outlineStyle: 'none',
    fontSize: 16,
    color: theme.colors.text,
},
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  textWrapper: {
    marginLeft: 12,
  },
  navTextSmall: {
    fontSize: 12,
    color: theme.colors.surface,
  },
    navTextBold: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.surface,
    },
    iconButton: {
        padding: 8,
    },
});