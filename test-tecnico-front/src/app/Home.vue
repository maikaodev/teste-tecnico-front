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
            v-model="searchQuery"
            @input="filterUsers"
            class="border px-4 py-2 rounded focus:outline-0"
            placeholder="Nome do usuário"
            type="text"
          />
        </div>

        <v-btn
          class="w-1/6"
          variant="outlined"
          width="180"
          @click="createANewUser"
          >Novo usuário</v-btn
        >
      </section>

      <section class="h-screen flex flex-col justify-around">
        <Card :data="filteredUsers" />

        <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
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
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter, useRoute } from 'vue-router';

import Card from '../components/Card.vue';

import { User } from '../types';

export default defineComponent({
  name: 'Home',
  components: { Card },
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    show: false,
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
  setup(props) {
    const authStore = useAuthStore();
    const username = authStore.username;
    const users = ref<User[]>([]);
    const filteredUsers = ref<User[]>([]);
    const allUsers = ref<User[]>([]);
    const totalPages = ref<number | undefined>(0);
    const currentPage = ref<number>(parseInt(props.page));
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref<string>('');

    const logout = () => {
      authStore.logout();
    };

    const createANewUser = () => {
      authStore.createAUser();
    };

    const fetchUsers = async (page: string) => {
      const response = await authStore.listOfUsers(page);
      if (response) {
        users.value = response.data;
        totalPages.value = response.total_pages;
        if (searchQuery.value.trim() === '') {
          filteredUsers.value = [...users.value];
        }
      }
    };

    const fetchAllUsers = async () => {
      let allUsersTemp: User[] = [];
      for (let i = 1; i <= totalPages.value!; i++) {
        const response = await authStore.listOfUsers(i.toString());
        if (response) {
          allUsersTemp = allUsersTemp.concat(response.data);
        }
      }
      allUsers.value = allUsersTemp;
    };

    const filterUsers = () => {
      if (searchQuery.value.trim() === '') {
        filteredUsers.value = [...users.value];
      } else {
        filteredUsers.value = allUsers.value.filter((user) =>
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()),
        );
      }
    };

    onMounted(async () => {
      await fetchUsers(currentPage.value.toString());
      await fetchAllUsers();
    });

    watch(currentPage, async (newPage) => {
      await fetchUsers(newPage.toString());
      router.push({ query: { ...route.query, page: newPage.toString() } });
    });

    watch(
      () => route.query.page,
      async (newPage) => {
        if (newPage) {
          currentPage.value = parseInt(newPage as string);
          await fetchUsers(currentPage.value.toString());
        }
      },
    );

    watch(users, () => {
      filterUsers();
    });

    return {
      username,
      users,
      filteredUsers,
      allUsers,
      authStore,
      totalPages,
      currentPage,
      searchQuery,
      logout,
      createANewUser,
      filterUsers,
    };
  },
});
</script>

