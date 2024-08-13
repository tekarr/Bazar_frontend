<template>
    
    <nav v-if="!hiddenRoutes.includes(route.path)" class="bg-white fixed w-full h-28 z-20 top-0 start-0 border-b-4 border-gray-200 rounded-none">
        
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
            <router-link to="/" class="block mt-1 py-2 px-3 text-white bg-pink-700  rounded md:bg-transparent md:text-gray-900 md:p-0   transition-all duration-300 hover:border-b-2 " aria-current="page">{{ $t('home') }}</router-link>
            </li>
            
            <li>
            <router-link class="block py-2 px-3 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0   transition-all duration-300 " to="/about">{{ $t('about') }}</router-link>
            </li>

            <li class="block py-2 px-3 mt-2 text-gray-900 rounded  md:p-0   transition-all duration-300 ">
                <button class="font-bold w-16 hover:text-pink-600 " @click="toggleDropdown">{{ $t('language') }}</button>
                <!-- language menu -->
                <div v-if="showDropdown" class="absolute grid grid-cols-1 bg-white w-24  mt-6 rounded-lg h-16 ">
                    <button class="hover:text-pink-600" @click="changeLocale('en')">English</button>
                    <button class="hover:text-pink-600 mb-2" @click="changeLocale('ar')">Arabic</button>
                </div>
            </li> 
            
            
            <li>
                <router-link to="/cart">
                    <img class="px-3 w-14 hover:cursor-pointer" src="../../assets/icons/carts/shopping-bag.png" alt="cart1">
                    <div class="ml-8">
                        <div  v-show="$route.path !== '/cart' && cart.length > 0"  class="absolute top-14 bg-pink-600 rounded-full w-5 h-5 z-40 flex justify-center items-center text-sm text-white">{{cart.length}}</div>
                    </div>
                </router-link>
            </li>
            

            <li>
                <input
                v-model="searchTerm"
                type="text"
                placeholder="Search..." 
                class="w-full bg-slate-50 mr-32 px-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 invisible " @click="scrollToSpecificPosition" />
                
            </li>

            <li>   
                <button
                class=" px-2 py-2 rounded-3xl  bg-pink-600 hover:bg-pink-700 text-white focus:outline-none invisible "
                @click="clearSearch">
                <img class="w-5" src="../../assets/icons/image.png" alt="Search">
                </button>
            </li> 
            
        </ul>
    </div>
    
    </div>



    <!--side menu -->
    <div class="flex justify-end">
            <div v-if="showMenu" class="mt-6 mr-6 py-2 flex justify-center text-white bg-gray-800 w-40 rounded-2xl">
                <ul>
                    <li class="py-1">
                        <div class="flex justify-between">
                            <div class="grid grid-col-1">
                                <span class="w-18 font-bold">{{username}}</span>
                                <p v-if="vendor" class="">vendor</p>
                                <p v-if="customer" class="">customer</p>
                                <p v-if="admin" class="">admin</p>
                            </div>
                            
                            <button  @click="toggleMenu" class="bg-gray-700 w-6 h-6 rounded-3xl ml-4">x</button>
                        </div>
                    </li>

                    <hr class="my-2">
                    <li class="py-1"><router-link to="/">Shop</router-link></li>
                    <li class="py-1"><router-link to="/cart">Cart</router-link></li>
                    <li class="py-1 " v-if="customer"><router-link to="/customer/profile">Profile</router-link></li>
                    <li class="py-1 " v-if="customer"><router-link to="/customer/notifications">notification</router-link></li>
                    <li class="py-1" v-if="customer"><router-link to="/customer/orders">Orders</router-link></li>
                    <li class="py-1" v-if="customer"><router-link to="/customer/becomevendor" >Become vendor</router-link></li>
                    <li class="py-1" v-if="vendor"><router-link to="/vendor">Dashboard</router-link></li>
                    <li class="py-1" v-if="vendor"><router-link to="/store-page">Store page</router-link></li>
                    <li class="py-1" v-if="admin"><router-link to="/admin">Dashboard</router-link></li>
                    <li class="py-1"><router-link to="/about">About</router-link></li>
                    <li class="py-1 cursor-pointer" @click="logout" >logout</li>
                </ul>
            </div>
        </div>
    </nav>
    
    
</template>
    
    <script>
    import { mapGetters } from 'vuex';
    import cards from './cards.vue';
    export default {
    components: { cards },
    data() {
        return {
        searchTerm: '',
        username:'',
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        selectedLanguage: localStorage.getItem('locale') || 'en',
        showDropdown: false,
        
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        changeLocale(locale) {
        this.$i18n.locale = locale;
        if (locale === 'ar') {
            document.body.setAttribute('dir', 'rtl');
            localStorage.setItem('locale', 'ar');

        } else {
            document.body.removeAttribute('dir');
            localStorage.setItem('locale', 'en');
        }
        },
        applyLocaleSettings() {
            // Apply the locale settings from localStorage when the component is created
            const storedLocale = localStorage.getItem('locale') || 'en';
            this.changeLocale(storedLocale);
        },
        clearSearch() {
        this.searchTerm = '';
        },
        toggleMenu() {
        this.showMenu =!this.showMenu
        },
        scrollToSpecificPosition() {
        const targetPosition = 600; // Desired scroll position in pixels from the top
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth' // Smooth scroll transition
        });
        }
    },
    computed: {
    ...mapGetters('auth', ['authenticated'])
    },
    created() {  
    this.applyLocaleSettings();
    this.cartUpdateInterval = setInterval(() => {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }, 2000);
    },
    onMounted(){
        location.reload();  
    },
    beforeDestroy() {
        clearInterval(this.cartUpdateInterval);
    },
}
    </script>
    <script setup>

    import { ref } from 'vue'
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import { computed, onMounted } from 'vue';

    const store = useStore();
    const showMenu = ref(false);
    const route = useRoute();
    const hiddenRoutes = ['/signin', '/signup'];

    var username = ref('');
    const customer =  ref(false);
    const vendor = ref(false);
    const admin =  ref(false);
    
    const authenticated = computed(() => store.state.auth.authenticated);
    console.log(authenticated.value)

    if (authenticated.value === true){
        store.dispatch('auth/checkAuth').then(() => {
            const userRole = store.state.auth.user.role_id;
            username = store.state.auth.user.name;
            console.log(username);
            console.log(userRole);

            if (userRole === 1) {
                admin.value = true;
            } else if (userRole === 2) {
                vendor.value = true;
            } else if (userRole === 3) {
                customer.value = true;
            }
        });
    }
    
    
    const toggleMenu = () => {
        showMenu.value = !showMenu.value;
    };
    
    
    const logout = async () => {
        await store.dispatch('auth/logout');
        showMenu.value = false;
    };
    
    </script>
    <style lang="scss" scoped>
    
    </style>