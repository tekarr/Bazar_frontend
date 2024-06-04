<template>

        <!-- Orders table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            id
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Orderd
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            Delivered
                        </th>
                        <th scope="col" class="px-6 py-3">
                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id" class="bg-white " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{order.name}}
                        </th>
                        <td class="px-1 py-4 flex justify-center">
                            {{ order.ordered }}
                        </td>
                        <td class="text-center">
                            {{ order.delivered }}
                        </td>
                        <td class="flex justify-end">
                            <button class="px-4 py-2  bg-gray-100 rounded-3xl">Accept</button>
                            <button class="px-4 py-2 mx-2  rounded-3xl bg-pink-600 text-white">Decline</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
            
</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
    data(){
        return{
            orders:[
                {
                    id:1,
                    name:'WF3001',
                    ordered:'2 houre ago',
                    delivered:'not yet'
                }
            ],
        }
    }
        
    }
</script>

<style lang="scss" scoped>

</style>