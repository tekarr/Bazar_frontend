<template>


        <!-- delete message -->
        <div v-if="showConfirmationDialog" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-3xl">
            <p class="text-lg"> Are u sure u want to delete ? </p>
                <div class="flex justify-between">
                    <button  @click="confirmDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Delete</button>
                    <button @click="cancelDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Cancel</button>
                </div>
            </div>
        </div>

        <!-- products table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-700  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start">
                            #
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            {{ $t('name') }}
                        </th>
                        <th scope="col" class=" py-3 text-center">
                            {{ $t('Quantity') }}
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            {{ $t('category') }}
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            {{ $t('price') }}
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            {{ $t('status') }}
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
                                <button @click="showConfirmDialog(product.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button> 
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="ml-10 mt-4 pb-4"> 
                <router-link to="/vendor/products/add" class=" ml-2 p-2 px-4 rounded-full bg-pink-600 text-white cursor-pointer">{{ $t('Add product') }}</router-link>
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
            showConfirmationDialog: false,
            productIdToDelete: null,
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
    async deleteProduct(productId) {
        try {
            await axiosClient.delete(`api/vendor/products/${productId}`);

            // Remove the product from the products array
            this.products = this.products.filter(product => product.id !== productId);
        } catch (error) {
            console.error(error);
        }
        },
        editProduct(id) {
            this.$router.push({ name: 'EditProduct', params: { id } });
        },
        showConfirmDialog(productId) {
            this.productIdToDelete = productId;
            this.showConfirmationDialog = true;
        },
        confirmDelete() {
            this.deleteProduct(this.productIdToDelete);
            this.showConfirmationDialog = false;
        },
        cancelDelete() {
            this.showConfirmationDialog = false;
        },
    }
};
</script>

<style lang="scss" scoped>

</style>