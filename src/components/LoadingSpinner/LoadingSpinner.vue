<template>
  <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="white"
    >
      {{ countDown - 1 }}
    </v-progress-circular>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoadingSpinner',
  data() {
    return {
      interval: {},
      value: 0,
      countDown: 4,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.toggleDrawState();
    this.countDownTimer();
    /* eslint-disable */
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 33.3;
    }, 1000);
    /* eslint-enable */
  },
  methods: {
    ...mapActions(['toggleDrawState']),
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.$emit('counterFinished', true);
      }
    },
  },
};
</script>

<style lang="scss">
  @import './LoadingSpinner.scss';
</style>
