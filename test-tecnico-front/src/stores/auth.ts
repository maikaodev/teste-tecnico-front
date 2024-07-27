import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const router = useRouter();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post<{ token: string }>('/api/login', credentials);
      token.value = response.data.token;
      Cookies.set('authToken', token.value, { secure: true, sameSite: 'Strict' });
      router.push('/home');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const register = async (credentials: { name: string; email: string; password: string }) => {
    try {
      await axios.post('/api/register', credentials);
      await login({ email: credentials.email, password: credentials.password });
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  const logout = () => {
    token.value = null;
    Cookies.remove('authToken');
    router.push('/');
  };

  const isAuthenticated = () => {
    token.value = Cookies.get('authToken');
    return !!token.value;
  };

  return {
    token,
    login,
    register,
    logout,
    isAuthenticated,
  };
});
