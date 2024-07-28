<template>
  <div class="flex flex-col justify-between">
    <header
      class="flex flex-col items-center md:flex-row md:justify-between border-b-2 drop-shadow-md p-4 mb-4 h-1/3 gap-4"
      :elevation="2"
    >
      <h2 class="text-2xl font-bold">Employee control</h2>
      <div class="self-end">
        <v-avatar
          class="border-2 border-black"
          image="https://avatars.githubusercontent.com/u/82960620?v=4"
          size="60"
        ></v-avatar>
        <v-text class="mx-4 text-lg">{{ username }}</v-text>
        <v-btn icon="mdi-logout" variant="text" @click="logout" />
      </div>
    </header>

    <main class="h-screen flex flex-col">
      <section
        class="px-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div class="w-full mx-8">
          <input
            class="w-full border px-4 py-2 rounded focus:outline-0"
            placeholder="Nome do usuário"
            type="text"
          />
        </div>

        <v-btn
          class="w-1/6"
          variant="outlined"
          width="180"
          @click="creataANewUser"
          >Novo usuário</v-btn
        >
      </section>

      <section class="h-screen flex flex-col justify-around">
        <Card :data="users" />

        <v-pagination :length="totalPages"></v-pagination>
      </section>
    </main>

    <footer class="bg-slate-300 flex flex-col items-center mt-4 fixex">
      <nav
        class="flex items-center justify-center w-screen px-4 border-b border-slate-400"
      >
        <a
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          size="small"
          variant="plain"
          href="https://github.com/maikaodev"
          target="_blank"
        >
          <v-icon>{{ icon }}</v-icon>
        </a>
      </nav>
      <div class="px-4 py-2 text-center w-100">
        Developed by <strong>maikaodev</strong>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';

import Card from '../components/Card.vue';

import { User } from '../types';

export default defineComponent({
  name: 'Home',
  components: { Card },
  data: () => ({
    show: false,
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
  setup() {
    const authStore = useAuthStore();
    const username = authStore.username;
    const users = ref<User[]>([]);
    const totalPages = ref<number | undefined>(0);

    const logout = () => {
      authStore.logout();
    };

    const creataANewUser = () => {
      authStore.createAUser();
    };

    onMounted(async () => {
      const response = await authStore.listOfUsers('1');
      totalPages.value = response?.total_pages;

      if (response) {
        users.value = response.data;
      }
    });

    return {
      username,
      users,
      authStore,
      totalPages,
      logout,
      creataANewUser,
    };
  },
});
</script>

