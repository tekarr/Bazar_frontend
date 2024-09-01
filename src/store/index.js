import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import axiosClient from "@/axios";


// Define initial state function
const initialState = () => ({
    users: [],
    stores: [],
    products: [],
    orders: [],
    notifications: [],
    categories: [],

});

const store = new Vuex.Store({
    state: initialState(),
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_STORES(state, stores) {
            state.stores = stores;
        },
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },
        SET_NOTIFICATIONS(state, notifications) {
            state.notifications = notifications;
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        RESET_STATE(state) {
            Object.assign(state, initialState());
        }
    },
    getters: {
        users: state => state.users,
        stores: state => state.stores,
        products: state => state.products,
        orders: state => state.orders,
        notifications: state => state.notifications,
        categories: state => state.categories,
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const response = await axiosClient.get('/api/admin/users');
                commit('SET_USERS', response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Optionally, handle error (e.g., show notification)
            }
        },
        async fetchStores({ commit }) {
            try {
                const response = await axiosClient.get('/api/admin/stores');
                commit('SET_STORES', response.data.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
                // Optionally, handle error (e.g., show notification)
            }
        },
        async fetchProducts({ commit }) {
            try {
                const response = await axiosClient.get('/api/admin/products');
                commit('SET_PRODUCTS', response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Optionally, handle error (e.g., show notification)
            }
        },
        async fetchOrders({ commit }) {
            try {
                const response = await axiosClient.get('/api/admin/orders');
                commit('SET_ORDERS', response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                // Optionally, handle error (e.g., show notification)
            }
        },
        async fetchNotifications({ commit }) {
            try {
                const response = await axiosClient.get('/api/admin/notifications');
                commit('SET_NOTIFICATIONS', response.data.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        },
        async fetchCategories({ commit }) {
            try {
                const response = await axiosClient.get('/api/categories');
                commit('SET_CATEGORIES', response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },




        refreshAll({ dispatch }) {
            // Reset the state before refetching
            dispatch('resetState');

            // Fetch new data
            return Promise.all([
                dispatch('fetchUsers'),
                dispatch('fetchStores'),
                dispatch('fetchProducts'),
                dispatch('fetchOrders'),
                dispatch('fetchNotifications'),
                dispatch('fetchCategories'),

                // Add other fetch actions here
            ]);
        },
        resetState({ commit }) {
            commit('RESET_STATE');
        }
    },
    modules: {
        auth,
    }
});


export default store;
