<template>
  <ul
    class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mt-4 gap-4 bg-back-primary px-4"
  >
    <li
      v-for="user in data"
      :key="user.id"
      class="cursor-pointer md:w-80 animate-slide-in-elliptic-left-fwd relative"
    >
      <div class="w-full h-50">
        <img
          class="text-white bg-cover w-full h-full object-cover rounded-t-lg"
          :src="user.avatar"
          contain
        />
      </div>

      <div
        class="bg-back-secondary w-full flex flex-col items-center py-2 border rounded-b-lg shadow-xl shadow-black"
      >
        <span
          class="text-lg font-bold text-font-secondary px-1 self-start self-center md:text-2xl truncate text-ellipsis overflow-hidden"
        >
          {{ truncatedName(user.first_name, user.last_name) }}
        </span>

        <span class="pt-4 text-font-secondary text-sm md:text-xl">
          {{ truncatedEmail(user.email) }}
        </span>

        <!-- Dropdown Menu for Edit and Delete -->
        <div class="absolute top-2 right-2">
          <button
            @click="openDropdown(user)"
            class="relative flex items-center justify-center w-8 h-8 text-gray-700 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </svg>
            <!-- Dropdown menu -->
            <div
              v-if="dropdownUser === user"
              class="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded"
            >
              <button
                @click="editUser(user)"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Editar
              </button>
              <button
                @click="confirmDeleteUser(user.id.toString())"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Deletar
              </button>
            </div>
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { User } from '../types';

export default defineComponent({
  name: 'Card',
  props: {
    data: {
      type: Array as PropType<User[]>,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dropdownUser: null as User | null,
    };
  },
  methods: {
    truncatedName(firstName: string, lastName: string): string {
      const fullName = `${firstName} ${lastName}`;
      return fullName.length > 26
        ? fullName.substring(0, 20) + '...'
        : fullName;
    },
    truncatedEmail(email: string): string {
      return email.length > 25 ? email.substring(0, 25) + '...' : email;
    },
    openDropdown(user: User) {
      this.dropdownUser = this.dropdownUser === user ? null : user;
    },
    editUser(user: User) {
      this.$emit('edit-user', user);
    },
    confirmDeleteUser(userId: string) {
      this.$emit('delete-user', userId);
    },
  },
});
</script>

