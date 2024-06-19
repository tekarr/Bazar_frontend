<template>

        <!-- Stores table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6">
                            image
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
                        <td class="px-6 py-3">
                            <img class="rounded-xl w-20 h-20 object-cover" :src="store.image" alt="">
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
                            <router-link to="/admin/store/edit">
                                <button class="px-4 py-2  bg-gray-100 rounded-3xl">Edit</button>
                            </router-link>
                            <button class="px-4 py-2 mx-2  rounded-3xl bg-pink-600 text-white">x</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <router-link to="/admin/store/add">
                <button class="px-4 mx-4 py-2 mt-2 text-pink-600 rounded-3xl font-medium">Add Store</button>
            </router-link>
        </div>
        
</template>

<script>
import axiosClient from '@/axios'
    export default {
    data(){
        return{
            stores:[],
            imageUrl: null,
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
    }
</script>

<style lang="scss" scoped>

</style>