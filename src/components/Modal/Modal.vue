<template>
  <v-dialog
    class="modal"
    v-model="modalOpenedComputed"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card class="modal__content">
      <v-toolbar
        class="modal__toolbar"
        color="yellow"
        dark
      >
        <v-toolbar-title class="flex text-center">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div class="text-h5 pt-10">
          {{ message }}
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text color="error" @click="redirectToMainPage()">
          Close
        </v-btn>
        <v-btn text color="success" @click="saveToHistory()">
          {{ buttonLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const successAmount = 5;

export default {
  name: 'Modal',
  components: {
  },
  data() {
    return {
      earnedAmount: this.balance,
    };
  },
  props: {
    modalOpened: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['balance']),
    modalOpenedComputed: {
      get() {
        return this.modalOpened;
      },
    },
    hasEarnings() {
      return this.balance >= successAmount;
    },
    title() {
      return this.hasEarnings
        ? 'Winner winner chicken dinner!!'
        : 'Wish you luck in the next round';
    },
    message() {
      return this.hasEarnings
        ? `Congratulations!! You have won ${this.balance} €`
        : 'Time for another round?';
    },
    buttonLabel() {
      return this.hasEarnings
        ? 'Save Result'
        : 'Save Result & Retry';
    },
  },
  methods: {
    ...mapActions(['saveHistoricalData', 'clearBet', 'clearDraw', 'clearHistory']),
    redirectToMainPage() {
      this.$router.push({ path: '/' });
      this.clearBet();
      this.clearDraw();
      this.clearHistory();
    },
    saveToHistory() {
      this.saveHistoricalData();
      this.redirectToMainPage();
    },
  },
};
</script>

<style lang="scss">
  @import './Modal.scss';
</style>
