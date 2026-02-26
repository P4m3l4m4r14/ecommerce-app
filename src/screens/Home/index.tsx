// src/screens/Home/index.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { api } from '../../services/api';
import { Product } from '../../Types/Products';
import { RootStackParamList } from '../../Types/Navigation';
import { ProductCard } from '../../components/ProductCard';
import { theme } from '../../theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Falha no consumo da API de Produtos:', error);
    } finally {
      setIsLoading(false); // Remove o bloqueio de renderização independentemente do status HTTP
    }
  };

  // Função de callback para transição de contexto de tela
  const handleNavigateToProduct = (id: string) => {
    navigation.navigate('ProductModal', { productId: id });
  };

  // Renderização condicional de carregamento
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Renderização condicional de array vazio (Empty State)
  if (products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Nenhum produto encontrado no catálogo.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)} // Chave primária obrigatória para o algoritmo de reconciliação
        numColumns={2} // Estrutura em Grid
        columnWrapperStyle={styles.row} // Estilização do escopo da linha do grid
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard 
            data={item} 
            onPress={() => handleNavigateToProduct(item.id)} 
          />
        )}
      />
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
  listContainer: {
    padding: 16,
    paddingBottom: 32, // Offset extra de rolagem para dispositivos sem borda inferior
  },
  row: {
    justifyContent: 'space-between', // Distribui os cartões nas extremidades da linha
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  }
});