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

        <!-- Stores table -->
        <div class="relative overflow-x-auto p-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start">
                            id
                        </th>
                        <th scope="col" class="px-6 py-3">
                            name
                        </th>
                        <th scope="col" class="px-6">
                            category
                        </th>
                        <th scope="col" class="px-6">
                            products
                        </th>
                        <th scope="col" class="px-6">
                            orders
                        </th>
                        <th scope="col" class="">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="store in stores" :key="store.id" class="bg-white text-black " >
                        <td scope="row" class="px-6 py-8 font-medium text-base">
                            {{store.id}}
                        </td>
                        <td  class="px-6 py-4 font-medium ">
                            {{store.name}}
                        </td>
                        <td class=" px-6 py-4">
                            {{store.category}}
                        </td>
                        <td class=" px-6 py-4">
                            {{store.products}}
                        </td>
                        <td class=" px-6 py-4">
                            {{store.orders}}
                        </td>
                        <td class="px-1 py-4 flex justify-end">
                            <div class="px-2 flex justify-center items-center">
                                <button  @click="editStore(store.id)" class="px-4 py-2 mt-2  bg-gray-100 hover:bg-pink-600 hover:text-white rounded-3xl">Edit</button>
                                <button @click="showConfirmDialog(store.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button> 
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
</template>

<script>
import axiosClient from '@/axios'
    export default {
    data(){
        return{
            stores:[],
            imageUrl: null,
            showConfirmationDialog: false,
            storeIdToDelete: null,
        }
    },
    async created() {
    try {
        const response = await axiosClient.get('api/admin/stores');
        this.stores = response.data.data;
        console.log(this.stores);
    } catch (error) {
        console.error(error);
    }
    },
    methods:{
        async deletestore(storeId) {
        try {
            await axiosClient.delete(`api/admin/stores/${storeId}`);

            // Remove the product from the products array
            this.stores = this.stores.filter(store => store.id !== storeId);
        } catch (error) {
            console.error(error);
        }
        },
        editStore(id) {
            this.$router.push({ name: 'EditStore', params: { id } });
            console.log(id)
        },
        showConfirmDialog(storeId) {
            this.storeIdToDelete = storeId;
            this.showConfirmationDialog = true;
        },
        confirmDelete() {
            this.deletestore(this.storeIdToDelete);
            this.showConfirmationDialog = false;
        },
        cancelDelete() {
            this.showConfirmationDialog = false;
        },
    }
    }
</script>

<style lang="scss" scoped>

</style>