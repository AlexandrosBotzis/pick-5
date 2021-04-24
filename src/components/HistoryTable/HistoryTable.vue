<template>
  <v-container class="history-table">
    <v-data-table
      :headers="headers"
      :items="his"
      color="#66BB6A"
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
    <!-- <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="deleteEntry(item.id)">mdi-delete</v-icon>
    </template> -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="toggleDialog()">mdi-delete</v-icon>
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
              @click="deleteEntry(item.id)"
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
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      // his: this.history,
    };
  },
  // props: {
  //   historicalData: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  mounted() {
    this.fetchHistoricalData();
  },
  computed: {
    ...mapState(['history']),
    his() {
      return this.history;
    },
  },
  methods: {
    ...mapActions(['fetchHistoricalData', 'removeEntry']),
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    deleteEntry(item) {
      this.removeEntry(item);
      this.toggleDialog();
    },
  },
};
</script>

<style lang='scss'>
  @import './HistoryTable.scss';
</style>
