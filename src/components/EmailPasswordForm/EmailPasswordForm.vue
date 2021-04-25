<template>
  <v-container fill-height class="email-password-form">
    <v-layout align-center justify-center>
      <v-card class="elevation-12">
        <v-toolbar class="email-password-form__toolbar" dark>
          <v-toolbar-title>{{ title }} Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="isLoginPage ? loginUser() : registerUser()"
          >
            <v-text-field
              prepend-icon="mdi-account"
              name="email"
              label="Email"
              type="email"
              v-model="email"
              @blur="$v.$touch()"
              required
              :error="$v.email.$anyError"
            />
            <v-text-field
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
              @blur="$v.$touch()"
              required
              :error="$v.password.$anyError"
            />
            <v-card-actions class="email-password-form__actions">
            <v-btn
              class="email-password-form__button"
              width="260"
              color="primary"
              :disabled="$v.$anyError"
              type="submit"
            >
              {{title}}
            </v-btn>
            <span class="email-password-form__divider"> or </span>
            <h3 class="email-password-form__subtitle">{{ subtitle }}</h3>
            <v-btn
              width="260"
              @click="redirectTo()"
            >
              {{ redirectLabel }} Now
            </v-btn>
          </v-card-actions>
        </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'EmailPasswordForm',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    redirectLabel: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      email: '',
      password: undefined,
    };
  },
  validations: {
    email: { required, email },
    password: { required },
  },
  methods: {
    ...mapActions(['register', 'login']),
    redirectTo() {
      this.$router.push({ path: this.isLoginPage ? '/register' : '/login' });
    },
    submit() {
      this.$emit('submit');
    },
    registerUser() {
      this.register({
        email: this.email,
        password: this.password,
      });
    },
    loginUser() {
      this.login({
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    },
  },
};

</script>

<style lang="scss">
@import './EmailPasswordForm.scss';
</style>
