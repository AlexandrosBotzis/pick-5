import { SET_USER } from './mutations';

export default {
  setUser({ commit }, { user }) {
    commit(SET_USER, user);
  },
};
