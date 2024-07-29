<template>
  <div
    class="w-80 d-flex flex-column items-center justify-center bg-slate-300 gap-y-4"
  >
    <h1 class="text-3xl font-bold">{{ settings.title }}</h1>
    <section
      class="w-full rounded p-2 bg-white border border-background-secondary"
      width="500"
    >
      <v-form @submit.prevent="validateForm">
        <v-text-field
          v-show="settings.title === 'Cadastrar'"
          v-model="username"
          :rules="usernameRules"
          label="Nome de usuário"
          type="text"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Senha"
          type="password"
        ></v-text-field>

        <v-list lines="one" v-show="settings.title === 'Cadastrar'">
          <v-list-item
            v-for="rule in passRules"
            :key="rule"
            :title="'- ' + rule"
          ></v-list-item>
        </v-list>

        <button
          class="w-full bg-back-secondary text-font-secondary text-xl px-4 py-2 mt-4 rounded"
          type="submit"
        >
          {{ settings.textBtn }}
        </button>
      </v-form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  name: 'Form',
  props: {
    settings: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        textBtn: '',
      }),
    },
  },
  setup(props) {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const usernameRules = computed(() => [
      (value: string) =>
        !!value || 'O campo de nome de usuário não pode estar vazio',
    ]);

    const emailRules = computed(() => [
      (value: string) => !!value || 'O campo de e-mail não pode estar vazio',
    ]);

    const passwordRules = computed(() => {
      const baseRules = [
        (value: string) => !!value || 'O campo de senha não pode estar vazio',
      ];

      if (props.settings.title === 'Cadastrar') {
        return [
          ...baseRules,
          (value: string) =>
            value.length >= 8 || 'A senha deve ter pelo menos 8 caracteres',
          (value: string) =>
            /[A-Z]/.test(value) ||
            'A senha deve conter pelo menos uma letra maiúscula',
          (value: string) =>
            /[a-z]/.test(value) ||
            'A senha deve conter pelo menos uma letra minúscula',
          (value: string) =>
            /\d/.test(value) || 'A senha deve conter pelo menos um número',
        ];
      }

      return baseRules;
    });

    const passRules = computed(() => {
      if (props.settings.title !== 'Cadastrar') {
        return [];
      }

      const rules = [
        {
          test: (value: string) => value.length >= 8,
          message: 'A senha deve ter pelo menos 8 caracteres',
        },
        {
          test: (value: string) => /[A-Z]/.test(value),
          message: 'A senha deve conter pelo menos uma letra maiúscula',
        },
        {
          test: (value: string) => /[a-z]/.test(value),
          message: 'A senha deve conter pelo menos uma letra minúscula',
        },
        {
          test: (value: string) => /\d/.test(value),
          message: 'A senha deve conter pelo menos um número',
        },
      ];

      return rules
        .filter((rule) => !rule.test(password.value))
        .map((rule) => rule.message);
    });

    const validateForm = async () => {
      const isUsernameValid = usernameRules.value.every(
        (rule) => rule(username.value) === true,
      );

      const isEmailValid = emailRules.value.every(
        (rule) => rule(email.value) === true,
      );

      const isPasswordValid = passwordRules.value.every(
        (rule) => rule(password.value) === true,
      );

      const toRegister = props.settings.title === 'Cadastrar';
      const toLogin = props.settings.title === 'Login';

      const credentials = isEmailValid && isPasswordValid;
      let response;

      if (toRegister && username && credentials) {
        response = await authStore.register({
          name: username.value,
          email: email.value,
          password: password.value,
        });
      }

      if (toLogin && credentials) {
        response = await authStore.login({
          email: email.value,
          password: password.value,
        });
      }

      if (response.ok) {
        router.push({ name: 'Home' });

        return;
      }

      // TODO: Mostrar mensagem toast
      alert(response.message);
    };

    return {
      username,
      email,
      password,
      usernameRules,
      emailRules,
      passwordRules,
      passRules,
      validateForm,
    };
  },
});
</script>

