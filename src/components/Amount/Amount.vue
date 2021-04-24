<template>
  <v-card dark class="amount" width="400">
    <v-card-title>Total Amount: {{ balance }}</v-card-title>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Amount',
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['balance']),
  },
  methods: {
  },
};
</script>

<style lang="scss">
  @import './Amount.scss';
</style>
