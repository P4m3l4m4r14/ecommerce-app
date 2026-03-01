import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme';
import { api } from '../../services/api';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleRegister = async () => {
    // Validação estrita de escopo (Client-side Validation)
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validação Falhou', 'Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validação Falhou', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    // Disparo da requisição HTTP
    const success = await signUp(name, email, password);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  scrollContent: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 24 ,
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
  subtitle: { 
    fontSize: 16, 
    color: theme.colors.textSecondary, 
    marginBottom: 32 ,
  },
  inputGroup: { marginBottom: 20 },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: theme.colors.text, 
    marginBottom: 8,
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
 submitButton: {
    backgroundColor: theme.colors.primary, 
    padding: 16, 
    borderRadius: 8,
    alignItems: 'center', 
    marginTop: 12,
  },
  submitButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  loginButton: { 
    marginTop: 24, 
    alignItems: 'center' 
  },
  loginButtonText: { 
    color: theme.colors.primary, 
    fontSize: 14, 
    fontWeight: '600' 
  }
});