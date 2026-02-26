import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../Types/Navigation';
import { Button } from '../../components/Button';

export default function ProductModal() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }
    console.log('Rotina de adição ao carrinho executada. Usuário autenticado.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhamento do Produto</Text>
      <Button 
        title="Adicionar ao Carrinho"
        onPress={handleAddToCart}
        variant='primary'// Tente alterar para "secondary" para ver a mudança de estado
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
  },
});