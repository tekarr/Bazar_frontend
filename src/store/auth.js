
import axios from 'axios'
import router from "@/router";
import axiosClient from "@/axios";
export default {
    namespaced: true,
    
    state: {
        user: null,
        token: localStorage.getItem('token') || null,
        role:  null,
        authenticated: false,
        username: null

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
        },
        username(state){
            return state.username
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
        },

        SET_ROLE(state, role){
            state.role = role

        },
        SET_USERNAME(state, username){
            state.username = username

        },
        CLEAR_AUTH(state) {
            state.user = null;
            state.token = null;
            state.authenticated = false;
            state.role = null;
            state.username = null;
            localStorage.removeItem('token');
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
                commit('SET_USERNAME', response.data.user.name) 

                return response
            }catch (e) {
                commit('CLEAR_AUTH');
                return e.response
            }
        },
        async logout({commit}){
            try {
                const response = await axiosClient.post('/logout')
                console.log(response)
                commit('CLEAR_AUTH');
                return response
            }catch (e) {
                console.log(e)
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
                const response = await axiosClient.get('http://localhost:8000/api/user')
                commit('SET_ROLE', response.data.user.role_id)
                commit('SET_USER', response.data.user)
                commit('SET_USERNAME', response.data.user.name)
                commit('SET_AUTHENTICATED', true)
                return response
            }catch (e) {
                commit('CLEAR_AUTH');
                return e.response
            }
        },

    }

}
