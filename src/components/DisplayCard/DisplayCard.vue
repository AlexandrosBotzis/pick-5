<template>
  <v-container>
    <v-card
      class="display-card d-flex flex-column"
      elevation="12"
      :height="height"
      :width="width"
    >
      <v-toolbar dark max-height="65" class="display-card__toolbar">
        <v-toolbar-title class="flex text-center">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-row
        justify="center"
        class="pt-10"
        width="100%"
      >
        <slot />
      </v-row>
      <slot name="footer" />
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DisplayCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
  @import './DisplayCard.scss';
</style>
