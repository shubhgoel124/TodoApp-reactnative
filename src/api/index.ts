import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// In React Native, localhost from Android emulator is 10.0.2.2
const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

const api = axios.create({
  baseURL
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
