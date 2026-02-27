import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Importação dos ícones vetoriais

import { RootStackParamList } from '../../Types/Navigation';
import { api } from '../../services/api';
import { Product } from '../../Types/Products';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme';

type ProductModalRouteProp = RouteProp<RootStackParamList, 'ProductModal'>;

export default function ProductModal() {
  const navigation = useNavigation<any>();
  const route = useRoute<ProductModalRouteProp>();
  const { isAuthenticated } = useAuth();

  const productId = route.params?.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (!productId) {
      Alert.alert('Erro de Parâmetro', 'Identificador do produto não localizado.');
      navigation.goBack();
      return;
    }
    
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Erro de requisição GET /products/:id:', error);
      Alert.alert('Erro de Sistema', 'Não foi possível carregar os dados deste item.');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialAdd = () => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    setQuantity(1);
    // TODO: Disparar action (dispatch) para o Contexto Global do Carrinho aqui
  };

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      // TODO: Disparar action de update no Contexto Global
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    let parsedValue = parseInt(numericValue, 10);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    if (product && parsedValue > product.stock) {
      parsedValue = product.stock;
    }

    setQuantity(parsedValue);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image 
          source={{ uri: product.imageUrl }} 
          style={styles.image} 
          resizeMode="contain" 
        />
        
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.stock}>Estoque: {product.stock} un.</Text>
          </View>
          
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formattedPrice}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Especificações Técnicas</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {quantity === 0 ? (
          <Button 
            title="Adicionar ao Carrinho" 
            onPress={handleInitialAdd} 
            variant="primary" 
          />
        ) : (
          <View style={styles.stepperContainer}>
            <TouchableOpacity style={styles.stepperButton} onPress={handleDecrement}>
              <Feather name="minus" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.stepperInput}
              keyboardType="numeric"
              value={String(quantity)}
              onChangeText={handleInputChange}
              maxLength={4} // Previne overflow no buffer de input
            />
            
            <TouchableOpacity 
              style={[styles.stepperButton, quantity >= product.stock && styles.stepperButtonDisabled]} 
              onPress={handleIncrement}
              disabled={quantity >= product.stock}
            >
              <Feather name="plus" size={24} color={quantity >= product.stock ? theme.colors.textSecondary : theme.colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stock: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 30,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 56, // Altura padronizada para hit-slop em mobile
  },
  stepperButton: {
    paddingHorizontal: 24,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperButtonDisabled: {
    opacity: 0.5,
  },
  stepperInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});