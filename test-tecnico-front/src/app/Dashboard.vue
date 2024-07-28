<template>
  <div>
    <!-- Gráfico de Gênero por Nome -->
    <apexchart
      type="pie"
      height="350"
      :options="genderChartOptions"
      :series="genderChartData"
    ></apexchart>

    <!-- Gráfico de Valores Pantone -->
    <RevenueChart />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';
import RevenueChart from '../components/Revenue.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    apexchart: VueApexCharts,
    RevenueChart,
  },
  setup() {
    interface User {
      id: number;
      name: string;
      year: number;
      color: string;
    }

    const genderChartData = ref<number[]>([]);
    const genderChartOptions = ref({
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Homens', 'Mulheres', 'Indefinido'],
      title: {
        text: 'Distribuição de Gêneros',
        align: 'center',
      },
    });

    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          'https://reqres.in/api/unknown?page=1',
        );
        const response2 = await axios.get(
          'https://reqres.in/api/unknown?page=2',
        );
        const allData = [...response1.data.data, ...response2.data.data];

        await applyGenderChart();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    const applyGenderChart = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?delay=2');
        const genderData = response.data.data.map((user: any) => ({
          name: `${user.first_name} ${user.last_name}`,
        }));

        const genderPromises = genderData.map(async (item) => {
          const genderResponse = await axios.get(
            `https://api.genderize.io?name=${item.name.split(' ')[0]}`,
          );
          return {
            ...item,
            gender: genderResponse.data.gender || 'indefinido',
          };
        });

        const resolvedGenderData = await Promise.all(genderPromises);

        const genderCounts: Record<string, number> = {
          male: 0,
          female: 0,
          indefinido: 0,
        };
        resolvedGenderData.forEach((item) => {
          genderCounts[item.gender] = (genderCounts[item.gender] || 0) + 1;
        });

        genderChartData.value = [
          genderCounts.male,
          genderCounts.female,
          genderCounts.indefinido,
        ];
        genderChartOptions.value.labels = ['Homens', 'Mulheres', 'Indefinido'];
      } catch (error) {
        console.error('Error fetching gender data', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      genderChartData,
      genderChartOptions,
    };
  },
});
</script>

<style>
/* Removido estilo dos filtros */
</style>

