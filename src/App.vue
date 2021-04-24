<template>
  <v-app>
    <v-main transition="slide-x-transition">
      <my-header v-if="showHeader" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MyHeader from '@/components/Header/Header.vue';

export default {
  name: 'App',
  components: {
    MyHeader,
  },
  computed: {
    showHeader() {
      return this.$route.path !== '/login' && this.$route.path !== '/register';
    },
  },
};
</script>

<style lang="scss">
  @import './App.scss';
</style>
