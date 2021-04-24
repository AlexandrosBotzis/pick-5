<template>
  <div class="home">
    <number-grid />
    <selected-numbers title="Please place your bet" />
  </div>
</template>

<script>
import NumberGrid from '@/components/NumberGrid/NumberGrid.vue';
import SelectedNumbers from '@/components/SelectedNumbers/SelectedNumbers.vue';

export default {
  name: 'Home',
  components: {
    NumberGrid,
    SelectedNumbers,
  },
};
</script>

<style lang="scss">
  @import './Home.scss';
</style>
