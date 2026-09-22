import axios from 'axios';

// ATENÇÃO: Substitua o IP abaixo pelo "Endereço IPv4" no ipconfig
// Mantenha o ":3000" que é a porta onde o json-server está rodando
const api = axios.create({
  baseURL: 'http://localhost:3000' 
});

export default api;