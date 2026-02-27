import axios from 'axios';

export const api = axios.create({
  // Substitua pelo IP da sua máquina se testar no celular
  //baseURL: 'http://localhost:3000', 
  baseURL: 'http://192.168.1.8:3000',
  timeout: 5000,
});