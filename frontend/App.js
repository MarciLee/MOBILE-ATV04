// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das telas
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ListaContatosScreen from './src/screens/ListaContatosScreen';
import CadastroContatoScreen from './src/screens/CadastroContatoScreen';
import EditarContatoScreen from './src/screens/EditarContatoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        {/* Tela de Login - Sem header (tela inicial) */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Tela de Cadastro de Usuário */}
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: 'Criar Conta' }}
        />

        {/* Tela de Lista de Contatos - Configurada na própria tela */}
        <Stack.Screen
          name="ListaContatos"
          component={ListaContatosScreen}
          options={{ title: 'Meus Contatos' }}
        />

        {/* Tela de Cadastro de Contato */}
        <Stack.Screen
          name="CadastroContato"
          component={CadastroContatoScreen}
          options={{ title: 'Novo Contato' }}
        />

        {/* Tela de Edição/Exclusão de Contato */}
        <Stack.Screen
          name="EditarContato"
          component={EditarContatoScreen}
          options={{ title: 'Editar Contato' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}