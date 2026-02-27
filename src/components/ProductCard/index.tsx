import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../Types/Products';
import { theme } from '../../theme';

interface ProductCardProps {
  data: Product;
  onPress: () => void;
  cardWidth: number; 
}

export function ProductCard({ data, onPress, cardWidth }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(data.price);

  return (
    <TouchableOpacity 
      // Injeta apenas o width dinâmico. O height crescerá automaticamente (auto) de acordo com o conteúdo
      style={[styles.container, { width: cardWidth }]} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: data.imageUrl }} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{data.name}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 16, 
    lineHeight: 20,
    minHeight: 40, 
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  }
});