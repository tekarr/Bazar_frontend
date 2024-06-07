<template>


        <!-- products table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start">
                            name
                        </th>
                        <th scope="col" class=" py-3 text-start">
                            description
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            category
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            price
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            status
                        </th>
                        <th scope="col" class="px-6 py-3">
                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" class="bg-white " >
                        <th scope="row" class="px-6 py-8 font-medium text-base">
                            {{product.name}}
                        </th>
                        <th scope="row" class=" font-normal text-sm">
                            {{product.description}}
                        </th>
                        <td class="px-6  ">
                            {{ product.category }}
                        </td>
                        <td class="px-6  ">
                            {{ product.price }}
                        </td>
                        <td class="px-6 ">
                            {{ product.status }}
                        </td>
                        <td class="flex justify-center">
                            <button class="px-4 py-2 mt-2  bg-gray-100 rounded-3xl">Edit</button>
                            <button @click="deleteProduct(product.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl bg-pink-600 text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="ml-10 mt-4 pb-4"> 
                <router-link to="/vendor/products/add" class=" ml-2 p-2 px-4 rounded-full bg-pink-600 text-white cursor-pointer">Add product</router-link>
            </div>

        </div>



</template>

<script>
import axiosClient from "@/axios";
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
    data() {
        return {
            products:[],
        };
    },
    async created() {
    try {
        const response = await axiosClient.get('api/vendor/products');

        this.products = response.data.data[0];
        console.log(this.products);
        } catch (error) {
        console.error(error);
        }
    },
    methods: {
    async deleteProduct(id) {
        try {
            await axiosClient.delete(`api/vendor/products/${id}`);

            // Remove the product from the products array
            this.products = this.products.filter(product => product.id !== id);
        } catch (error) {
            console.error(error);
        }
        }
    }
    };
</script>

<style lang="scss" scoped>

</style>