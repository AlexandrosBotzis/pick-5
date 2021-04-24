<template>
  <div class="draw d-flex flex-column align-end justify-space-between">
    <div class="d-flex flex-row">
        <!-- <transition-group name="fade"> -->
          <lottery @drawCompleted="boo()"/>
          <selected-numbers :isDisabled="true" title="Current BET"/>
          <modal :modalOpened="drawFinished" />
        <!-- </transition-group> -->
    </div>
    <amount class="draw__balance" />
  </div>
</template>

<script>
import Lottery from '@/components/Lottery/Lottery.vue';
import SelectedNumbers from '@/components/SelectedNumbers/SelectedNumbers.vue';
import Amount from '@/components/Amount/Amount.vue';
import Modal from '@/components/Modal/Modal.vue';
// import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Amount,
    Lottery,
    SelectedNumbers,
    Modal,
  },
  // mounted() {
  //   this.toggleDrawState();
  // },
  data() {
    return {
      drawFinished: false,
    };
  },
  methods: {
    // ...mapActions(['toggleDrawState']),
    boo() {
      this.drawFinished = true;
    },
  },
};
</script>

<style lang="scss">
  @import './Draw.scss';
</style>
