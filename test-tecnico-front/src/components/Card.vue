<template>
  <ul
    class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto mt-4 gap-4 bg-green-500"
  >
    <li
      v-for="user in data"
      :key="user.id"
      class="bg-random-primary cursor-pointer md:w-80 animate-slide-in-elliptic-left-fwd"
    >
      <div class="w-full h-50">
        <img
          class="text-white bg-cover w-full h-full object-cover"
          :src="user.avatar"
          contain
        />
      </div>

      <div
        class="w-full flex flex-col items-center py-2 border rounded-b-lg shadow-xl shadow-black"
      >
        <span
          class="text-xl font-bold text-font-primary px-1 self-start md:self-center"
        >
          {{ user.first_name }} {{ user.last_name }}
        </span>

        <span class="pt-4 text-font-primary text-sm font-light md:text-lg md">
          {{ user.email }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
});
</script>

