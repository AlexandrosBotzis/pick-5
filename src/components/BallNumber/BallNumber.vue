<template>
  <v-hover v-slot="{ hover }">
    <v-card
      height="100"
      width="100"
      :color="isMatching ? '#00C853' : '#1A237E'"
      class="ball-number rounded-circle"
      :elevation="hover ? 12 : 2"
      :disabled="isDisabled"
      @click="select"
    >
      <v-row
        class="ball-number__label fill-height"
        align="center"
        justify="center"
        v-text="label"
      />
      <v-btn
        v-if="hover && allowRemoval"
        @click="remove"
        color="error"
        absolute
        fab
        small
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BallNumber',
  props: {
    label: {
      type: Number,
      default: undefined,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isMatching: {
      type: Boolean,
      default: false,
    },
    allowRemoval: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['bet', 'selectedNumber']),
  },
  methods: {
    select() {
      this.$emit('select');
    },
    remove() {
      this.$emit('remove');
    },
  },
};
</script>

<style lang="scss">
  @import './BallNumber.scss';
</style>
