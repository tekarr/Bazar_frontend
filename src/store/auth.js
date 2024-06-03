
import axios from 'axios'
import router from "@/router";
export default {
    namespaced: true,
    
    state: {
        user: null,
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        authenticated: localStorage.getItem('authenticated') === 'true'

    },
    getters: {
        user(state){
            return state.user
        },
        token(state){
            return state.token
        },
        authenticated(state){
            return state.authenticated
        },
        role(state){
            return state.role
        }
    },
    mutations: {
        SET_USER(state, user){
            state.user = user
        },
        SET_TOKEN(state, token){
            state.token = token
            localStorage.setItem('token', token);
        },
        SET_AUTHENTICATED(state, value){
            state.authenticated = value
            localStorage.setItem('authenticated', value);
        },
        SET_ROLE(state, role){
            state.role = role
            localStorage.setItem('role', role);
        },
        CLEAR_AUTH(state) {
            state.user = null;
            state.token = null;
            state.authenticated = false;
            state.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('authenticated');
        }
    },
    actions: {
        async login({commit}, credentials){
            try {
                const response = await axios.post('http://localhost:8000/login', credentials)
                commit('SET_USER', response.data.user)
                commit('SET_TOKEN', response.data.token)
                commit('SET_AUTHENTICATED', true)
                commit('SET_ROLE', response.data.user.role_id)

                return response
            }catch (e) {
                commit('CLEAR_AUTH');
                return e.response
            }
        },
        async logout({commit}){
            try {
                const response = await axios.post('http://localhost:8000/logout')
                commit('CLEAR_AUTH');
                return response
            }catch (e) {
                return e.response
            }
        },
        async register({commit}, user){
            try {
                const response = await axios.post('http://localhost:8000/register', user)
                commit('SET_USER', response.data.user)
                commit('SET_TOKEN', response.data.token)
                commit('SET_AUTHENTICATED', true)
                commit('SET_ROLE', response.data.user.role_id)
                return response
            }catch (e) {
                commit('CLEAR_AUTH');
                return e.response
            }
        },
        async checkAuth({commit}){
            try {
                const response = await axios.get('http://localhost:8000/api/user')
                commit('SET_USER', response.data)
                commit('SET_AUTHENTICATED', true)
                return response
            }catch (e) {
                commit('CLEAR_AUTH');
                return e.response
            }
        },

    }

}
