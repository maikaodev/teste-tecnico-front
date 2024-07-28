import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Cookies from 'js-cookie';
import axiosInstance from '../utils/axios';

import { UserResponse } from '../types';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

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

  const listOfUsers = async (
    pageNumber: string = '1',
  ): Promise<UserResponse | null> => {
    try {
      const response = await axiosInstance.get<UserResponse>(
        `/users?page=${pageNumber}`,
      );
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch users:', error.message);
      return null;
    }
  };

  const createAUser = async () => {
    const data = {
      name: 'Angelo Danrley',
      job: 'Developer',
    };

    try {
      await axiosInstance.post('/users', data);
      console.log('sucesso');
    } catch (error) {
      console.log(error);
    }
    const response = await axiosInstance.get('users?page=2');

    console.log(response);
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
    listOfUsers,
    createAUser,
  };
});

