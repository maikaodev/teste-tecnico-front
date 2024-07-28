<template>
  <div class="flex flex-col justify-between">
    <header
      class="flex flex-col items-center md:flex-row md:justify-between border-b-2 drop-shadow-md p-4 mb-4 h-1/3 gap-4"
      :elevation="2"
    >
      <h2 class="text-2xl font-bold">Gerenciamento de funcionários</h2>
      <router-link
        class="mr-auto border-2 border-black rounded px-4 py-2 mx-4 font-bold hover:border-none hover:text-white-500 hover:bg-background-secondary"
        :to="link"
        >{{ page }}</router-link
      >
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

    <router-view />

    <footer
      class="bg-slate-300 flex flex-col items-center mt-4 border-t border-slate-400"
    >
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
  </div>
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

<style scoped>
/* Estilos específicos do componente */
</style>

