import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Product } from '../../Types/Products';
import { styles } from './styles';

interface ProductCardProps {
  data: Product;
  onPress: () => void;
  onAddPress: () => void; 
  cardWidth: number; 
}

export function ProductCard({ data, onPress, onAddPress, cardWidth }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(data.price);

  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardWidth }]} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.imageUrl }} style={styles.image} resizeMode="contain" />
        
        {/* Botão flutuante de Quick Add */}
        <TouchableOpacity 
          style={styles.quickAddButton} 
          onPress={onAddPress}
          activeOpacity={0.7}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{data.name}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
}