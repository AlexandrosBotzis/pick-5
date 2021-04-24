<template>
  <v-app-bar height="10" app>
    <v-app-bar-nav-icon
      @click="drawer = true"
      class="d-flex d-sm-none pt-10"
    />
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
          class="d-none d-sm-flex"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="(item, index) in items"
            :key="index"
            :to="item.path"
            :disabled="item.disabled || isMenuItemDisabled"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
        <v-chip
          class="ma-4"
          color="primary"
          outlined
          pill
        >
          {{ user.email }}
          <v-icon right>
            mdi-account-outline
          </v-icon>
        </v-chip>

        <v-chip @click="logoutUser()">
          Logout
        </v-chip>
      </template>
  </v-app-bar>
    <!-- Add a navigation bar -->
    <!-- <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title @click="tab = index">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->
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
    ...mapState(['user', 'drawState']),
    isMenuItemDisabled() {
      return this.drawState === 'running';
    },
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

