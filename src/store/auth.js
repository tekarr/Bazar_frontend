
import axios from 'axios'
import router from "@/router";
export default {
    namespaced: true,
    
    state: {
        user: null,
        token: null,
        role: null,
        authenticated: false,

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
        },
        SET_AUTHENTICATED(state, value){
            state.authenticated = value
        },
        SET_ROLE(state, role){
            state.role = role
        }
    },
    actions: {
        async login({commit}, credentials){
            try {
                const response = await axios.post('http://localhost:8000/login', credentials)
                commit('SET_USER', response.data.user)
                commit('SET_TOKEN', response.data.token)
                commit('SET_AUTHENTICATED', true)
                commit('SET_ROLE', response.data.role_id)


                return response
            }catch (e) {
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
                commit('SET_AUTHENTICATED', false)

                return e.response
            }
        },
        async logout({commit}){
            try {
                const response = await axios.post('http://localhost:8000/api/logout')
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
                commit('SET_AUTHENTICATED', false)
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
                commit('SET_ROLE', response.data.role_id)
                return response
            }catch (e) {
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
                commit('SET_AUTHENTICATED', false)
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
                commit('SET_USER', null)
                commit('SET_AUTHENTICATED', false)
                return e.response
            }
        },

    }

}
