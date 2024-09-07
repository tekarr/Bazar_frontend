import axiosClient from "@/axios";

const state = () => ({
    users: [],
    stores: [],
    products: [],
    orders: [],
    notifications: [],
    pagination: {
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        total: 0
    },
    filters: {

    },
    categories: [],
});
const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_FILTERS(state, filters) {
        state.filters = filters;
    },
    SET_STORES(state, stores) {
        state.stores = stores;
    },
    SET_PRODUCTS(state,  data) {
        state.products = data;

    },
    SET_ORDERS(state, data) {
        state.orders = data;

    },
    SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications;
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_PAGINATION(state, meta) {
        state.pagination = {
            currentPage: meta.current_page,
            lastPage: meta.last_page,
            perPage: meta.per_page,
            total: meta.total
        };
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
    async fetchUsers({ commit, state }, page = 1) {
        try {
            const response = await axiosClient.get('/api/admin/users',{
                params: {
                    ...state.filters,
                    page,
                    perPage: state.pagination.perPage
                }
            });
            commit('SET_USERS', response.data.data);
            commit('SET_PAGINATION', response.data.meta);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
    async fetchStores({ commit, state }, page = 1) {
        try {
            const response = await axiosClient.get('/api/admin/stores',
                {
                    params: {
                        ...state.filters,
                        page,
                        perPage: state.pagination.perPage
                    }
                });
            commit('SET_STORES', response.data.data);
            console.log(response.data);
            commit('SET_PAGINATION', response.data.meta);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    },
    async fetchProducts({ commit, state }, page = 1) {
        try {
            const response = await axiosClient.get('/api/admin/products', {
                params: {
                    ...state.filters,
                    page,
                    perPage: state.pagination.perPage
                }
            });
            console.log(response.data.data);
            commit('SET_PRODUCTS', response.data.data);
            commit('SET_PAGINATION', response.data.meta);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
    async fetchOrders({ commit, state }, page = 1) {
        try {
            const response = await axiosClient.get(`/api/admin/orders`,
                {
                    params: {
                        ...state.filters,
                        page,
                        perPage: state.pagination.perPage
                    }
                });

            commit('SET_ORDERS',response.data.data);
            commit('SET_PAGINATION', response.data);
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
    async fetchCategories({ commit }) {
        try {
            const response = await axiosClient.get('/api/categories');
            commit('SET_CATEGORIES', response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);

    }},
    resetState({ commit }) {
        commit('RESET_STATE');
    },
    setFilters({ commit, dispatch }, filters) {
        commit('SET_FILTERS', filters);

    },
  async  refreshAll({ dispatch }) {
        // Reset the state before refetching
        dispatch('resetState');

        // Fetch new data
        return  Promise.all([
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
    pagination: state => state.pagination,
    filteredOrders: state => state.orders,


};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

