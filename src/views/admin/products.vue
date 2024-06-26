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
    <div class="relative overflow-x-auto p-4">
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
                        Store
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        category
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        price
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id" class="bg-white " >
                    <td scope="row" class="px-6 py-8 font-medium text-base w-20">
                        {{product.id}}
                    </td>
                    <td scope="row" class="px-6 py-8  text-base w-60">
                        {{product.name}}
                    </td>
                    <td scope="row" class=" font-normal text-sm text-center">
                        {{product.store}}
                    </td>
                    <td class="px-6 text-center ">
                        {{ product.category }}
                    </td>
                    <td class="px-6 text-center ">
                        {{ product.price }} $
                    </td>
                </tr>
            </tbody>
        </table>


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
    const response = await axiosClient.get('api/admin/products');

    this.products = response.data.data;
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