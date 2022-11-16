import api from "../../axios/permission";

const state = {
  permission: {},
  permissions: [],
};
const getters = {
  getPermission: (state) => state.permission,
  getPermissions: (state) => state.permissions,
};
const actions = {
  async fetchPermission({ commit }, id) {
    try {
      const response = await api.get(id);
      commit("setPermission", response.data);
    } catch (error) {}
  },
  async fetchPermissions({ commit }) {
    try {
      const response = await api.gets();
      commit("setPermissions", response.data);
    } catch (error) {}
  },
  async createPermission({ commit }, permission) {
    try {
      const response = await api.store(permission);
      commit("setPermission", response.data);
    } catch (error) {}
  },
  async updatePermission({ commit }, permission) {
    try {
      const response = await api.update(permission);
      commit("setPermission", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deletePermission({ commit }, id) {
    try {
      await api.delete(id);
      commit("removePermission", id);
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  setPermission: (state, permission) => (state.permission = permission),
  setPermissions: (state, permissions) => (state.permissions = permissions),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
