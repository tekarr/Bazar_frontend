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
                            payment_method
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            payment_status
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            created_att
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                            status
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="orders.length === 0">
                        <td colspan="6" class="text-center pt-4">
                            <p class="text-lg font-bold">No orders found.</p>
                        </td>
                    </tr>
                    <tr v-for="order in orders" :key="order.id" class="bg-white " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{order.id}}
                        </th>
                        <td class="text-center">
                            {{ order.payment_method }}
                        </td>
                        <td class="text-center">
                            {{ order.payment_status }}
                        </td>
                        <td class="text-center">
                            {{ order.created_att }}
                        </td>
                        <td class="text-center">
                            {{ order.status }}
                        </td>
                        <td class="text-center">
                            <button @click="vieworder(order.id)" class="px-4 py-2 mt-2  bg-gray-100 hover:bg-pink-600 hover:text-white rounded-3xl">view</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
            
</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
import axiosClient from '@/axios'

    export default {
    components: { Sidbar, Navbar },
    data(){
        return{
            orders:[],
        }
    },
    async created() {

    try {
        const response = await axiosClient.get('api/vendor/orders');

        if (Array.isArray(response.data)) {
            this.orders = response.data;
        } else {
            this.orders = []; // or some other default value
        }

        console.log(this.orders);
        } catch (error) {
        console.error(error);
        }
    },
    methods:{
    vieworder(id) {
            this.$router.push({ name: 'view order', params: { id } });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>