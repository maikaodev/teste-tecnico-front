<template>
  <div
    class="d-flex flex-column items-center justify-center bg-slate-300 w-screen gap-y-4"
  >
    <h1 class="text-3xl font-bold">{{ settings.title }}</h1>
    <v-sheet class="rounded p-2" width="500">
      <v-form @submit.prevent>
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
        ></v-text-field>

        <v-list lines="one" v-show="settings.title === 'Cadastrar'">
          <v-list-item
            v-for="rule in passRules"
            :key="rule"
            :title="'- ' + rule"
          ></v-list-item>
        </v-list>

        <v-btn class="mt-2" type="submit" block @click="validateForm">{{
          settings.textBtn
        }}</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
export default {
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
  data() {
    return {
      email: '',
      password: '',
      passRules: [
        'A senha deve ter pelo menos 8 caracteres',
        'A senha deve conter pelo menos uma letra maiúscula',
        'A senha deve conter pelo menos uma letra minúscula',
        'A senha deve conter pelo menos um número',
      ],
    };
  },
  computed: {
    emailRules() {
      return [
        (value: string) => !!value || 'O campo de e-mail não pode estar vazio',
      ];
    },
    passwordRules() {
      const baseRules = [
        (value: string) => !!value || 'O campo de senha não pode estar vazio',
      ];

      if (this.settings.title === 'Cadastrar') {
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
    },
    passRules() {
      if (this.settings.title !== 'Cadastrar') {
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
        .filter((rule) => !rule.test(this.password))
        .map((rule) => rule.message);
    },
  },
  methods: {
    validateForm() {
      if (this.settings.title === 'Cadastrar') {
        const isEmailValid = this.emailRules.every(
          (rule) => rule(this.email) === true,
        );
        const isPasswordValid = this.passwordRules.every(
          (rule) => rule(this.password) === true,
        );

        if (isEmailValid && isPasswordValid) {
          this.$router.push({ name: 'home' });
        } else {
          // Exiba mensagens de erro se necessário
        }
      } else {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>

