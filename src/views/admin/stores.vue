<template>

        <!-- Stores table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            name
                        </th>
                        <th scope="col" class="">
                            open
                        </th>
                        <th scope="col" class="">
                            close
                        </th>
                        <th scope="col" class="">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="store in stores" :key="store.id" class="bg-white " >
                        <td  class="px-6 py-4 font-medium ">
                            {{store.name}}
                        </td>
                        <td class=" flex justify-start">
                            8 am
                        </td>
                        <td>
                            10 pm
                        </td>
                        <td class="px-1 py-4 flex justify-end">
                            <router-link to="/admin/store/edit">
                                <button class="px-4 py-2  bg-gray-100 rounded-3xl">Edit</button>
                            </router-link>
                            <button class="px-4 py-2 mx-2  rounded-3xl bg-pink-600 text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <router-link to="/admin/store/add">
                <button class="px-4 mx-4 py-2 mt-2 bg-pink-600 rounded-3xl text-white">Add Store</button>
            </router-link>
        </div>
        
</template>

<script>
import Sidbar from '@/components/admin/Sidbar.vue'
import Navbar from '@/components/admin/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
    data(){
        return{
            stores:[
                {
                    id:1,
                    name:'storename',
                }
            ],
        }
    }
        
    }
</script>

<style lang="scss" scoped>

</style>