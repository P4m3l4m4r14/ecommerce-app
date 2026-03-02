import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme';
import { styles } from './styles';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !profession.trim()) {
      Alert.alert('Validação Falhou', 'Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validação Falhou', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    const success = await signUp(name, email, password, profession);

    setIsLoading(false);

    if (success) {
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      // Retira a tela de registro da pilha e volta ao estado anterior
      navigation.goBack(); 
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Cadastre-se para realizar pedidos na loja.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Profissão / Área de Atuação</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Engenharia de Computação"
            autoCapitalize="words"
            value={profession}
            onChangeText={setProfession}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Repita sua senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <Text style={styles.submitButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.goBack()}>
          <Text style={styles.loginButtonText}>Já possui conta? Faça Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}