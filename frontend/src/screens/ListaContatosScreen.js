// src/screens/ListaContatosScreen.js

import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import api from '../services/api';

export default function ListaContatosScreen({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  // Função que busca os contatos na API (Axios GET)
  const carregarContatos = async () => {
    try {
      const response = await api.get('/contatos');
      setContatos(response.data);
    } catch (error) {
      console.log('Erro ao carregar contatos:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os contatos. Verifique se a API está rodando.'
      );
    } finally {
      setLoading(false);
    }
  };

  // useEffect para carregar os contatos quando a tela é exibida
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarContatos();
    });
    return unsubscribe;
  }, [navigation]);

  // Função de Logout (Firebase)
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => executarLogout()
        }
      ],
      { cancelable: true }
    );
  };

  // Função separada que executa o signOut
  const executarLogout = async () => {
    try {
      console.log('Executando logout...');
      await signOut(auth);
      console.log('Logout realizado com sucesso!');
      navigation.replace('Login');
    } catch (error) {
      console.log('Erro no logout:', error);
      Alert.alert('Erro', `Não foi possível sair. Detalhes: ${error.message}`);
    }
  };

  // useLayoutEffect para configurar os botões no Header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CadastroContato')}
            style={{ marginRight: 15, padding: 5 }}
          >
            <Ionicons name="add-circle-outline" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={{ marginRight: 15, padding: 5 }}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => null
    });
  }, [navigation, handleLogout]);

  // Função que renderiza cada item da lista
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('EditarContato', { contato: item })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.nome ? item.nome.charAt(0).toUpperCase() : '?'}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.nome}</Text>
        <Text style={styles.contactPhone}>{item.telefone}</Text>
        {item.cidade ? (
          <Text style={styles.contactCity}>{item.cidade}</Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  // Filtra os contatos pelo nome ou telefone
  const contatosFiltrados = contatos.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone.includes(busca)
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando contatos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar contato..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {contatosFiltrados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>
            {busca ? 'Nenhum contato encontrado.' : 'Nenhum contato cadastrado.'}
          </Text>
          <Text style={styles.emptySubtext}>
            {busca
              ? 'Tente outro termo de busca.'
              : 'Toque no botão + para adicionar seu primeiro contato.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={contatosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CadastroContato')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 15, marginVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 16, color: '#222' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#666', marginTop: 15 },
  emptySubtext: { fontSize: 14, color: '#999', textAlign: 'center', marginTop: 8 },
  contactItem: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  contactPhone: { fontSize: 14, color: '#555', marginTop: 2 },
  contactCity: { fontSize: 13, color: '#888', marginTop: 1 },
  separator: { height: 1, backgroundColor: '#e0e0e0' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2196F3', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
});