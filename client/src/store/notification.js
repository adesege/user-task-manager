const state = () => ({
  notification: {
    isOpen: false,
    type: "", // info, success, warning
    message: ""
  }
});

const mutations = {
  SET_NOTIFICATION(state, data) {
    state.notification = data;
  }
};

const getters = {
  getNotification(store) {
    return store.notification;
  }
};

const actions = {
  addNotification(context, options) {
    context.commit("SET_NOTIFICATION", { ...options, isOpen: true });
  },
  clearNotification(context) {
    context.commit("SET_NOTIFICATION", { isOpen: false });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
