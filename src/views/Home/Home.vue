<template>
  <div class="home">
    <number-board />
    <selected-numbers title="Please place your bet" />
  </div>
</template>

<script>
import NumberBoard from '@/components/NumberBoard/NumberBoard.vue';
import SelectedNumbers from '@/components/SelectedNumbers/SelectedNumbers.vue';

export default {
  name: 'Home',
  components: {
    NumberBoard,
    SelectedNumbers,
  },
};
</script>

<style lang="scss">
  @import './Home.scss';
</style>
