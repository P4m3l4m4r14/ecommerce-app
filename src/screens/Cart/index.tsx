import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../../contexts/CartContext';
import { CartItemCard } from '../../components/CartItemCard';
import { styles } from './styles';

export default function CartScreen() {
  const { cart, clearCart } = useCart();
  const insets = useSafeAreaInsets();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
  }).format(total);

  const handleCheckout = () => {
    if (Platform.OS === 'web') {
      const userConfirmed = window.confirm("Deseja finalizar sua compra?");
      if (userConfirmed) {
        clearCart();
        window.alert("Compra finalizada com sucesso!");
      }
    } else {
      Alert.alert(
        "Checkout",
        "Deseja finalizar sua compra?",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Confirmar", 
            onPress: () => {
              clearCart();
              Alert.alert("Sucesso", "Compra finalizada com sucesso!");
            }
          }
        ]
      );
    }
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItemCard data={item} />}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>{formattedTotal}</Text>
        </View>

        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}