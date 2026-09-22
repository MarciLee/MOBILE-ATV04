// src/screens/LoginScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    signInWithEmailAndPassword(auth, email.trim(), senha)
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('ListaContatos');
      })
      .catch((error) => {
        let mensagemErro = 'Não foi possível fazer login.';
        
        if (error.code === 'auth/invalid-email') {
          mensagemErro = 'E-mail inválido.';
        } else if (error.code === 'auth/user-not-found') {
          mensagemErro = 'Usuário não encontrado.';
        } else if (error.code === 'auth/wrong-password') {
          mensagemErro = 'Senha incorreta.';
        } else if (error.code === 'auth/invalid-credential') {
          mensagemErro = 'E-mail ou senha inválidos.';
        }
        
        Alert.alert('Erro', mensagemErro);
        console.log('Erro no login:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>👤</Text>
            </View>
            
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>
              Faça login para acessar seus contatos.
            </Text>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={styles.linkText}>
                Não tem uma conta?{' '}
                <Text style={styles.linkBold}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  iconContainer: { alignItems: 'center', marginBottom: 20 },
  iconText: { fontSize: 80 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#222', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#666', marginBottom: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 6, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, backgroundColor: '#f9f9f9', marginBottom: 10 },
  button: { backgroundColor: '#2196F3', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  linkText: { fontSize: 14, color: '#666' },
  linkBold: { color: '#2196F3', fontWeight: 'bold' },
});