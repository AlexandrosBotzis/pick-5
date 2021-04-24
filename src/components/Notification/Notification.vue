<template>
    <v-snackbar v-model="snackbar">
      {{ errorMessage }}
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapState(['error']),
    snackbar: {
      get() {
        return this.error;
      },
    },
    errorMessage() {
      return this.error;
    },
  },
};
</script>
