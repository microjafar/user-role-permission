import api from "../../axios/role";

const state = {
  role: {},
  roles: [],
};
const getters = {
  getRole: (state) => state.role,
  getRoles: (state) => state.roles,
};
const actions = {
  async fetchRole({ commit }, id) {
    try {
      const response = await api.get(id);
      commit("setRole", response.data);
    } catch (error) {}
  },
  async fetchRoles({ commit }) {
    try {
      const response = await api.gets();
      commit("setRoles", response.data);
    } catch (error) {}
  },
  async createRole({ commit }, role) {
    try {
      const response = await api.store(role);
      commit("setRole", response.data);
    } catch (error) {}
  },
  async updateRole({ commit }, role) {
    try {
      const response = await api.update(role);
      commit("setRole", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteRole({ commit }, id) {
    try {
      await api.delete(id);
      commit("removeRole", id);
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  setRole: (state, role) => (state.role = role),
  setRoles: (state, roles) => (state.roles = roles),
  removeRole: (state, id) => {
    const role_index = state.roles.findIndex((r) => r.id === id);
    state.roles.splice(role_index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
