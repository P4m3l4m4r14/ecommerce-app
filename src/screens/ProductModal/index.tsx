import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 

import {styles} from './styles';
import { RootStackParamList } from '../../Types/Navigation';
import { api } from '../../services/api';
import { Product } from '../../Types/Products';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme';
import { useCart } from '../../contexts/CartContext';

type ProductModalRouteProp = RouteProp<RootStackParamList, 'ProductModal'>;

export default function ProductModal() {
  const navigation = useNavigation<any>();
  const route = useRoute<ProductModalRouteProp>();
  const { isAuthenticated } = useAuth();
  const insets = useSafeAreaInsets();

  const { addToCart, updateQuantity, removeFromCart, cart } = useCart();

  const productId = route.params?.productId;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const cartItem = cart.find(item => item.id === productId);
  const [quantity, setQuantity] = useState<number>(cartItem ? cartItem.quantity : 0);

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
    
    if (product) {
      setQuantity(1);
      addToCart(product, 1);
    }
  };

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleDecrement = () => {
    if (product && quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      
      if (newQuantity === 0) {
        removeFromCart(product.id);
      } else {
        updateQuantity(product.id, newQuantity);
      }
    }
  };

  const handleInputChange = (text: string) => {
    if (!product) return;

    const numericValue = text.replace(/[^0-9]/g, '');
    let parsedValue = parseInt(numericValue, 10);

    if (isNaN(parsedValue)) parsedValue = 0;
    if (parsedValue > product.stock) parsedValue = product.stock;

    setQuantity(parsedValue);
    
    if (parsedValue === 0) {
      removeFromCart(product.id);
    } else {
      const exists = cart.some(item => item.id === product.id);
      if (exists) {
        updateQuantity(product.id, parsedValue);
      } else {
        addToCart(product, parsedValue);
      }
    }
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

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
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
              maxLength={4}
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