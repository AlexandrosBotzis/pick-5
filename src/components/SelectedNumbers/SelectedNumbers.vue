<template>
  <div class="selected-numbers">
    <display-card :title="title" height="280" width="680">
      <template>
        <v-col
          v-for="(n, index) in numbers"
          :key="n"
          cols="auto"
        >
          <ball-number
            :label="n"
            @select="remove(n)"
            :isMatching="winingIndexes(index)"
            :isDisabled="isDisabled"
          />
        </v-col>
      </template>
      <template #footer>
        <v-footer
          v-if="$route.path === '/'"
          class="d-flex justify-space-between pb-6"
          color="transparent"
        >
          <v-btn
            width="150"
            @click="clearSelection()"
          >
          <span>Refresh</span>

          <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            :disabled="!maxBetReached"
            width="150"
            color="success"
            @click="redirectTo"
          >
          <span>Submit</span>

          </v-btn>
        </v-footer>
      </template>
    </display-card>
  </div>
</template>

<script>
import BallNumber from '@/components/BallNumber/BallNumber.vue';
import DisplayCard from '@/components/DisplayCard/DisplayCard.vue';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'SelectedNumbers',
  components: {
    BallNumber,
    DisplayCard,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    numbers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(['maxBetReached', 'winIndexes']),
  },
  methods: {
    ...mapActions(['clearBet', 'removeFromBet']),
    clearSelection() {
      this.clearBet();
    },
    remove(number) {
      if (this.$route.path === '/draw') {
        return;
      }
      this.removeFromBet(number);
    },
    redirectTo() {
      this.$router.push({ path: '/draw' });
    },
    winingIndexes(idx) {
      return this.winIndexes.includes(idx);
    },
  },
};
</script>
