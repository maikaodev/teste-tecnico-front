import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Cookies from 'js-cookie';
import axiosInstance from '../utils/axios';

const router = useRouter();

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | undefined>(undefined);
  const username = ref<string | undefined>(
    localStorage.getItem('username') || undefined,
  );

  const login = async (credentials: {
    username?: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post<{ token: string }>(
        '/login',
        credentials,
      );

      if (response.status === 200) {
        token.value = response.data.token;

        Cookies.set('authToken', token.value!, {
          secure: true,
          sameSite: 'Strict',
        });

        return { ok: true };
      }
    } catch (error: any) {
      if (error && error.response.status === 400) {
        return { message: 'Credenciais inválidas' };
      }

      if (error) {
        return {
          message:
            'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
        };
      }
    }
  };

  const register = async (credentials: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post('/register', credentials);

      if (response.status === 200) {
        await login({
          email: credentials.email,
          password: credentials.password,
        });

        username.value = credentials.name;
        localStorage.setItem('username', username.value);

        return { ok: true };
      }
    } catch (error: any) {
      const errorMessage = error.response.data.error;
      const onlyDefinedUsers = 'Note: Only defined users succeed registration';
      const missingPassword = 'Missing password';

      if (
        error &&
        error.response.status === 400 &&
        errorMessage === missingPassword
      ) {
        return { message: 'Necessário preencher o campo senha.' };
      }

      if (
        error &&
        error.response.status === 400 &&
        errorMessage === onlyDefinedUsers
      ) {
        return { message: 'Somente usuários definidos podem se registrar.' };
      }

      if (error) {
        return {
          message:
            'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
        };
      }
    }
  };

  const logout = () => {
    token.value = undefined;
    username.value = undefined;

    Cookies.remove('authToken');
    router.push({ name: 'auth' });
  };

  const isAuthenticated = () => {
    token.value = Cookies.get('authToken');

    return !!token.value;
  };

  return {
    token,
    username,
    login,
    register,
    logout,
    isAuthenticated,
  };
});

