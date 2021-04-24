import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from '@/firebase';
// import router from '@/router';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      email: null,
      id: null,
    },
    bet: [],
    draw: [],
    drawState: 'completed',
    drawResult: null,
    selectedNumber: null,
    maxBetReached: false,
    winIndexes: [],
    balance: 0,
    history: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    drawState(state) {
      return state.drawState;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, { userId, userData }) {
      state.user.email = userData.email;
      state.user.id = userId;
    },
    SET_SELECTED_NUMBER(state, value) {
      state.selectedNumber = value;
    },
    ADD_TO_BET(state, value) {
      state.bet.push(value);
    },
    REMOVE_FROM_BET(state, value) {
      state.bet = state.bet.filter((item) => item !== value);
    },
    MAX_BET_NUMBERS(state) {
      state.maxBetReached = state.bet.length >= 5;
    },
    CLEAR_BET(state) {
      state.bet = [];
    },
    CLEAR_DRAW(state) {
      state.draw = [];
      state.winIndexes = [];
    },
    ADD_TO_DRAW(state, value) {
      state.draw.push(value);
    },
    CHECK_WINS(state, value) {
      const foundFlag = state.bet.indexOf(value);
      if (foundFlag > -1) {
        state.winIndexes.push(foundFlag);
      }
    },
    SET_DRAW_RESULT(state) {
      if (state.winIndexes >= 3) {
        state.drawResult = 'won';
      } else {
        state.drawResult = 'lost';
      }
    },
    UPDATE_BALANCE(state) {
      switch (state.winIndexes) {
        case 3:
          state.balance += 5;
          break;
        case 4:
          state.balance += 10;
          break;
        case 5:
          state.balance += 20;
          break;
        default:
          state.balance += 0;
      }
    },
    SET_HISTORICAL_DATA(state, payload) {
      state.history.push(payload);
    },
    TOGGLE_DRAW_STATE(state) {
      if (state.drawState === 'running') {
        state.drawState = 'completed';
      } else {
        state.drawState = 'running';
      }
    },
    REMOVE_ENTRY(state, id) {
      state.history = [];
      state.history = state.history.filter((item) => item.id !== id);
    },
  },
  actions: {
    async register({ dispatch }, form) {
      // eslint-disable-next-line max-len
      const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password);
      await firebase.usersCollection.doc(user.uid).set({
        email: form.email,
      });
      dispatch('fetchUser', user);
    },
    async login({ dispatch }, form) {
      const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password);
      dispatch('fetchUser', user);
    },
    async logout() {
      await firebase.auth.signOut();
      // router.push('/login');
    },
    async fetchUser({ commit }, user) {
      const userProfile = await firebase.usersCollection.doc(user.uid).get();
      commit('SET_USER', { userId: user.uid, userData: userProfile.data() });
      // if (router.currentRoute.path === '/login'
      //   || router.currentRoute.path === '/draw') {
      //   router.push('/');
      // }
    },
    async saveHistoricalData({ state, commit }) {
      try {
        await firebase.historyCollection.add({
          userId: firebase.auth.currentUser.uid,
          createdOn: new Date(Date.now()),
          draw: state.draw,
          bet: state.bet,
          result: state.drawResult,
          amount: state.balance,
        });
      } catch (error) {
        // TODO: Add Error State
        console.log('error', error);
      } finally {
        commit('CLEAR_BET');
        commit('CLEAR_DRAW');
      }
    },
    async fetchHistoricalData({ commit }) {
      try {
        firebase.historyCollection.orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            if (data.userId === firebase.auth.currentUser.uid) {
              commit('SET_HISTORICAL_DATA', {
                ...data,
                createdOn: new Date(data.createdOn.seconds * 1000),
              });
            }
          });
        });
      } catch (error) {
        // TODO: Add Error State
        console.log('error', error);
      }
    },
    setSelectedNumber({ commit }, number) {
      commit('SET_SELECTED_NUMBER', number);
    },
    addToBet({ commit }, number) {
      commit('ADD_TO_BET', number);
      commit('MAX_BET_NUMBERS');
    },
    removeFromBet({ commit }, number) {
      commit('REMOVE_FROM_BET', number);
    },
    clearBet({ commit }) {
      commit('CLEAR_BET');
    },
    clearDraw({ commit }) {
      commit('CLEAR_DRAW');
    },
    addToDraw({ commit }, number) {
      commit('ADD_TO_DRAW', number);
    },
    checkWins({ commit }, number) {
      commit('CHECK_WINS', number);
      commit('SET_DRAW_RESULT');
    },
    updateBalance({ commit }) {
      commit('UPDATE_BALANCE');
    },
    toggleDrawState({ commit }) {
      commit('TOGGLE_DRAW_STATE');
    },
    removeEntry({ commit }, id) {
      firebase.historyCollection.doc(id).delete();
      commit('REMOVE_ENTRY', id);
    },
  },
});
