// src/screens/CadastroContatoScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import api from '../services/api';

export default function CadastroContatoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [anotacao, setAnotacao] = useState('');

  const handleSalvar = async () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Atenção', 'Os campos Nome e Telefone são obrigatórios.');
      return;
    }

    try {
      await api.post('/contatos', {
        nome: nome.trim(),
        telefone: telefone.trim(),
        cidade: cidade.trim(),
        anotacao: anotacao.trim()
      });

      Alert.alert('Sucesso', 'Contato cadastrado com sucesso!');
      navigation.goBack();

    } catch (error) {
      console.log('Erro ao cadastrar contato:', error);
      Alert.alert('Erro', `Não foi possível cadastrar. Detalhes: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: (11) 98765-4321"
            placeholderTextColor="#999"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: São Paulo - SP"
            placeholderTextColor="#999"
            value={cidade}
            onChangeText={setCidade}
          />

          <Text style={styles.label}>Anotação (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Amigo da faculdade"
            placeholderTextColor="#999"
            value={anotacao}
            onChangeText={setAnotacao}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  textArea: { height: 100, paddingTop: 12 },
  button: { backgroundColor: '#2196F3', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});