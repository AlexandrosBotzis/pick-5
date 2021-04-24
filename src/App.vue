<template>
  <v-app>
    <v-main transition="slide-x-transition">
      <my-header v-if="showHeader" />
      <router-view></router-view>
      <notification/>
    </v-main>
  </v-app>
</template>

<script>
import MyHeader from '@/components/Header/Header.vue';
import Notification from '@/components/Notification/Notification.vue';

export default {
  name: 'App',
  components: {
    MyHeader,
    Notification,
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
