<template>

    <div>
        <!-- Alerts: Success -->
        <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-3xl">
            <p class="text-lg"> added successfully!</p>
            <button @click="showPopup = false" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
            </div>
        </div>

        <!-- store -->
        <div>
            <div class="flex justify-center mt-36">
                <div class="mx-8 my-1  w-full flex justify-center h-96 bg-gray-900 rounded-3xl overflow-hidden">
                    <img class="rounded-3xl w-full h-full object-cover" :src="store.image" alt="">
                </div>
            </div>
            <div class="ml-12 m-4"><span class="text-2xl font-bold">{{ store.name }}</span></div>
            <div class="mt-4">
                <p class="ml-12 ">{{ store.description }}</p>
            </div>
            <div class="ml-12 m-4 flex justify-between w-48 mb-8 ">
                <span>Open : 2am</span>
                <span>Close : 4pm </span>
            </div>
        </div>

        <!-- products -->
        <div ref="specificSection" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10 p-4 md:p-8"> 
            <router-link :to="{ name: 'productpage', params: { id: product.id } }" class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="product in products" :key="product.id">
                <img class="h-auto w-full rounded-t-3xl md:rounded-3xl" :src="product.image" alt="">
                <div class="p-4 md:pl-10">
                    <p class="text-lg md:text-2xl font-bold pt-4 md:text-start text-center">{{ product.name }}</p>
                    <p class="pb-1 text-sm md:text-start">{{ product.desc }}</p>
                    <div class="flex flex-col md:flex-row justify-between items-center">
                    <span class="text-lg md:text-2xl font-bold pb-3 md:pb-0">{{ product.price }}$</span>
                    <span class="text-lg md:text-2xl font-bold opacity-30 pb-3 md:pb-0">{{ product.store }}</span>
                    <button class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 " 
                    @click="showPopup = true">Add to Cart
                    </button>
                    </div>
                </div>
            </router-link>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import store from '@/store'
import axiosClient from '@/axios';

export default {
    data() {
        return {
            products: [],
            store: [], 
            showPopup:false,
            // your existing data properties
        };
    },
    async created() {
        const id = this.$route.params.id;
        try {
            const response = await axiosClient.get(`api/stores/${id}/products`);
            this.products = response.data.data.products;
            this.store = response.data.data;
            console.log(this.products)
            console.log(this.stores)
        } catch (error) {
            console.error(`There was an error fetching the products: ${error}`);
        }
    },
    // your existing methods
}

</script>

<style scoped>
/* Add your custom styles here */
</style>