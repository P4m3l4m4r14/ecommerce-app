import React , { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Alert} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
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
  
  // Extração segura utilizando Optional Chaining
  const productId = route.params?.productId;

  // Gerenciamento de estado local
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Gatilho de ciclo de vida atrelado ao ID do produto
  useEffect(() => {
    // Guard Clause: Interrompe a execução e retorna à tela anterior se o ID for nulo
    if (!productId) {
      Alert.alert('Erro de Parâmetro', 'Identificador do produto não localizado.');
      navigation.goBack();
      return;
    }
    
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      // Endpoint RESTful buscando por ID específico
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Erro de requisição GET /products/:id:', error);
      Alert.alert('Erro de Sistema', 'Não foi possível carregar os dados deste item.');
      navigation.goBack(); // Executa o pop na stack de navegação em caso de falha
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Middleware de autenticação
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    
    // Futura integração com o Context/Redux do Carrinho
    Alert.alert('Sucesso', 'Produto alocado no carrinho de compras.');
  };

  // Renderização de estado de transição (Loading)
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Fallback de segurança caso a API retorne vazio
  if (!product) return null;

  // Data Formatting
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
        <Button 
          title="Adicionar ao Carrinho" 
          onPress={handleAddToCart} 
          variant="primary" 
        />
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
  },
});