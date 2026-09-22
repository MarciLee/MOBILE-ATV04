// src/screens/CadastroScreen.js

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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (!email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    createUserWithEmailAndPassword(auth, email.trim(), senha)
      .then(() => {
        Alert.alert('Sucesso', 'Conta criada com sucesso! Faça login para continuar.');
        navigation.goBack();
      })
      .catch((error) => {
        let mensagemErro = 'Não foi possível criar a conta.';
        
        if (error.code === 'auth/email-already-in-use') {
          mensagemErro = 'Este e-mail já está cadastrado.';
        } else if (error.code === 'auth/invalid-email') {
          mensagemErro = 'E-mail inválido.';
        } else if (error.code === 'auth/weak-password') {
          mensagemErro = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
        }
        
        Alert.alert('Erro', mensagemErro);
        console.log('Erro no cadastro:', error);
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
            
            <Text style={styles.title}>Criar sua conta</Text>
            <Text style={styles.subtitle}>
              Cadastre-se com seu e-mail e senha para começar.
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
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a senha novamente"
              placeholderTextColor="#999"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.linkText}>
                Já tem uma conta?{' '}
                <Text style={styles.linkBold}>Entrar</Text>
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