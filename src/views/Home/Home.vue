<template>
  <div class="home">
    <number-board />
    <selected-numbers :numbers="betNumbers" title="Please place your bet" />
  </div>
</template>

<script>
import NumberBoard from '@/components/NumberBoard/NumberBoard.vue';
import SelectedNumbers from '@/components/SelectedNumbers/SelectedNumbers.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    NumberBoard,
    SelectedNumbers,
  },
  computed: {
    ...mapState(['bet']),
    betNumbers() {
      return this.bet;
    },
  },
};
</script>

<style lang="scss">
  @import './Home.scss';
</style>
