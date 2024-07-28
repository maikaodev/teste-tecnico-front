<template>
  <div class="bg-white flex flex-col">
    <section
      class="px-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4"
    >
      <div class="mx-8 border-2 border-black rounded">
        <input
          v-model="searchQuery"
          @input="filterUsers"
          class="px-4 py-2 rounded focus:outline-0 w-full"
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

    <section class="bg-white mb-4">
      <Card :data="filteredUsers" />

      <v-pagination
        v-model="currentPage"
        active-color="#7c8071"
        :length="totalPages"
      ></v-pagination>
    </section>
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
  setup(props) {
    const authStore = useAuthStore();
    const users = ref<User[]>([]);
    const filteredUsers = ref<User[]>([]);
    const allUsers = ref<User[]>([]);
    const totalPages = ref<number | undefined>(0);
    const currentPage = ref<number>(parseInt(props.page));
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref<string>('');

    const createANewUser = () => {
      authStore.createAUser();
    };

    const fetchUsers = async (page?: string) => {
      const response = await authStore.listOfUsers(page);

      if (response) {
        users.value = response.data;
        totalPages.value = response.total_pages;
      }

      if (response && searchQuery.value.trim() === '') {
        filteredUsers.value = [...users.value];
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

      filterUsers();
    };

    const filterUsers = () => {
      if (searchQuery.value.trim() === '') {
        filteredUsers.value = [...users.value];
        return;
      }
      filteredUsers.value = allUsers.value.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()),
      );
    };

    onMounted(async () => {
      let pageParam = route.query.page?.toString();

      await fetchUsers();

      if (isNaN(Number(pageParam))) {
        pageParam = '1';
      }

      if (Number(pageParam) > totalPages.value!) {
        pageParam = '1';
      }

      if (pageParam) {
        await fetchUsers(pageParam || currentPage.value.toString());
        await fetchAllUsers();

        currentPage.value = Number(pageParam);

        return;
      }

      router.push({ query: { ...route.query, page: '1' } });
    });

    watch(currentPage, async (newPage) => {
      await fetchUsers(newPage.toString());

      router.push({ query: { ...route.query, page: newPage.toString() } });
    });

    watch(
      () => route.query.page,
      (newPage) => {
        if (newPage) {
          currentPage.value = parseInt(newPage as string);
        }
      },
    );

    watch(searchQuery, filterUsers);

    return {
      users,
      filteredUsers,
      allUsers,
      authStore,
      totalPages,
      currentPage,
      searchQuery,
      createANewUser,
      filterUsers,
    };
  },
});
</script>

