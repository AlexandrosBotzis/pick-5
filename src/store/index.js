import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from '@/firebase';
import router from '@/router';
import moment from 'moment';
import { v4 } from 'uuid';

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
    selectedRow: {},
    error: '',
  },
  mutations: {
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
      state.drawResult = 'Lost';

      if (state.winIndexes.length >= 3) {
        state.drawResult = 'Won';
      }
    },
    UPDATE_BALANCE(state) {
      switch (state.winIndexes.length) {
        case 3:
          state.balance = 5;
          break;
        case 4:
          state.balance = 10;
          break;
        case 5:
          state.balance = 20;
          break;
        default:
          state.balance = 0;
      }
    },
    SET_HISTORICAL_DATA(state, payload) {
      state.history.push(payload);
    },
    SET_SELECTED_ROW_ENTRY(state, id) {
      const selectedItem = state.history.find((item) => item.internalId === id);
      state.selectedRow = selectedItem;
    },
    TOGGLE_DRAW_STATE(state) {
      if (state.drawState === 'running') {
        state.drawState = 'completed';
      } else {
        state.drawState = 'running';
      }
    },
    CLEAR_HISTORY(state) {
      state.history = [];
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async register({ dispatch, commit }, form) {
      try {
        const { user } = await firebase.auth
          .createUserWithEmailAndPassword(form.email, form.password);
        await firebase.usersCollection.doc(user.uid).set({
          email: form.email,
        });
        dispatch('fetchUser', user);
        router.push('/login');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async login({ dispatch, commit }, form) {
      try {
        const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password);
        dispatch('fetchUser', user);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async logout({ commit }) {
      try {
        await firebase.auth.signOut();
        router.push('/login');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    async fetchUser({ commit }, user) {
      try {
        const userProfile = await firebase.usersCollection.doc(user.uid).get();
        commit('SET_USER', { userId: user.uid, userData: userProfile.data() });
      } catch (error) {
        // TODO: Check if continues to pages when fetching a user is not valid
        commit('SET_ERROR', error);
      }
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
        commit('SET_ERROR', error);
      } finally {
        commit('CLEAR_BET');
        commit('CLEAR_DRAW');
      }
    },
    fetchHistoricalData({ commit }) {
      commit('CLEAR_HISTORY');
      try {
        firebase.historyCollection.orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            if (data.userId === firebase.auth.currentUser.uid) {
              const dateInstance = new Date(data.createdOn.seconds * 1000);
              commit('SET_HISTORICAL_DATA', {
                ...data,
                createdOn: moment(dateInstance).format('DD.MM.YYYY'),
                createdAt: moment(dateInstance).format('HH:mm'),
                internalId: v4(),
              });
            }
          });
        });
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    removeEntry({ commit }, id) {
      try {
        firebase.historyCollection.doc(id).delete();
        commit('CLEAR_HISTORY');
      } catch (error) {
        commit('SET_ERROR', error);
      }
    },
    setSelectedNumber({ commit }, number) {
      commit('SET_SELECTED_NUMBER', number);
    },
    setSelectedRowEntry({ commit }, id) {
      commit('SET_SELECTED_ROW_ENTRY', id);
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
    clearHistory({ commit }) {
      commit('CLEAR_HISTORY');
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
  },
});
