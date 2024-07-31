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
          {{ user.full_name }}
        </span>

        <span class="pt-4 text-font-secondary text-sm md:text-xl">
          {{ user.email }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FormattedUser } from '../types';

export default defineComponent({
  name: 'Card',
  props: {
    data: {
      type: Array as PropType<FormattedUser[]>,
      required: true,
      default: () => [],
    },
  },
});
</script>

