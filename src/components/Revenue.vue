<template>
  <div>
    <apexchart
      type="line"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'RevenueChart',
  setup() {
    const chartData = ref<any[]>([]);
    const chartOptions = ref<any>({
      chart: {
        type: 'line',
        height: 350,
      },
      title: {
        text: 'Faturamento por Vendedor',
      },
      xaxis: {
        categories: [], // Anos
        title: {
          text: 'Ano',
        },
      },
      yaxis: {
        title: {
          text: 'Faturamento',
        },
        labels: {
          formatter: (value: number) => `${value / 1000}K`, // Formatação dos valores para milhares
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth', // Curva suave para linhas
      },
      markers: {
        size: 5, // Tamanho dos marcadores
      },
    });

    const fetchData = async () => {
      try {
        // Fetch vendedores
        const vendorsResponse = await axios.get(
          'https://reqres.in/api/users?delay=2',
        );
        const vendors = vendorsResponse.data.data.map((vendor: any) => ({
          id: vendor.id,
          name: `${vendor.first_name} ${vendor.last_name}`,
        }));

        // Fetch faturamento
        const colorsResponsePage1 = await axios.get(
          'https://reqres.in/api/unknown?page=1',
        );
        const colorsResponsePage2 = await axios.get(
          'https://reqres.in/api/unknown?page=2',
        );
        const allColors = [
          ...colorsResponsePage1.data.data,
          ...colorsResponsePage2.data.data,
        ];

        // Mapear valores para faturamento
        const revenueByVendor = vendors.map((vendor) => {
          // Inicializar o objeto de dados com 0s para cada ano
          const dataByYear: Record<number, number> = {};
          allColors.forEach((color) => {
            if (!dataByYear[color.year]) {
              dataByYear[color.year] = 0;
            }
            dataByYear[color.year] +=
              parseFloat(color.pantone_value.replace(/[^0-9]/g, '')) || 0;
          });
          return {
            name: vendor.name,
            data: Object.keys(dataByYear)
              .sort()
              .map((year) => dataByYear[parseInt(year)] || 0),
          };
        });

        // Configurar categorias de anos e dados do gráfico
        const years = Array.from(
          new Set(allColors.map((color) => color.year)),
        ).sort();
        chartOptions.value.xaxis.categories = years;
        chartData.value = revenueByVendor;
      } catch (error) {
        console.error('Error fetching data', error);
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

<style scoped>
/* Estilos específicos do componente */
</style>

