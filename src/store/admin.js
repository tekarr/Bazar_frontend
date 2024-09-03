import axiosClient from "@/axios";

const state = () => ({
    users: [],
    stores: [],
    products: [],
    orders: [],
    notifications: [],
});

const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_STORES(state, stores) {
        state.stores = stores;
    },
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_ORDERS(state, orders) {
        state.orders = orders;
    },
    SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications;
    },
    RESET_STATE(state) {
        state.users = [];
        state.stores = [];
        state.products = [];
        state.orders = [];
        state.notifications = [];
    },
};

const actions = {
    async fetchUsers({ commit }) {
        try {
            const response = await axiosClient.get('/api/admin/users');
            commit('SET_USERS', response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
    async fetchStores({ commit }) {
        try {
            const response = await axiosClient.get('/api/admin/stores');
            commit('SET_STORES', response.data.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    },
    async fetchProducts({ commit }) {
        try {
            const response = await axiosClient.get('/api/admin/products');
            commit('SET_PRODUCTS', response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
    async fetchOrders({ commit }) {
        try {
            const response = await axiosClient.get('/api/admin/orders');
            commit('SET_ORDERS', response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
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
    resetState({ commit }) {
        commit('RESET_STATE');
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

};

const getters = {
    users: state => state.users,
    stores: state => state.stores,
    products: state => state.products,
    orders: state => state.orders,
    notifications: state => state.notifications,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
