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
            state.token = '';
            localStorage.removeItem('token');
            state.user = null;
        },


    },
    actions:{
         login({ commit }, credentials) {
             axios.post('http://localhost:8000/login', credentials)
                .then((response ) => {
                    commit('SET_TOKEN', response.data.token);
                    commit('SET_USER', response.data.user);
                    redirectToDashboard(response.data.user);
                    console.log('User data fetched:', response.data.user);

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
                .then(( response ) => {
                    commit('SET_USER', response.data.user);
                    commit('SET_TOKEN', response.data.token);
                    redirectToDashboard(response.data.user);
                    console.log('User data fetched:', response.data.user);
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
                        console.log('User data fetched from checkAuth:', response.data);
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

// utils/auth.js

export function redirectToDashboard(user) {
    let route = '/';
    switch (user.role_id) {
        case 1:
            route = '/admin';
            break;
        case 2:
            route = '/vendor';
            break;
        case 3:
            route = '/'; // Adjust this route according to your application's structure
            break;
        default:
            route = '/';
            break;
    }

    // Redirect to the determined route
    router.push(route).then(() => {
        console.log('Successfully redirected to:', route);
    }).catch(error => {
        console.error('Error redirecting to:', route, error);
    });
}
