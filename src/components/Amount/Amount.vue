<template>
  <v-card
    class="amount mr-3"
    id="balanceAmount"
    elevation="12"
    dark width="400"
  >
    <v-card-title>{{ label }}</v-card-title>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Amount',
  computed: {
    ...mapState(['balance']),
    label() {
      return `Total Amount: ${this.balance}`;
    },
  },
};
</script>

<style lang="scss">
  @import './Amount.scss';
</style>
