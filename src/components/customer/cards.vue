<template>

    <div>
        <deals/>

        <!-- categories -->
        <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button ref="focusButton" @click="allCategories" class="focus:text-pink-600  border focus:border-pink-600  hover:border-pink-500 bg-white focus:ring-2 focus:outline-none focus:ring-white rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3" >All categories</button>
        <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" type="button" class="focus:text-pink-600  border focus:border-pink-600  hover:border-pink-500 bg-white focus:ring-2 focus:outline-none focus:ring-white rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">
            {{ category.name }}
        </button>
        </div>

        <!-- Stores -->
        
        <div ref="specificSection" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10 p-4 md:p-8" :key="activePage"> 
            <router-link :to="{ name: 'StorePage', params: { id: store.id } }" class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="store in stores" :key="store.id">
                    <img class="h-auto w-full rounded-t-3xl md:rounded-3xl" :src="store.image" alt="">
                    <div class="p-4 md:pl-10">
                        <p class="text-lg md:text-2xl font-bold pt-4 md:text-start text-center">{{ store.name }}</p>
                        <p class="pb-1 text-sm md:text-start">{{ store.description }}</p>
                        <div class="flex flex-col md:flex-row justify-between items-center">
                            <span class="text-lg md:text-2xl font-bold opacity-30 pb-3 md:pb-0">{{ store.category }}</span>
                        </div>
                    </div>
            </router-link>
        </div>
        
    </div>

    <!-- pages -->
    <div class="flex justify-center p-5">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
            <li class="me-2" v-for="page in 5" :key="page">
                <button 
                    class="inline-block px-4 py-2.5 rounded-3xl font-bold" 
                    :class="{
                        'text-white bg-pink-600 active focus:bg-pink-600 focus:text-white': page === activePage,
                        'hover:text-gray-900 hover:bg-gray-100': page !== 5,
                        'text-gray-400 cursor-not-allowed': page === 5
                    }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </button>
            </li>
        </ul>
    </div>

</template>

<script>
import axiosClient from '@/axios';
import deals from './deals.vue';

export default {
    components: { deals },
data() {
    return {
    categories: [],
    stores: [],
    selectedCategoryId: null,
    activePage: 1
    }
},
async created() {
    try {
    const response = await axiosClient.get('api/categories');
    this.categories = response.data;
    } catch (error) {
    console.error(`There was an error fetching the categories: ${error}`);
    }
    this.allCategories();
    this.$refs.focusButton.focus();
},
methods: {
    changePage(page) {
        this.activePage = page;
        this.allCategories();
        window.scrollTo({ top: 400 });
    },
    async allCategories() {
        try {
            const response = await axiosClient.get(`api/stores?page=${this.activePage}`);
            this.stores = response.data.data;
            console.log(this.stores)
        } catch (error) {
            console.error(`There was an error fetching all stores: ${error}`);
        }
    },
    async selectCategory(id) {
    this.selectedCategoryId = id;
    try {
        const response = await axiosClient.get(`api/categories/${id}/stores`);
        this.stores = response.data.data.stores;
        console.log(this.stores)
    } catch (error) {
        console.error(`There was an error fetching the stores: ${error}`);
    }
    }
}
}
</script>

<style  scoped>

</style>