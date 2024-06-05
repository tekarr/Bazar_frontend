import axios from "axios";
import axiosClient from "@/axios";
import router from "@/router";
import {ref} from "vue";
import store from "@/store/index";

export default {
    namespaced: true,

    state: {
     user: null,
        token: localStorage.getItem('token') || '',
    },
    getters: {

        user(state) {
            return state.user;
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            localStorage.setItem('token', token);
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;

        },
        CLEAR_AUTH_DATA(state) {
            localStorage.removeItem('token');
            state.token = '';
            state.user = null;
        },

        AUTH_USER(state, data) {
            localStorage.setItem('token', data.token);
            state.user = data.user;

            let route = '/admin';
            switch (data.user.role_id) {
                case 1:
                    route = '/admin';
                    break;
                case 2:
                    route = '/vendor';
                    break;
                case 3:
                    route = '/';
                    break;
            }
            router.push({ path: route });



        }
    },
    actions:{
         login({ commit }, credentials) {
             axios.post('http://localhost:8000/login', credentials)
                .then((data ) => {
                   commit('AUTH_USER', data.data);

                    console.log('User data fetched:', data.data.token);

                    // router.push({ name: 'Admin' });
                });
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(() => {
                    commit('CLEAR_AUTH_DATA');

                });
        },

        register({ commit }, credentials) {
            return axios.post('http://localhost:8000/register', credentials)
                .then(({ data }) => {
                    commit('AUTH_USER', data.user, data.token);

                });
        },


        checkAuth({ commit }) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token');
                if (!token) {
                    // If there's no token, reject the promise
                    reject(new Error('No token found'));
                    return;
                }

                // If there's a token, fetch user data
                axiosClient.get('/api/user')
                    .then(response => {
                        // If user data is fetched successfully, commit it to the store
                          commit('SET_USER', response.data);
                        console.log('User data fetched:', response.data);
                        // Resolve the promise to indicate success
                        resolve();
                    })
                    .catch(error => {
                        // If there's an error while fetching user data, clear the authentication data
                        commit('CLEAR_AUTH_DATA');
                        console.error('Error fetching user data:', error);
                        // Reject the promise to indicate failure
                        reject(error);
                    });
            });
        }

    }

}