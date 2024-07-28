<template>
  <h1>DASHBOARD</h1>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter, useRoute } from 'vue-router';

import Card from '../components/Card.vue';

import { User } from '../types';

export default defineComponent({
  name: 'Dashboard',
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

