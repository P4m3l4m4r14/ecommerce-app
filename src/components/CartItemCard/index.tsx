import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CartItem, useCart } from '../../contexts/CartContext';
import { theme } from '../../theme';

interface Props {
  data: CartItem;
}

export function CartItemCard({ data }: Props) {
  const { updateQuantity, removeFromCart } = useCart();

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
  }).format(data.price * data.quantity);

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.imageUrl }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{data.name}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>

        <View style={styles.footer}>
          <View style={styles.stepper}>
            <TouchableOpacity onPress={() => updateQuantity(data.id, data.quantity - 1)}>
              <Feather name="minus-circle" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{data.quantity}</Text>
            
            <TouchableOpacity onPress={() => updateQuantity(data.id, data.quantity + 1)}>
              <Feather name="plus-circle" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => removeFromCart(data.id)}>
            <Feather name="trash-2" size={20} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: { width: 70, height: 70, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500', color: theme.colors.text },
  price: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary, marginVertical: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  quantity: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' }
});