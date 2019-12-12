const state = () => ({
  meta: {},
  users: [],
  isLoading: false,
  isSavingUser: false,
  isDeletingUser: false
});

const mutations = {
  SET_USERS(state, { users, ...meta }) {
    state.users = users;
    state.meta = meta;
  },
  SET_IS_LOADING(state, value) {
    state.isLoading = value;
  },
  SET_IS_SAVING_USER(state, value) {
    state.isSavingUser = value;
  },
  SET_IS_DELETING_USER(state, value) {
    state.isDeletingUser = value;
  },
  SET_SAVE_USER(store, payload) {
    const { actionType, ...newPayload } = payload;
    if (actionType === "add") {
      store.users = [newPayload, ...store.users];
      return;
    }
    const index = store.users.findIndex(user => user.id === newPayload.userId);
    store.users[index] = { ...store.users[index], ...newPayload };
  },
  REMOVE_USER(store, payload) {
    const index = store.users.findIndex(user => user.id === payload.userId);
    store.users.splice(index, 1);
  }
};

const getters = {
  getUsers(store) {
    return userId => {
      if (userId) {
        return store.users.find(user => user.id === userId);
      }
      return store.users;
    };
  },
  getIsLoading(store) {
    return store.isLoading;
  },
  getIsSavingUser(store) {
    return store.isSavingUser;
  },
  getIsDeletingUser(store) {
    return store.isDeletingUser;
  }
};

const actions = {
  async getUsers(context) {
    try {
      context.commit("SET_IS_LOADING", true);
      const result = await this._vm.$http
        .get("/users")
        .then(response => response.data.data)
        .catch(error => error.response);

      context.commit("SET_USERS", result);
      context.commit("SET_IS_LOADING", false);
    } catch (error) {
      context.commit("SET_IS_LOADING", false);
      context.dispatch(
        "notification/addNotification",
        {
          type: "error",
          message: "Something went wrong. Try again."
        },
        { root: true }
      );
    }
  },
  async saveUser(context, payload) {
    try {
      const { actionType, userId, ...newPayload } = payload;
      const isAddUser = actionType === "add";

      const options = {
        method: isAddUser ? "POST" : "PUT",
        url: isAddUser ? "/users" : `/users/${userId}`,
        data: newPayload
      };
      context.commit("SET_IS_SAVING_USER", true);
      const result = await this._vm
        .$http(options)
        .then(response => response.data)
        .catch(error => error.response);

      context.commit(
        "SET_SAVE_USER",
        isAddUser ? { ...result.data, actionType } : payload
      );
      context.commit("SET_IS_SAVING_USER", false);
      context.dispatch(
        "notification/addNotification",
        {
          type: "success",
          message: "User saved successfully"
        },
        { root: true }
      );
    } catch (error) {
      context.commit("SET_IS_SAVING_USER", false);
      context.dispatch(
        "notification/addNotification",
        {
          type: "error",
          message: "Something went wrong. Try again."
        },
        { root: true }
      );
      return Promise.reject();
    }
  },
  async deleteUser(context, payload) {
    try {
      context.commit("SET_IS_DELETING_USER", false);
      await this._vm.$http.delete(`/users/${payload.userId}`);
      context.commit("REMOVE_USER", payload);
      context.dispatch(
        "notification/addNotification",
        {
          type: "success",
          message: "User deleted successfully"
        },
        { root: true }
      );
    } catch (error) {
      context.commit("SET_IS_DELETING_USER", false);
      context.dispatch(
        "notification/addNotification",
        {
          type: "error",
          message: "Something went wrong. Try again."
        },
        { root: true }
      );
      return Promise.reject();
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
