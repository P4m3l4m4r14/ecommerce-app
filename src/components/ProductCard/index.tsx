import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Product } from '../../Types/Products';
import { styles } from './styles';
import { theme } from '../../theme';

interface ProductCardProps {
  data: Product;
  onPress: () => void;
  onAddPress: () => void; 
  cardWidth: number; 
}

export function ProductCard({ data, onPress, onAddPress, cardWidth }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(data.id);

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

        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => toggleFavorite(data)}
          activeOpacity={0.7}
        >
          <FontAwesome 
            name={favorite ? "heart" : "heart-o"} 
            size={20} 
            color={favorite ? "#FF3B30" : theme.colors.textSecondary} 
          />
        </TouchableOpacity>
        
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