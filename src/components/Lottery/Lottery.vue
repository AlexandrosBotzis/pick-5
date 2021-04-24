<template>
  <div class="lottery">
    <display-card title="Current DRAW" width="843" height="280">
      <template>
        <v-col class="d-flex flex-row" cols="auto">
          <ball-number
            v-for="(item, index) in randomNumbers"
            :key="index"
            :label="item"
          />
        </v-col>
        <v-fade-transition>
          <v-overlay v-if="!counterFinished" absolute>
            <loading-spinner @counterFinished="foo()"/>
          </v-overlay>
        </v-fade-transition>
      </template>
    </display-card>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */
import { mapActions } from 'vuex';
import BallNumber from '@/components/BallNumber/BallNumber.vue';
import DisplayCard from '@/components/DisplayCard/DisplayCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';

export default {
  name: 'Lottery',
  components: {
    BallNumber,
    DisplayCard,
    LoadingSpinner,
  },
  data() {
    return {
      randomNumbers: [],
      countDown: 5,
      interval: {},
      value: 0,
      counterFinished: false,
    };
  },
  mounted() {
    this.Timer();
  },
  methods: {
    ...mapActions([
      'addToDraw',
      'checkWins',
      'toggleDrawState',
      'updateBalance',
    ]),
    addNumberToArray(number) {
      this.randomNumbers.push(number);
      this.addToDraw(number);
      this.checkWins(number);
    },
    Timer() {
      if (this.countDown > 0) {
        const randomNumber = Math.ceil(Math.random() * 30);
        setTimeout(() => {
          this.countDown -= 1;
          this.randomNumbers.includes(randomNumber)
            ? this.addNumberToArray(randomNumber - 1)
            : this.addNumberToArray(randomNumber);
          this.Timer();
          this.updateBalance();
        }, 4000);
      } else {
        this.$emit('drawCompleted');
        this.toggleDrawState();
      }
    },
    foo() {
      this.counterFinished = true;
    },
  },
};
</script>

<style lang="scss">
  @import './Lottery.scss';
</style>
