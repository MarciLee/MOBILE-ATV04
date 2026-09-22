// src/screens/EditarContatoScreen.js

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

export default function EditarContatoScreen({ route, navigation }) {
  const { contato } = route.params;

  const [nome, setNome] = useState(contato.nome);
  const [telefone, setTelefone] = useState(contato.telefone);
  const [cidade, setCidade] = useState(contato.cidade || '');
  const [anotacao, setAnotacao] = useState(contato.anotacao || '');

  // Função chamada ao clicar em "Salvar Alterações" (PUT)
  const handleAlterar = async () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Atenção', 'Os campos Nome e Telefone são obrigatórios.');
      return;
    }

    try {
      await api.put(`/contatos/${contato.id}`, {
        nome: nome.trim(),
        telefone: telefone.trim(),
        cidade: cidade.trim(),
        anotacao: anotacao.trim()
      });

      Alert.alert('Sucesso', 'Contato alterado com sucesso!');
      navigation.goBack();

    } catch (error) {
      console.log('Erro ao alterar contato:', error);
      Alert.alert('Erro', `Não foi possível alterar. Detalhes: ${error.message}`);
    }
  };

  // Função chamada ao clicar em "Excluir Contato" (DELETE) - CORRIGIDA
  const handleExcluir = () => {
    Alert.alert(
      'Excluir contato',
      `Tem certeza que deseja excluir "${contato.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => excluirContato()
        }
      ],
      { cancelable: true }
    );
  };

  // Função separada que faz a requisição DELETE - CORRIGIDA
  const excluirContato = async () => {
    try {
      console.log('Excluindo contato ID:', contato.id);
      await api.delete(`/contatos/${contato.id}`);
      Alert.alert('Sucesso', 'Contato excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao excluir contato:', error);
      Alert.alert('Erro', `Não foi possível excluir. Detalhes: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>

          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {nome ? nome.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          </View>

          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do contato"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#999"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#999"
            value={cidade}
            onChangeText={setCidade}
          />

          <Text style={styles.label}>Anotação</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Anotação"
            placeholderTextColor="#999"
            value={anotacao}
            onChangeText={setAnotacao}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.buttonAlterar} onPress={handleAlterar}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonExcluir} onPress={handleExcluir}>
            <Text style={styles.buttonText}>Excluir Contato</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  textArea: { height: 100, paddingTop: 12 },
  buttonAlterar: { backgroundColor: '#2196F3', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonExcluir: { backgroundColor: '#e74c3c', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});