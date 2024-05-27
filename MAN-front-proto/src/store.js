// src/store.js
import { createStore } from "vuex";

export default createStore({
  state: {
    showSuccessLog: false,
  },
  mutations: {
    setShowSuccessLog(state, value) {
      state.showSuccessLog = value;
    },
  },
  actions: {
    triggerSuccessLog({ commit }) {
      commit("setShowSuccessLog", true);
      setTimeout(() => {
        commit("setShowSuccessLog", false);
      }, 3000); // Success log will disappear after 3 seconds
    },
  },
});
