<template>



<!-- Alerts: Success -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-3xl">
        <p class="text-lg"> added successfully!</p>
        <button @click="closePopup" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
        </div>
    </div>

    <!-- Navbar -->
    <!-- <nav class="bg-white fixed w-full h-28 z-20 top-0 start-0 border-b-4 border-gray-200 rounded-none">
        
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
    
        <router-link class="flex items-center space-x-3 rtl:space-x-reverse" to="/">
            <img src="../../assets/icons/BAZAR (2).png" class=" h-16" alt="Bazar Logo">
            <span class=" text-black hover:text-pink-600 transition-all duration-200 self-center text-2xl font-semibold whitespace-nowrap ">Bazar</span>
        </router-link>
        
        
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <router-link to="/signin" v-if="!authenticated" class="text-white  bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-400 font-bold rounded-3xl text-sm  px-4 py-2.5 text-center ">Sign in</router-link>
            <button v-if="authenticated" @click="toggleMenu" class="text-gray-800  bg-white border-2 hover:border-pink-600  font-bold rounded-3xl text-base  px-4 py-2.5 text-center ">menu</button>
            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        </div>

        
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
            <router-link to="/" class="block mt-1 py-2 px-3 text-white bg-pink-700  rounded md:bg-transparent md:text-gray-900 md:p-0   transition-all duration-300 hover:border-b-2 " aria-current="page">Shop</router-link>
            </li>
            <li>
            <router-link class="block py-2 px-3 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0   transition-all duration-300 " to="/about">About</router-link>
            </li>
            
            <li>
                <router-link to="/cart"><img class="px-3 w-14 hover:cursor-pointer" src="../../assets/icons/carts/shopping-bag.png" alt="cart1"></router-link>
            </li>

            <li>
                <input
                v-model="searchTerm"
                type="text"
                placeholder="Search..." 
                class="w-full bg-slate-50 mr-32 px-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500  " @click="scrollToSpecificPosition" />
                
            </li>

            <li>   
                <button
                class=" px-2 py-2 rounded-3xl  bg-pink-600 hover:bg-pink-700 text-white focus:outline-none "
                @click="clearSearch">
                <img class="w-5" src="../../assets/icons/image.png" alt="Search">
                </button>
            </li> 
            
        </ul>
    </div>
    
    </div> -->
    <!--Nav menu -->
    <!-- <div class="flex justify-end">
            <div v-if="showMenu" class="mt-6 mr-6 py-2 flex justify-center text-white bg-gray-800 w-40 rounded-2xl">
                <ul>
                    <li class="py-1">
                        <div class="flex justify-between">
                            <span class="w-18">{{username}}</span>
                            <button  @click="toggleMenu" class="bg-gray-700 w-6 h-6 rounded-3xl">x</button>
                        </div>
                    </li>
                    <li class="py-1"><router-link to="/">Shop</router-link></li>
                    <li class="py-1"><router-link to="/cart">Cart</router-link></li>
                    <li class="py-1 "><router-link to="/profile">Profile</router-link></li>
                    <li class="py-1"><router-link to="/trackorder">Track Orders</router-link></li>
                    <li class="py-1"><router-link to="/orderhistory">Order History</router-link></li>
                    <li class="py-1" v-if="customer"><router-link to="/becomevendor" >Become vendor</router-link></li>
                    <li class="py-1" v-if="vendor"><router-link to="/vendor">Dashboard</router-link></li>
                    <li class="py-1" v-if="admin"><router-link to="/admin">Dashboard</router-link></li>
                    <li class="py-1"><router-link to="/about">About</router-link></li>
                    <li class="py-1 cursor-pointer" @click="logout" >logout</li>
                </ul>
            </div>
        </div>
    </nav> -->

    <!-- Cards -->
    <div ref="specificSection" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10 p-4 md:p-8"> 
        <router-link :to="`/product/${card.name}`" class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="card in cards" :key="card.id">
                <img class="h-auto w-full rounded-t-3xl md:rounded-3xl" :src="card.image" alt="">
                <div class="p-4 md:pl-10">
                    <p class="text-lg md:text-2xl font-bold pt-4 md:text-start text-center">{{ card.name }}</p>
                    <p class="pb-1 text-sm md:text-start">{{ card.description }}</p>
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <span class="text-lg md:text-2xl font-bold opacity-30 pb-3 md:pb-0">{{ card.category }}</span>
                    </div>
                </div>
        </router-link>
    </div>
</template>

<script>
import Navbarr from './Navbarr.vue';

    export default {
    components: { Navbarr },
        data(){
        return {   
        showPopup: false,
        showMenu: false,
        username: localStorage.getItem('username'),
        searchTerm:'' ,
    };
    },
    methods:{
        closePopup() {
    this.showPopup = false;
    },
    toggleMenu() {
    this.showMenu =!this.showMenu
    },
    addtocart(){
    },
    clearSearch() {
    this.searchTerm = '';
    },
    scrollToSpecificPosition() {
    const targetPosition = 600; // Desired scroll position in pixels from the top
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' // Smooth scroll transition
    });
    }
    }
}
</script>

<script setup>
import { computed, onMounted } from 'vue';
import { ref } from 'vue'
import {mapActions, useStore} from 'vuex';
import { useRouter } from 'vue-router';
import useProducts from "@/comp/products.js";
import axiosClient from "@/axios";

const store = useStore();
const router = useRouter(); 
const authenticated = computed(() => store.state.auth.authenticated);

const cards = ref([]);
const showMenu = ref(false);
var customer =  ref(false);
var vendor =  ref(false);
var admin =  ref(false);

onMounted( async() => {
    store.dispatch('auth/checkAuth')
    const userRole = store.state.auth.user ? store.state.auth.user.role_id : null;
    console.log(userRole);
});

onMounted(async () => {
    try {
        const response = await axiosClient.get('api/vendor/stores');
        cards.value = Array.of(response.data.data);
        console.log(cards.value);
    } catch (error) {
        console.error(`There was an error fetching the data: ${error}`);
    }
});

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const logout = async () => {
    await store.dispatch('auth/logout');
    showMenu.value = false;
};

// const { products, getProducts } = useProducts();
// const searchTerm = ref('');

// onMounted(() => {
//     getProducts() 
// })

// const filteredItems = () => {
//     return products.value.filter(card =>
//     card.name.toLowerCase().includes(searchTerm.value.toLowerCase())
//     );
// };

</script>

<style lang="scss" scoped>

</style>