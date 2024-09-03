import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import axiosClient from "@/axios";
import admin from "@/store/admin";
import vendor from "@/store/vendor";
// import admin from "@/store/admin";


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

    modules: {
        auth,
        admin,
        vendor
    }
});


export default store;
