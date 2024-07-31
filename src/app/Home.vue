<template>
  <div class="flex flex-col">
    <!-- <section
      class="px-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4"
    >
      <v-container class="mx-0">
        <v-row>
          <v-col class="w-full" cols="12" md="6">
            <v-dialog v-model="editDialog" width="auto">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  class=""
                  variant="outlined"
                  width="180"
                  >Novo usuário</v-btn
                >
              </template>

              <template v-slot:default="{}">
                <v-card class="w-[80vw] gap-4">
                  <v-toolbar
                    class="bg-back-primary text-font-primary"
                    title="Editar usuário"
                  ></v-toolbar>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="currentUser?.first_name"
                      class="px-4 py-2 rounded focus:outline-0 w-full"
                      placeholder="Primeiro nome do funcionário"
                      type="text"
                      required
                    />
                  </div>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="currentUser?.last_name"
                      class="px-4 py-2 rounded focus:outline-0 w-full"
                      placeholder="Segundo nome do funcionário"
                      type="text"
                      required
                    />
                  </div>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="currentUser?.email"
                      class="px-4 py-2 rounded focus:outline-0 w-full"
                      placeholder="E-mail do funcionário"
                      type="email"
                      required
                    />
                  </div>

                  <div class="mx-8 border-2 border-black rounded">
                    <input
                      v-model="currentUser?.avatar"
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
                        @click="editDialog = false"
                      ></v-btn>
                    </div>
                    <div class="bg-back-secondary rounded">
                      <v-btn
                        class="px-4 text-font-secondary"
                        text="Salvar"
                        @click="saveUser"
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
    </section> -->

    <section class="mb-4">
      <Card :data="users" />

      <!-- TODO: Adicionar o v-model para controlar as requisicoes e param da page v-model="currentPage" -->
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

import UserController from '../utils/userController';

import Card from '../components/Card.vue';

import defaultImg from '../assets/default_img.jpg';

import { FormattedUser } from '../types';
import { useRoute, useRouter } from 'vue-router';

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
    // const authStore = useAuthStore();
    const users = ref<FormattedUser[]>([]); // const filteredUsers = ref<User[]>([]);
    const totalPages = ref<number | undefined>(0);
    // const allUsers = ref<User[]>([]);
    const currentPage = ref<number>(parseInt(props.page) || 0);
    const router = useRouter();
    const route = useRoute();
    // const searchQuery = ref<string>('');
    // const editDialog = ref<boolean>(false)

    const userControler = new UserController();

    onMounted(async () => {
      await userControler.fetchAllUsers();

      users.value = userControler.paginatedUsers[currentPage.value];

      console.log('users.value (onMounted): ', userControler.paginatedUsers);

      totalPages.value = userControler.total_pages;
    });

    watch(currentPage, async (newPage) => {
      const index = newPage - 1;
      users.value = userControler.paginatedUsers[index];

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

    return { users, totalPages, currentPage };
  },

  methods: {
    paginated() {},
  },
});
</script>

