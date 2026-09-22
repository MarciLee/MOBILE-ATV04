import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Colar aqui o objeto firebaseConfig com as credenciais do projeto
const firebaseConfig = {
  apiKey: "AIzaSyDmkr765j9VKNB_rDSbw3VlHXSjZIZ0otQ",
  authDomain: "mobile-atv04.firebaseapp.com",
  projectId: "mobile-atv04",
  storageBucket: "mobile-atv04.firebasestorage.app",
  messagingSenderId: "1094925072487",
  appId: "1:1094925072487:web:093b95c3a2a616132ffcc2"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o serviço de autenticação para ser usado nas telas
export const auth = getAuth(app);