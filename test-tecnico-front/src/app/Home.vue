<template>
  <div
    class="h-screen flex flex-col items-center justify-center bg-slate-300 gap-y-4"
  >
    <Form :settings="formConfig" />

    <v-btn color="blue-grey-lighten-1" @click="toggleEvent">
      <v-icon>{{ iconComputed }}</v-icon>

      <span>{{ textBtnComputed }}</span>
    </v-btn>
  </div>
</template>

<script>
import Form from '../components/Form.vue';

export default {
  name: 'Home',
  components: { Form },
  data() {
    return {
      formConfig: {
        title: 'Login',
        textBtn: 'Entrar',
      },
      textBtn: '',
    };
  },
  computed: {
    textBtnComputed() {
      if (this.formConfig.title === 'Login') {
        return 'Não possui conta? Cadastrar';
      }
      return 'Possui conta? Entrar';
    },
    iconComputed() {
      if (this.formConfig.title === 'Login') {
        return 'mdi-account-plus';
      }
      return 'mdi-login';
    },
  },
  methods: {
    toggleEvent() {
      if (this.formConfig.title === 'Login') {
        this.formConfig.title = 'Cadastrar';
        this.formConfig.textBtn = 'Enviar';

        return;
      }
      this.formConfig.title = 'Login';
      this.formConfig.textBtn = 'Entrar';
    },
  },
};
</script>

