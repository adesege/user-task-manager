const state = () => ({
  meta: {},
  tasks: [],
  isLoading: false,
  isSavingTask: false,
  isDeletingTask: false
});

const mutations = {
  SET_TASKS(state, { tasks, ...meta }) {
    state.tasks = tasks;
    state.meta = meta;
  },
  SET_IS_LOADING(state, value) {
    state.isLoading = value;
  },
  SET_IS_SAVING_TASK(state, value) {
    state.isSavingUser = value;
  },
  SET_IS_DELETING_TASK(state, value) {
    state.isDeletingUser = value;
  },
  SET_SAVE_TASK(store, payload) {
    const { actionType, ...newPayload } = payload;
    if (actionType === "add") {
      store.tasks = [newPayload, ...(store.tasks || [])];
      return;
    }
    const index = store.tasks.findIndex(task => task.id === newPayload.taskId);
    store.tasks[index] = { ...store.tasks[index], ...newPayload };
  },
  REMOVE_TASK(store, payload) {
    const index = store.tasks.findIndex(task => task.id === payload.taskId);
    store.tasks.splice(index, 1);
  }
};

const getters = {
  getTasks(store) {
    return taskId => {
      if (taskId) {
        return store.tasks.find(task => task.id === taskId) || {};
      }
      return store.tasks || [];
    };
  },
  getIsLoading(store) {
    return store.isLoading;
  },
  getIsSavingTask(store) {
    return store.isSavingTask;
  },
  getIsDeletingTask(store) {
    return store.isDeletingTask;
  }
};

const actions = {
  async getTasks(context, payload) {
    try {
      context.commit("SET_IS_LOADING", true);
      const result = await this._vm.$http
        .get(`/users/${payload.userId}/tasks`)
        .then(response => response.data.data)
        .catch(error => error.response);

      context.commit("SET_TASKS", result);
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
  async saveTask(context, payload) {
    try {
      const { actionType, userId, taskId, ...newPayload } = payload;
      const isAddTask = actionType === "add";

      const options = {
        method: isAddTask ? "POST" : "PUT",
        url: isAddTask
          ? `/users/${userId}/tasks`
          : `/users/${userId}/tasks/${taskId}`,
        data: newPayload
      };
      context.commit("SET_IS_SAVING_TASK", true);
      const result = await this._vm
        .$http(options)
        .then(response => response.data)
        .catch(error => error.response);

      context.commit(
        "SET_SAVE_TASK",
        isAddTask ? { ...result.data, actionType } : payload
      );
      context.commit("SET_IS_SAVING_TASK", false);
      context.dispatch(
        "notification/addNotification",
        {
          type: "success",
          message: "Task saved successfully"
        },
        { root: true }
      );
    } catch (error) {
      context.commit("SET_IS_SAVING_TASK", false);
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
  async deleteTask(context, payload) {
    try {
      context.commit("SET_IS_DELETING_TASK", false);
      await this._vm.$http.delete(
        `/users/${payload.userId}/tasks/${payload.taskId}`
      );
      context.commit("REMOVE_TASK", payload);
      context.dispatch(
        "notification/addNotification",
        {
          type: "success",
          message: "Task deleted successfully"
        },
        { root: true }
      );
    } catch (error) {
      context.commit("SET_IS_DELETING_TASK", false);
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
