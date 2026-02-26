import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../../theme';
import { Alert } from 'react-native';
import { api } from '../../services/api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !profession) {
      Alert.alert('Erro de Validação', 'Todos os campos são obrigatórios.');
      return;
    }

    const payload = {
      name,
      email,
      password,
      profession,
    };

    try {
      const response = await api.post('/users', payload);

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada no sistema.');
        // Aqui você pode adicionar a lógica de navegação para redirecionar o usuário para a tela de Login
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível comunicar com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={theme.assets.logo} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={profession}
          onValueChange={(itemValue) => setProfession(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione sua profissão..." value="" enabled={false} />
          <Picker.Item label="Pedreiro" value="Pedreiro" />
          <Picker.Item label="Mestre de Obra" value="Mestre de Obra" />
          <Picker.Item label="Engenheiro" value="Engenheiro" />
          <Picker.Item label="Arquiteto" value="Arquiteto" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: theme.colors.surface,

    overflow: 'hidden', 
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 150 : 50, 
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 0,
  },
  button: {
    height: 50,
    backgroundColor: theme.colors.primary, 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});