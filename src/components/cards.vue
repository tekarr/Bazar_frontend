<template>



<!-- Alerts: Success -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-3xl">
        <p class="text-lg"> added successfully!</p>
        <button @click="closePopup" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
        </div>
    </div>


<!-- Navbar -->
<nav class="bg-white fixed w-full h-28 z-20 top-0 start-0 border-b-4 border-gray-200 rounded-none">
        
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
            <router-link class="block py-2 px-3 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0   transition-all duration-300 " to="/about">About</router-link>
            </li>
            
            <!-- cart -->
            <li>
                <router-link to="/cart"><img class="px-3 w-14 hover:cursor-pointer" src="../assets/icons/carts/shopping-bag.png" alt="cart1"></router-link>
            </li>

            <!-- Search bar -->
            <li>
                <input
                v-model="searchTerm"
                type="text"
                placeholder="Search..." 
                class="w-full bg-slate-50 px-20 py-2 font-bold rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 "  @click="scrollToSection"/>
                
            </li>

            <li>   
                <button
                class=" px-2 py-2 rounded-3xl  bg-pink-600 hover:bg-pink-700 text-white focus:outline-none"
                @click="clearSearch">
                <img class="w-5" src="../assets/icons/image.png" alt="Search">
                </button>
            </li> 

        </ul>
        </div>
    
        </div>
    </nav>



<!-- Cards -->
<div ref="specificSection" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10 p-4 md:p-8"> 
    <router-link :to="`/product/${card.title}`" class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="card in filteredItems" :key="card.id">
        <img class="h-auto w-full rounded-t-3xl md:rounded-3xl" :src="card.image" alt="">
        <div class="p-4 md:pl-10">
            <p class="text-lg md:text-2xl font-bold pt-4 md:text-start text-center">{{ card.title }}</p>
            <p class="pb-1 text-sm md:text-start">{{ card.description }}</p>
            <div class="flex flex-col md:flex-row justify-between items-center">
            <span class="text-lg md:text-2xl font-bold pb-3 md:pb-0">{{ card.price }}$</span>
            <span class="text-lg md:text-2xl font-bold opacity-30 pb-3 md:pb-0">{{ card.store }}</span>
            <router-link to="/" class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 " @click="showPopup = true">Add to Cart</router-link>
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
        searchTerm:'' ,
        cards: [
        {
            id: 1,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
            title: 'Weed',
            description: 'good for ur health',
            price: '95',
            store: 'Store-name'
        },
        {
            id: 2,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
            title: 'Shoes',
            description: 'This is the description for it.',
            price: '10',
            store: 'Store-name'
        },
        {
            id: 3,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
            title: 'Sleep',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 4,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
            title: 'Plant',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 5,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
            title: 'Watch',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 6,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
            title: 'Shoes',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 7,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
            title: 'Cream',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 8,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
            title: 'Sleap',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 9,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
            title: 'Lamp',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 10,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
            title: 'Power supply',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id:11,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
            title: 'Controller',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 12,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
            title: 'Bag',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        ]
    };
    },
    computed: {
        filteredItems() {
        return this.cards.filter(card => card.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
        },
    },
    methods:{
        closePopup() {
    this.showPopup = false;
    },
    addtocart(){

    },
    clearSearch() {
    this.searchTerm = '';
    },
    scrollToSection() {
    const specificSection = this.$refs.specificSection;
    const sectionPosition = specificSection.offsetTop - 110;
    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
    }
    }
}
</script>

<style lang="scss" scoped>

</style>