import axiosClient from "@/axios";

const state = () => ({
    orders: [],
    order: [],
    categories: [],
    notifications: [],
products: [],
    product: [],

});
const mutations = {

    SET_ORDERS(state, orders) {
        state.orders = orders;
    },
    SET_ORDER(state, order) {
        state.order = order;
    },

    SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications;
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_PRODUCT(state, product) {
        state.product = product;
    },
    RESET_STATE(state) {
        state.orders = [];
        state.order = [];
        state.notifications = [];
        state.categories = [];
        state.products = [];
    },


};
const actions = {
    async fetchOrders({ commit }) {
        try {
            const response = await axiosClient.get('/api/vendor/orders');
            commit('SET_ORDERS', response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    },
    async fetchOrder({ commit }, id) {
        try {
            const response = await axiosClient.get(`/api/vendor/orders/${id}`);
            commit('SET_ORDER', response.data.data);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching order:', error)
    }
    },
    async fetchNotifications({ commit }) {
        try {
            const response = await axiosClient.get('/api/vendor/notifications');
            commit('SET_NOTIFICATIONS', response.data.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    },
    async fetchCategories({ commit }) {
        try {
            const response = await axiosClient.get('/api/categories');
            commit('SET_CATEGORIES', response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    },
    async fetchProducts({ commit }) {
        try {
            const response = await axiosClient.get('/api/vendor/products');
            commit('SET_PRODUCTS', response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },


    resetState({ commit }) {
        commit('RESET_STATE');
    },

    refreshAll({ dispatch }) {
        // Reset the state before refetching
        dispatch('resetState');

        // Fetch new data
        return Promise.all([

            dispatch('fetchOrders'),

            dispatch('fetchNotifications'),
            dispatch('fetchCategories'),
            dispatch('fetchProducts')

            // Add other fetch actions here
        ]);
    }
};
const getters = {
    orders: state => state.orders,
    order: state => state.order,
    notifications: state => state.notifications,
    categories: state => state.categories,
    products: state => state.products,
    product: state => state.product,




};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
