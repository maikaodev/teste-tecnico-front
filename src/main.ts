import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router';

import App from './App.vue';

// CSS
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './style.css';
import VueApexCharts from 'vue3-apexcharts';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(vuetify).use(VueApexCharts).mount('#app');

