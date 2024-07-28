<template>
  <div>
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  name: 'RevenueChart',
  setup() {
    const chartData = ref<any[]>([]);
    const chartOptions = ref<any>({
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Faturamento por Valor Pantone',
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Faturamento (em milhares)',
        },
      },
    });

    const authStore = useAuthStore();

    const fetchData = async () => {
      const responsePage1 = await authStore.listOfColors('1');
      const responsePage2 = await authStore.listOfColors('2');

      if (responsePage1 && responsePage2) {
        const allData = [...responsePage1.data, ...responsePage2.data];
        const categories = allData.map((item: any) => item.name);

        // Ajustar o faturamento para milhares
        const data = allData.map((item: any) => ({
          name: `${item.name}`,
          data: [parseFloat(item.pantone_value) * 1000], // Multiplicado por 1000 para exibir em milhares
        }));

        chartOptions.value.xaxis.categories = categories;
        chartData.value = data;
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      chartData,
      chartOptions,
    };
  },
});
</script>

