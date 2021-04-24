<template>
  <v-card class="history">
    <history-table />
  </v-card>
</template>

<script>
import HistoryTable from '@/components/HistoryTable/HistoryTable.vue';

export default {
  name: 'History',
  components: {
    HistoryTable,
  },
};
</script>

<style lang='scss'>
  @import './History.scss';
  @import '../../styles/_variables';
</style>
