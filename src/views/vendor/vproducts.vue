<template>


        <!-- products table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-700  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start">
                            id
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            name
                        </th>
                        <th scope="col" class=" py-3 text-center">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            category
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            price
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            status
                        </th>
                        <th scope="col" class="px-6 py-3">
                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" class="bg-white " >
                        <td scope="row" class="px-6 py-8 font-medium text-base w-20">
                            {{product.id}}
                        </td>
                        <td scope="row" class="px-6 py-8  text-base w-20">
                            {{product.name}}
                        </td>
                        <td scope="row" class=" font-normal text-sm text-center">
                            {{product.quantity}}
                        </td>
                        <td class="px-6 text-center ">
                            {{ product.category }}
                        </td>
                        <td class="px-6 text-center ">
                            {{ product.price }} $
                        </td>
                        <td class="px-6 text-center">
                            {{ product.status }}
                        </td>
                        <td>
                            <div class="px-2 flex justify-center items-center">
                                <button  @click="editProduct(product.id)" class="px-4 py-2 mt-2  bg-gray-100 hover:bg-pink-600 hover:text-white rounded-3xl">Edit</button>
                                <button @click="deleteProduct(product.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button>
                            </div>
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
        },
        editProduct(id) {
            this.$router.push({ name: 'EditProduct', params: { id } });
        },    
    }
};
</script>

<style lang="scss" scoped>

</style>