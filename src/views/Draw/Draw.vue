<template>
  <div class="draw d-flex flex-column align-end justify-space-between">
    <div class="d-flex flex-row justify-center">
        <lottery @drawCompleted="onCompleteDraw()"/>
        <selected-numbers :numbers="betNumbers" :isDisabled="true" title="Current BET"/>
        <modal :modalOpened="drawFinished" />
    </div>
    <amount class="draw__amount" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Lottery from '@/components/Lottery/Lottery.vue';
import SelectedNumbers from '@/components/SelectedNumbers/SelectedNumbers.vue';
import Amount from '@/components/Amount/Amount.vue';
import Modal from '@/components/Modal/Modal.vue';

export default {
  name: 'Home',
  components: {
    Amount,
    Lottery,
    SelectedNumbers,
    Modal,
  },
  data() {
    return {
      drawFinished: false,
    };
  },
  computed: {
    ...mapState(['bet']),
    betNumbers() {
      return this.bet;
    },
  },
  methods: {
    onCompleteDraw() {
      this.drawFinished = true;
    },
  },
};
</script>

<style lang="scss">
  @import './Draw.scss';
</style>
