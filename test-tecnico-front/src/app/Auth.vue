<template>
  <div
    class="h-screen flex flex-col items-center justify-center bg-slate-300 gap-y-4"
  >
    <Form :settings="formConfig" />

    <button
      type="button"
      class="bg-background-primary text-font-primary px-4 py-2"
      @click="toggleEvent"
    >
      {{ textBtnComputed }}
    </button>
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

