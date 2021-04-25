<template>
  <email-password-form
    title="Login"
    subtitle="Don't have an account yet ?"
    redirectLabel="Register"
  />
</template>
<script>

import EmailPasswordForm from '@/components/EmailPasswordForm/EmailPasswordForm.vue';

export default {
  name: 'Login',
  components: {
    EmailPasswordForm,
  },
};

</script>

<style>
@import './Login.scss';
</style>
