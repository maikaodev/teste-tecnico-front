<template>
  <div class="flex flex-col">
    <section
      class="px-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4"
    >
      <v-container class="mx-0">
        <v-row>
          <v-col class="w-full" cols="12" md="6">
            <v-dialog transition="dialog-bottom-transition" width="auto">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  class=""
                  variant="outlined"
                  width="180"
                  >Novo usuário</v-btn
                >
              </template>

              <template v-slot:default="{ isActive }">
                <v-card class="w-[80vw] gap-4">
                  <v-toolbar
                    class="bg-back-primary text-font-primary"
                    title="Novo usuário"
                  ></v-toolbar>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="newUser.first_name"
                      @input="filterUsers"
                      class="px-4 py-2 rounded focus:outline-0 w-full"
                      placeholder="Primeiro nome do funcionário"
                      type="text"
                      required
                    />
                  </div>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="newUser.last_name"
                      @input="filterUsers"
                      class="px-4 py-2 rounded focus:outline-0 w-full"
                      placeholder="Segundo nome do funcionário"
                      type="text"
                      required
                    />
                  </div>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="newUser.email"
                      @input="filterUsers"
                      class="px-4 py-2 rounded focus:outline-0 w-full"
                      placeholder="E-mail do funcionário"
                      type="email"
                      required
                    />
                  </div>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="newUser.avatar"
                      @input="filterUsers"
                      class="px-4 py-2 rounded focus:outline-0 w-full"
                      placeholder="Endereço de imagem do funcionário"
                      type="text"
                    />
                  </div>

                  <v-card-actions class="justify-end gap-4">
                    <div class="border-2 border-back-secondary rounded">
                      <v-btn
                        class="px-4 text-font-primary"
                        text="Fechar"
                        @click="isActive.value = false"
                      ></v-btn>
                    </div>
                    <div class="bg-back-secondary rounded">
                      <v-btn
                        class="px-4 text-font-secondary"
                        text="Adicionar"
                        @click="
                          () => {
                            createANewUser();
                            isActive.value = false;
                          }
                        "
                        variant="tonal"
                        elevation="2"
                      ></v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>

      <div class="mx-8 border-2 border-black rounded w-80">
        <input
          v-model="searchQuery"
          @input="filterUsers"
          class="px-4 py-2 rounded focus:outline-0 w-full"
          placeholder="Nome do usuário"
          type="text"
        />
      </div>
    </section>

    <section class="mb-4">
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

import defaultImg from '../assets/default_img.jpg';

import { v4 as uuidv4 } from 'uuid';

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

    interface NewUserProps {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    }

    const newUser = ref<NewUserProps>({
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      avatar: defaultImg,
    });

    const createANewUser = () => {
      const cleanFirstName = newUser.value.first_name
        .trim()
        .replace(/\s+/g, ' ');
      const cleanLastName = newUser.value.last_name.trim().replace(/\s+/g, ' ');

      const newUserWithId = {
        ...newUser.value,
        id: uuidv4(),
        first_name: cleanFirstName,
        last_name: cleanLastName,
      };

      users.value.push(newUserWithId);

      const storedUsers = localStorage.getItem('users');
      const localUsers = storedUsers ? JSON.parse(storedUsers) : [];
      localUsers.push(newUserWithId);
      localStorage.setItem('users', JSON.stringify(localUsers));

      fetchAllUsers();
    };

    const fetchUsers = async (page?: string) => {
      const storedUsers = localStorage.getItem('users');
      const localUsers = storedUsers ? JSON.parse(storedUsers) : [];

      const response = await authStore.listOfUsers(page);

      if (response) {
        const apiUsers = response.data;
        users.value = [...localUsers, ...apiUsers];
        totalPages.value = response.total_pages;
      }

      if (searchQuery.value.trim() === '') {
        filteredUsers.value = [...users.value];
        return;
      }
      filterUsers();
    };

    const fetchAllUsers = async () => {
      const storedUsers = localStorage.getItem('users');
      const localUsers = storedUsers ? JSON.parse(storedUsers) : [];

      let allUsersTemp: User[] = [...localUsers];

      for (let i = 1; i <= totalPages.value!; i++) {
        const response = await authStore.listOfUsers(i.toString());
        if (response) {
          allUsersTemp = allUsersTemp.concat(response.data);
        }
      }

      const uniqueUsers = Array.from(
        new Map(allUsersTemp.map((user) => [user.id, user])).values(),
      );

      allUsers.value = uniqueUsers;

      filterUsers();
    };

    const filterUsers = () => {
      const query = searchQuery.value.trim().toLowerCase();
      console.log(`Filtering with query: "${query}"`);

      if (query === '') {
        filteredUsers.value = [...users.value];
        return;
      }

      filteredUsers.value = allUsers.value.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .trim();
        console.log(`Checking user: "${fullName}"`);
        return fullName.includes(query);
      });

      console.log(`Filtered users:`, filteredUsers.value);
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
      newUser,
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

