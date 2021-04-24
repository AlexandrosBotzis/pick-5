<template>
  <email-password-form
    title="Register"
    subtitle="Have you already an account?"
    redirectLabel="Login"
    @submit="createAccount()"
    v-model="internalValue"
  />
</template>

<script>
import EmailPasswordForm from '@/components/EmailPasswordForm/EmailPasswordForm.vue';

export default {
  name: 'Register',
  components: {
    EmailPasswordForm,
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  methods: {
    createAccount() {
      // TODO: Display success notification
      console.log('new Account!', this.internalValue);
    },
  },
};

</script>

<style>
@import './Register.scss';
</style>
