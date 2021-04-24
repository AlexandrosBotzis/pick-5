import Vue from 'vue';
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
import { auth } from './firebase';
import store from './store';
import router from './router';
// import { firestorePlugin } from 'vuefire';
// import VuetifyDialog from 'vuetify-dialog';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
// Vue.use(firestorePlugin);

let app;

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }

  if (user) {
    store.dispatch('fetchUser', user);
    if (router.currentRoute.path === '/login' || router.currentRoute.path === '/draw') {
      router.push('/');
    }
  }
});
