<template>
  <v-container class="history-table">
    <v-data-table
      class="elevation-12 row-pointer"
      :headers="headers"
      :items="historyData"
      @click:row="onSelectRow"
    >
    <template v-slot:item.draw="{ item }">
      <v-chip
        v-for="i in item.draw"
        :key="i"
        color="orange"
      >
        {{ i }}
      </v-chip>
    </template>
    <template v-slot:item.bet="{ item }">
      <v-chip
        v-for="i in item.bet"
        :key="i"
        :color="item.draw.includes(i) ? 'green' : 'red'"
      >
        {{ i }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click.stop="toggleDialog()">
        mdi-delete
      </v-icon>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="500"
      >
      <v-card>
          <v-card-title class="headline">
            Do you really want to delete it?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="toggleDialog()"
            >
              Cancel
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="onDeleteEntry(item.id)"
            >
              Yes, Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HistoryTable',
  data() {
    return {
      headers: [
        { text: 'Draw', value: 'draw', sortable: false },
        { text: 'Bet', value: 'bet', sortable: false },
        { text: 'Status', value: 'result' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date', value: 'createdOn' },
        { text: 'Time', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
    };
  },
  mounted() {
    this.fetchHistoricalData();
  },
  computed: {
    ...mapState(['history']),
    historyData() {
      return this.history;
    },
  },
  methods: {
    ...mapActions(['fetchHistoricalData', 'removeEntry']),
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    onDeleteEntry(item) {
      this.removeEntry(item);
      this.toggleDialog();
    },
    onSelectRow(value) {
      this.$router.push({
        path: '/history/details',
        query: { id: value.internalId },
      });
    },
  },
};
</script>

<style lang="scss">
  @import './HistoryTable.scss';
</style>
