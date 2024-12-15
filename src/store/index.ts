import { createStore } from 'vuex'

export default createStore({
  state: {
    user: localStorage.getItem('user') || ''
  },
  getters: {
    getUSer: (state) => state.user
  },
  mutations: {
    setUser(state, user){
      state.user = user;
      localStorage.setItem('user', user);
    },
    removeUser(state){
      state.user = 'user',
      localStorage.removeItem('user');
    }
  }
})
