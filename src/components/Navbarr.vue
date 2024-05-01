<template>
    
    <nav class="bg-white fixed w-full z-20 top-0 start-0 border-b-4 border-gray-200 rounded-none">
        
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
    
        <router-link class="flex items-center space-x-3 rtl:space-x-reverse" to="/">
            <img src="../assets/icons/BAZAR (2).png" class=" h-16" alt="Bazar Logo">
            <span class=" text-black hover:text-pink-600 transition-all duration-200 self-center text-2xl font-semibold whitespace-nowrap ">Bazar</span>
        </router-link>
        
        
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <router-link to="/signup" class="text-white  bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-400 font-bold rounded-3xl text-sm  px-4 py-2.5 text-center ">Sign up</router-link>
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
            <router-link class="block py-2 px-3 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0   transition-all duration-300" to="/about">About</router-link>
            </li>
            
            <li class="fixed top-1 right-80 flex items-center justify-center w-auto h-28 z-40 ">
                <img class="px-3 w-14 hover:cursor-pointer" src="../assets/icons/carts/shopping-bag.png" alt="cart1" >
            </li>

            <li>
                <input
                v-model="searchTerm"
                type="text"
                placeholder="Search..." 
                class="w-full bg-slate-50 px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 invisible "/>
                
            </li>

            <li>   
                <button
                class=" px-2 py-2 rounded-3xl  bg-pink-600 hover:bg-pink-700 text-white focus:outline-none invisible"
                @click="clearSearch">
                <img class="w-5" src="../assets/icons/image.png" alt="Search">
                </button>
            </li> 

        </ul>
        </div>
    
        </div>
    </nav>
    
</template>
    
    <script>
    export default {
    data() {
        return {
        searchTerm: ''
        };
    },
    methods: {
        clearSearch() {
        this.searchTerm = '';
        }
    } 
}
    </script>
    
    <style lang="scss" scoped>
    
    </style>