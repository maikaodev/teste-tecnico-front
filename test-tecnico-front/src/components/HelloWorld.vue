<template>
  <v-window v-model="window" show-arrows>
    <v-window-item v-for="n in length" :key="n">
      <v-card class="d-flex justify-center align-center" height="200px">
        <span class="text-h2">Card {{ n }}</span>
      </v-card>
    </v-window-item>
  </v-window>

  <v-container class="text-center mt-10">
    <v-btn color="primary">Vuetify Button</v-btn>
    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
      Tailwind Button
    </button>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    length: 3,
    window: 0,
  }),
};
</script>

