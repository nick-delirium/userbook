import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    persons: JSON.parse(window.localStorage.getItem("persons")) || []
  },
  mutations: {
    edit(state, { index, person }) {
      Vue.set(state.persons, index, person);
      window.localStorage.setItem("persons", JSON.stringify(state.persons));
    },
    delete(state, id) {
      Vue.delete(state.persons, id);
      window.localStorage.setItem("persons", JSON.stringify(state.persons));
    },
    newPerson(state, person) {
      Object.assign(person, { id:state.persons.length+1 } )
      state.persons.push(person);
      window.localStorage.setItem("persons", JSON.stringify(state.persons));
    }
  },
  getters: {
    persons: state => {
      return state.persons;
    }
  }
});
