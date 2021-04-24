<template>
  <div class="number-grid">
    <display-card
      title="Select 5 numbers"
      height="700"
      width="843"
    >
      <template>
        <v-col
          v-for="n in 30"
          :key="n"
          cols="auto"
        >
          <ball-number :label="n" @select="select(n)" :isDisabled="locked"/>
        </v-col>
      </template>
    </display-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BallNumber from '@/components/BallNumber/BallNumber.vue';
import DisplayCard from '@/components/DisplayCard/DisplayCard.vue';

export default {
  name: 'NumberGrid',
  components: {
    BallNumber,
    DisplayCard,
  },
  data() {
    return {
      selectedNumber: undefined,
    };
  },
  computed: {
    ...mapState(['bet']),
    locked() {
      return this.bet.length > 4;
    },
  },
  methods: {
    ...mapActions(['addToBet', 'setSelectedNumber']),
    select(number) {
      this.setSelectedNumber(number);
      this.addToBet(number);
    },
  },
};
</script>

<style lang="scss">
  @import './NumberGrid.scss';
</style>
