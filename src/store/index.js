import { createStore } from 'vuex';

export default createStore({
  state: {
    countries: null,
    paginationOffset: 0,
  },
  getters: {
    getFromStore(state) {
      return state.countries;
    },
    getOffset(state) {
      return state.paginationOffset;
    },
    getCountry(state) {
      return (countryName) => state.countries.find(({ name }) => countryName === name)[0];
    },
  },
  mutations: {
    fetchCountries(state, payload) {
      console.log(payload);
      const { countries } = payload;
      state.countries = countries;
    },
    updatePaginationOffset(state, payload) {
      state.paginationOffset = payload.offset;
    },
  },
  actions: {},
  modules: {},
});
