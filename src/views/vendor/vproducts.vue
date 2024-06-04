<template>


        <!-- products table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start">
                            id
                        </th>
                        <th scope="col" class=" py-3 text-start">
                            name
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            price
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            Qt
                        </th>
                        <th scope="col" class="px-6 py-3 text-start">
                            active
                        </th>
                        <th scope="col" class="px-6 py-3">
                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" class="bg-white " >
                        <th scope="row" class="px-6 py-4 font-medium ">
                            {{product.id}}
                        </th>
                        <th scope="row" class=" font-medium  ">
                            {{product.name}}
                        </th>
                        <td class="px-6  ">
                            {{ product.price }}
                        </td>
                        <td class="px-6 ">
                            {{ product.qt }}
                        </td>
                        <td class="px-6">
                            {{ product.active }}
                        </td>
                        <td class="flex justify-end">
                            <button class="px-4 py-2 mt-2  bg-gray-100 rounded-3xl">Edit</button>
                            <button class="px-4 py-2 mx-2 mt-2 rounded-3xl bg-pink-600 text-white">Delete</button>
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
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
    data() {
        return {
            products:[
                {
                    id:'WF3001',
                    name:'smart phone',
                    price:'30',
                    qt:'4',
                    active:true,

                }
            ],
        }
    }
        
    }
</script>

<style lang="scss" scoped>

</style>