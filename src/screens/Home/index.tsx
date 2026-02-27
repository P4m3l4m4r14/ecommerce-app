import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { api } from '../../services/api';
import { Product } from '../../Types/Products';
import { RootStackParamList } from '../../Types/Navigation';
import { ProductCard } from '../../components/ProductCard';
import { theme } from '../../theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const CATEGORIES = ['Todos', 'Ferramentas', 'Básico', 'Hidráulica', 'Elétrica', 'Acabamento'];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { width } = useWindowDimensions();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  // --- Algoritmo de Responsividade (Grid Engine) ---
  const minItemWidth = 240; 
  const containerPadding = 32; 
  const gap = 24;
  
  const maxContentWidth = 1200; 
  
  const effectiveWidth = Math.min(width, maxContentWidth) - containerPadding;
  
  const numColumns = Math.max(2, Math.floor(effectiveWidth / minItemWidth));
  const cardWidth = (effectiveWidth - (gap * (numColumns - 1))) / numColumns;
  // -------------------------------------------------

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setIsLoading(true); // Reinicia o status de loading ao trocar de filtro
    try {
      // Interpolação de string para construir o endpoint dinamicamente
      const endpoint = selectedCategory === 'Todos' 
        ? '/products' 
        : `/products?category=${selectedCategory}`;

      const response = await api.get(endpoint);

      console.log('Payload HTTP GET:', JSON.stringify(response.data, null, 2));

      setProducts(response.data);
    } catch (error) {
      console.error('Falha no consumo da API de Produtos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToProduct = (id: string) => {
    navigation.navigate('ProductModal', { productId: id });
  };

  // Extração da barra de categorias para uma função de renderização local para manter o JSX limpo
  const renderCategoryChips = () => (
    <View style={styles.categoriesWrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          
          return (
            <TouchableOpacity 
              key={category}
              // Aplicação condicional de estilo (Active State)
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Montagem do Header de Filtros */}
      {renderCategoryChips()}

      {/* Renderização Condicional de Estado de Rede */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Nenhum produto encontrado nesta categoria.</Text>
        </View>
      ) : (
        <FlatList
          key={`grid-${numColumns}`} 
          data={products}
          keyExtractor={(item) => String(item.id)}
          numColumns={numColumns}
          columnWrapperStyle={{ gap }} 
          contentContainerStyle={[
            styles.listContainer, 
            { maxWidth: maxContentWidth, alignSelf: 'center', width: '100%' }
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard 
              data={item} 
              onPress={() => handleNavigateToProduct(item.id)}
              cardWidth={cardWidth} // Injeção da largura calculada dinamicamente
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  categoriesWrapper: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    elevation: 2, 
  },
  categoriesContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  }
});