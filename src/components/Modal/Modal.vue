<template>
    <v-dialog v-model="modalOpenedComputed" transition="dialog-top-transition" max-width="600">
    <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >
            Winner winner chicken dinner!!
        </v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Congratulations you earned:, {{ earnedAmount }} </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text
            color="error"
            @click="redirectToMainPage()"
          >
            Close
          </v-btn>
           <v-btn
            text
            color="success"
            @click="saveToHistory(); dialog.value = false"
          >
            Save to History
          </v-btn>
        </v-card-actions>
        </v-card>
    </template>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
  mounted() {
  },
  computed: {
    ...mapState('balance'),
    modalOpenedComputed: {
      get() {
        return this.modalOpened;
      },
    },
  },
  methods: {
    ...mapActions(['saveHistoricalData', 'clearBet', 'clearDraw']),
    redirectToMainPage() {
      this.$router.push({ path: '/' });
      this.clearBet();
      this.clearDraw();
    },
    saveToHistory() {
      this.saveHistoricalData();
      this.redirectToMainPage();
      this.clearBet();
      this.clearDraw();
    },
  },
};
</script>

<style lang="scss">
  @import './Modal.scss';
</style>
