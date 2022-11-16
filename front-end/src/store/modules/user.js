import api from "../../axios/user";

const state = {
  auth: {
    is_login: false,
    token: "",
    user: {
      id: null,
      role: {
        id: "",
        name: "",
        permissions: [],
      },
    },
  },
  user: {},
  users: {},
  errorResponse: {
    is_error: false,
    message: "",
    errors: {},
  },
};
const getters = {
  auth(state) {
    const token = localStorage.getItem("user-token");
    state.auth.is_login = !(token === null || token === "");
    return state.auth;
  },
  getAuthUser: (state) => state.auth.user,
  getUser: (state) => state.user,
  getUsers: (state) => state.users,
  getErrorResponse: (state) => state.errorResponse,
};
const actions = {
  async login({ commit }, payload) {
    try {
      const response = await api.login(payload);
      commit("setAuthToken", response.data.token);
      commit("setAuthLogin", true);
    } catch (error) {
      commit("setErrorResponse", error);
    }
  },
  async logout({ commit }) {
    try {
      const response = await api.logout();
      commit("setAuthToken", "");
      commit("setAuthLogin", false);
      commit("setAuthUser", {});
    } catch (error) {}
  },
  async authenticate({ commit, state }) {
    if (state.auth.is_login) {
      try {
        const response = await api.auth();
        commit("setAuthUser", response.data);
      } catch (error) {
        commit("setErrorResponse", error);
      }
    }
  },
  async fetchUser({ commit }, id) {
    try {
      const response = await api.get(id);
      commit("setUser", response.data);
    } catch (error) {}
  },
  async fetchUsers({ commit }) {
    try {
      const response = await api.gets();
      commit("setUsers", response.data);
    } catch (error) {}
  },
  async createUser({ commit }, user) {
    try {
      const response = await api.store(user);
      commit("setUser", response.data);
    } catch (error) {}
  },
  async updateUser({ commit }, user) {
    try {
      const response = await api.update(user);
      commit("setUser", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteUser({ commit }, id) {
    try {
      await api.delete(id);
      commit("setUser", {});
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  setAuthToken: (state, token) => {
    if (token) {
      localStorage.setItem("user-token", token.toString());
    } else {
      localStorage.removeItem("user-token");
    }
    state.auth.token = token;
  },
  setAuthLogin: (state, is_login) => (state.auth.is_login = is_login),
  setAuthUser: (state, user) => (state.auth.user = user),
  setUser: (state, user) => (state.user = user),
  setUsers: (state, users) => (state.users = users),

  setErrorResponse: (state, err) =>
    console.log(err)(
      (state.errorResponse = {
        is_error: true,
        errors: err.errors ? err.errors : [],
        message: err.message ? err.message : "",
      })
    ),
  setErrors: (state, errors) => (state.errorResponse.errors = errors),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
