const state = () => ({
  users: [],
});

const getters = {
  users: (state) => state.users,
};

const mutations = {
  setUsers(state, val) {
    state.users = val;
  },
  deleteUser(state, id) {
    let idx = state.users.findIndex((user) => user.id == id);
    state.users.splice(idx, 1);
  },
  createUser(state, payload) {
    state.users.push(payload);
  },
  editUser(state, payload) {
    Object.assign(state.users.find((user) => user.id == payload.id), {...payload.user})
  },
};

const actions = {
  fetchAllUsers({ commit }) {
    return fetch("https://fakerapi.it/api/v1/persons?_locale=fr_FR")
      .then((response) => response.json())
      .then((data) => {
        commit("setUsers", data.data);
      })
      .catch((err) => console.error(err));
  },
  deleteUser({ commit }, id) {
    commit("deleteUser", id);
  },
  createUser({ commit }, payload) {
    commit("createUser", payload);
  },
  editUser({ commit }, payload) {
    commit("editUser", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
