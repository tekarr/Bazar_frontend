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
        <div ref="specificSection" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10 p-4 md:p-8"> 
            <router-link :to="`/store-page`" class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="store in stores" :key="store.id">
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
    selectedCategoryId: null
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
    async allCategories() {
        try {
            const response = await axiosClient.get('api/stores');
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

<style lang="scss" scoped>

</style>