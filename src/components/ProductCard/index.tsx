import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Product } from '../../Types/Products';
import { theme } from '../../theme';

interface ProductCardProps {
  data: Product;
  onPress: () => void;
}

// Cálculo do viewport para renderização em grid (2 colunas)
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 24; // Subtrai o padding do container

export function ProductCard({ data, onPress }: ProductCardProps) {
  // Formatação do valor numérico para a moeda local (BRL)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(data.price);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image 
        source={{ uri: data.imageUrl }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.category} numberOfLines={1}>{data.category}</Text>
        <Text style={styles.name} numberOfLines={2}>{data.name}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  image: {
    width: '100%',
    height: 120, // Altura estática para consistência do grid
    backgroundColor: '#EEEEEE', // Placeholder color em tempo de carregamento da rede
  },
  infoContainer: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
    minHeight: 40, // Garante alinhamento mesmo com nomes curtos/longos
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
});