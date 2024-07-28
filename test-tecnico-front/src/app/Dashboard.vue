<template>
  <div>
    <!-- Filtros -->
    <div class="filters">
      <select v-model="selectedYear" @change="applyFilters">
        <option value="">Todos os Anos</option>
        <option v-for="year in uniqueYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <input
        type="text"
        v-model="nameFilter"
        @input="applyFilters"
        placeholder="Filtrar por nome"
      />
    </div>

    <!-- Gráfico de Usuários -->
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>

    <!-- Gráfico de Gênero por Nome -->
    <apexchart
      type="pie"
      height="350"
      :options="genderChartOptions"
      :series="genderChartData"
    ></apexchart>

    <!-- Gráfico de Valores Pantone -->
    <apexchart
      type="bar"
      height="350"
      :options="pantoneChartOptions"
      :series="pantoneChartData"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  name: 'Dashboard',
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    interface User {
      id: number;
      name: string;
      year: number;
      color: string;
      pantone_value: string;
    }

    interface GenderData {
      name: string;
      gender: string;
    }

    const chartData = ref<{ name: string; data: number[] }[]>([
      { name: 'Usuários', data: [] },
    ]);
    const chartOptions = ref({
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: [] as string[],
      },
      title: {
        text: 'Dados dos Usuários',
        align: 'center',
      },
    });

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

    const pantoneChartData = ref<{ name: string; data: number[] }[]>([
      { name: 'Valores Pantone', data: [] },
    ]);
    const pantoneChartOptions = ref({
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: [] as string[],
      },
      title: {
        text: 'Valores Pantone',
        align: 'center',
      },
    });

    const allData = ref<User[]>([]);
    const selectedYear = ref<string>('');
    const nameFilter = ref<string>('');
    const uniqueYears = ref<number[]>([]);

    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          'https://reqres.in/api/unknown?page=1',
        );
        const response2 = await axios.get(
          'https://reqres.in/api/unknown?page=2',
        );
        allData.value = [...response1.data.data, ...response2.data.data];

        uniqueYears.value = Array.from(
          new Set(allData.value.map((item) => item.year)),
        );

        applyFilters();
        await applyGenderChart();
        applyPantoneChart();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    const applyFilters = () => {
      let filteredData = allData.value;

      if (selectedYear.value) {
        filteredData = filteredData.filter(
          (item) => item.year.toString() === selectedYear.value,
        );
      }

      if (nameFilter.value) {
        filteredData = filteredData.filter((item) =>
          item.name.toLowerCase().includes(nameFilter.value.toLowerCase()),
        );
      }

      chartData.value[0].data = filteredData.map((item) => item.year);
      chartOptions.value.xaxis.categories = filteredData.map(
        (item) => item.name,
      );
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

    const applyPantoneChart = () => {
      pantoneChartData.value[0].data = allData.value.map((item) =>
        parseInt(item.pantone_value.split('-')[0]),
      );
      pantoneChartOptions.value.xaxis.categories = allData.value.map(
        (item) => item.name,
      );
    };

    onMounted(() => {
      fetchData();
    });

    watch(selectedYear, applyFilters);
    watch(nameFilter, applyFilters);

    return {
      chartData,
      chartOptions,
      genderChartData,
      genderChartOptions,
      pantoneChartData,
      pantoneChartOptions,
      selectedYear,
      nameFilter,
      uniqueYears,
      applyFilters,
    };
  },
});
</script>

<style>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>

