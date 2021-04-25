<template>
  <v-app-bar app>
  <v-app-bar-nav-icon class="d-flex d-sm-none pt-10"/>
    <v-tabs
      v-model="tab"
      align-with-title
      class="d-none d-sm-flex"
    >
      <v-tabs-slider color="yellow"/>
      <v-tab
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        :disabled="item.disabled"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <v-chip
      class="ma-4"
      color="primary"
      outlined
    >
      {{ user.email }}
      <v-icon> mdi-account-outline </v-icon>
    </v-chip>
    <v-chip class="overline" @click="logoutUser()">
      Logout
    </v-chip>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      items: [
        {
          path: '/',
          title: 'Home',
        },
        {
          path: '/draw',
          title: 'live draw',
          disabled: true,
        },
        {
          path: '/history',
          title: 'History',
        },
      ],
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout();
    },
  },
};
</script>
