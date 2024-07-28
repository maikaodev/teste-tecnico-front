<template>
  <header
    class="flex flex-col items-center md:flex-row md:justify-between border-b-2 drop-shadow-md p-4 gap-4"
  >
    <h2 class="text-2xl font-bold">Gerenciador de funcionários</h2>
    <div class="w-full flex items-center gap-4">
      <router-link
        class="mr-auto border-2 border-black rounded px-4 py-2 font-bold"
        :to="link"
        >{{ page }}</router-link
      >
      <div class="flex">
        <v-text class="flex items-center mx-4 text-md md:text-xl"
          >Bem-vindo, {{ username }}</v-text
        >
        <v-btn icon="mdi-logout" variant="text" @click="logout" />
      </div>
    </div>
  </header>

  <main>
    <router-view />
  </main>

  <footer class="bg-slate-300 border-t border-slate-400">
    <nav
      class="flex items-center justify-center w-screen px-4 pt-4 border-slate-400"
    >
      <a
        v-for="(icon, index) in icons"
        :key="index"
        class="mx-4"
        size="small"
        variant="plain"
        :href="icon.url"
        target="_blank"
      >
        <v-icon :color="icon.color">{{ icon.name }}</v-icon>
      </a>
    </nav>
    <div class="px-4 py-2 text-center w-100">
      Developed by <strong>maikaodev</strong>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  name: 'LoggedLayout',
  data: () => ({
    show: false,
    icons: [
      {
        name: 'mdi-github',
        url: 'https://github.com/maikaodev',
        color: 'rgb(5,8,12)',
      },
      {
        name: 'mdi-linkedin',
        url: 'https://www.linkedin.com/in/maikaodev/',
        color: 'rgb(41,89,182)',
      },
    ],
  }),
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();

    const username = authStore.username;

    const page = computed(() => {
      return route.name === 'Home' ? 'Dashboard' : 'Home';
    });

    const link = computed(() => {
      return route.name === 'Home' ? { name: 'Dashboard' } : { name: 'Home' };
    });

    const logout = () => {
      authStore.logout();
    };

    return {
      username,
      page,
      link,
      logout,
    };
  },
});
</script>

