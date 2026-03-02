import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { styles } from './styles';
import { theme } from '../../theme';

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  // Alocação de estado para o formulário de endereço
  const [address, setAddress] = useState({ street: '', number: '', zipCode: '' });
  
  // Controle de estado para o método de pagamento
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT_CARD' | 'BOLETO'>('PIX');
  const [isProcessing, setIsProcessing] = useState(false);

  // Cálculo de valor total em tempo de execução
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleProcessOrder = async () => {
    // Validação de client-side para garantir a integridade do payload
    if (!address.street.trim() || !address.number.trim() || !address.zipCode.trim()) {
      Alert.alert('Dados Incompletos', 'Preencha todos os campos do endereço de entrega.');
      return;
    }

    setIsProcessing(true);

    // Estruturação do DTO (Data Transfer Object) do Pedido
    const orderPayload = {
      userId: user?.id,
      items: cart,
      total: totalAmount,
      shippingAddress: address,
      paymentMethod,
      status: 'PROCESSING', // Status inicial do ciclo de vida do pedido
      createdAt: new Date().toISOString(),
    };

    try {
      // Disparo da requisição de mutação (POST)
      const response = await api.post('/orders', orderPayload);

      if (response.status === 201) {
        // Garbage Collection: esvazia o carrinho após sucesso da transação
        clearCart();
        
        Alert.alert(
          'Pedido Confirmado', 
          `Sua compra foi processada com sucesso. ID: ${response.data.id}`,
          [{ text: 'OK', onPress: () => navigation.navigate('MainTabs') }]
        );
      }
    } catch (error) {
      console.error('Falha na transação de Checkout:', error);
      Alert.alert('Erro de Transação', 'Não foi possível processar seu pedido no momento.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Finalizar Compra</Text>

        {/* Seção de Endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
          <TextInput
            style={styles.input}
            placeholder="CEP"
            keyboardType="number-pad"
            value={address.zipCode}
            onChangeText={(text) => setAddress({ ...address, zipCode: text })}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 3, marginRight: 8 }]}
              placeholder="Logradouro (Rua, Av.)"
              value={address.street}
              onChangeText={(text) => setAddress({ ...address, street: text })}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Número"
              keyboardType="number-pad"
              value={address.number}
              onChangeText={(text) => setAddress({ ...address, number: text })}
            />
          </View>
        </View>

        {/* Seção de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pagamento</Text>
          
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'PIX' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('PIX')}
          >
            <Feather name="zap" size={20} color={paymentMethod === 'PIX' ? theme.colors.primary : theme.colors.textSecondary} />
            <Text style={styles.paymentText}>PIX (Aprovação Imediata)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'CREDIT_CARD' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('CREDIT_CARD')}
          >
            <Feather name="credit-card" size={20} color={paymentMethod === 'CREDIT_CARD' ? theme.colors.primary : theme.colors.textSecondary} />
            <Text style={styles.paymentText}>Cartão de Crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'BOLETO' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('BOLETO')}
          >
            <Feather name="file-text" size={20} color={paymentMethod === 'BOLETO' ? theme.colors.primary : theme.colors.textSecondary} />
            <Text style={styles.paymentText}>Boleto Bancário</Text>
          </TouchableOpacity>
        </View>

        {/* Resumo Financeiro */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({cart.length} itens)</Text>
            <Text style={styles.summaryValue}>{formatCurrency(totalAmount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frete</Text>
            <Text style={styles.summaryValue}>Grátis</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotalRow]}>
            <Text style={styles.summaryTotalLabel}>Total a Pagar</Text>
            <Text style={styles.summaryTotalValue}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        {/* Disparo de Transação */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleProcessOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>Confirmar Pedido</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}