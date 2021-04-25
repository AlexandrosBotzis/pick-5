<template>
  <email-password-form
    title="Register"
    subtitle="Have you already an account?"
    redirectLabel="Login"
  />
</template>

<script>
import EmailPasswordForm from '@/components/EmailPasswordForm/EmailPasswordForm.vue';

export default {
  name: 'Register',
  components: {
    EmailPasswordForm,
  },
};

</script>
