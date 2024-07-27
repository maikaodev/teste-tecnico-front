import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import axiosInstance from '../utils/axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | undefined>(undefined);

  const login = async (credentials: { email: string; password: string }) => {
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

      if (response.status === 201) {
        await login({
          email: credentials.email,
          password: credentials.password,
        });
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

    Cookies.remove('authToken');
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

