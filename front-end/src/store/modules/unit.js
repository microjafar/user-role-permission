import api from "../../axios/unit";

const state = {
  unit: {},
  units: [],
};
const getters = {
  getUnit: (state) => state.unit,
  getUnits: (state) => state.units,
};
const actions = {
  async fetchUnit({ commit }, id) {
    try {
      const response = await api.get(id);
      commit("setUnit", response.data);
    } catch (error) {}
  },
  async fetchUnits({ commit }) {
    try {
      const response = await api.gets();
      commit("setUnits", response.data);
    } catch (error) {}
  },
  async createUnit({ commit }, unit) {
    try {
      const response = await api.store(unit);
      commit("setUnit", response.data);
    } catch (error) {}
  },
  async updateUnit({ commit }, unit) {
    try {
      const response = await api.update(unit);
      commit("setUnit", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteUnit({ commit }, id) {
    try {
      await api.delete(id);
      commit("removeUnit", id);
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  setUnit: (state, unit) => (state.unit = unit),
  setUnits: (state, units) => (state.units = units),
  removeUnit: (state, id) => {
    const unit_index = state.units.findIndex((r) => r.id === id);
    state.units.splice(unit_index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
