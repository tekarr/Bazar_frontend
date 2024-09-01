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
        authenticated : !!localStorage.getItem('token'),
        user_role: 0,
        errorMessage: null,
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
            state.user_role = token ? state.user_role : 0; // Set the role to 0 if there's no token
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_Authenticated(state, authenticated) {
            state.authenticated = authenticated;
        },
        SET_USER_ROLE(state, role) {
            state.user_role = role;
        },

        CLEAR_AUTH_DATA(state) {
            state.token = '';
            localStorage.removeItem('token');
            state.authenticated = false;
            state.user = null;
        },


    },
    actions:{
        fetchUser({ commit }) {
            return axiosClient.get('/api/user')
                .then(response => {
                    commit('SET_USER', response.data.data);
                    console.log('User data fetched:', response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    throw error;
                });

        },
        login({ commit }, credentials) {
        return      axios.post('http://localhost:8000/login', credentials)
                .then((response ) => {
                    commit('SET_TOKEN', response.data.token);
                    commit('SET_USER', response.data.user);
                    commit('SET_Authenticated', true);
                    redirectToDashboard(response.data.user);
                    console.log('User data fetched:', response.data.user);

                    // router.push({ name: 'Admin' });
                })
                .catch(error => {
                    console.log('Error:', error.response.data);
                    throw error;
                    //localStorage.setItem('errorMessage', error.response.data.message);
                    //console.log('Error:', error.response.data.message);
                });
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(() => {
                    commit('CLEAR_AUTH_DATA');

                }).catch(error => {
                    console.error('Error logging out:', error);
                    router.push('/error');
                });
        },

        register({ commit }, credentials) {
            return axios.post('http://localhost:8000/register', credentials )
                .then(( response ) => {
                    commit('SET_USER', response.data.user);
                    commit('SET_TOKEN', response.data.token);
                    commit('SET_Authenticated', true);
                    redirectToDashboard(response.data.user);
                    console.log('User data fetched:', response.data.user);
                })
                .catch(error => {
                    throw error;
                    //console.log('Error:', error.response.data);
                    if (error.response.data.errors) {
                        // console.log('Error:', error.response.data.errors);

                        // console.log('Error:', error.response.data.errors);
                    }
                });
        },


        checkAuth({ commit }) {
            if (store.state.auth.authenticated && store.state.auth.user) {
                return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token');

                if (!token) {
                    // If there's no token, reject the promise
                    commit('CLEAR_AUTH_DATA');
                    router.push('/'); // Redirect to the login page or home
                    return reject(new Error('No token found'));
                }

                // If there's a token, fetch user data
                 axiosClient.get('/api/user')
                    .then(response => {
                        commit('SET_USER', response.data.data);
                        commit('SET_Authenticated', true);
                        console.log('User data fetched from checkAuth:', response.data);
                        resolve();
                    })
                    .catch(error => {
                        commit('CLEAR_AUTH_DATA');
                        console.error('Error fetching user data:', error);
                        return Promise.reject(error);
                    });
            });
        }

    },

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
        default :
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
