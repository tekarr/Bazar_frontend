<template>

        <!-- Order table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-sm text-gray-700 uppercase bg-gray-50 ">
                    <tr class="text-center">
                        <th scope="col" class="px-6 py-3 w-10">
                            id
                        </th>
                        <th scope="col" class="px-6 py-3 w-60">
                            status
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            order total
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            payment_method
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            created_at
                        </th>
                        <th scope="col" class="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id" class="bg-white text-center " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{order.id}}
                        </th>
                        <td class="">
                            {{ order.status }}
                        </td>
                        <td class=" ">
                            {{ order.order_total }}
                        </td>
                        <td class=" ">
                            {{ order.payment_method }}
                        </td>
                        <td class="">
                            {{ order.created_att }}
                        </td>
                        <td class="flex justify-center w-20">
                            <button class="px-4 py-2 mr-4 my-2  bg-gray-50 text-pink-600 hover:bg-pink-600 hover:text-white rounded-3xl"> 
                                <router-link :to="{ name: 'Update Order', params: { id: order.id }}">Edit</router-link></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>

<script>
import axiosClient from '@/axios';

    export default {
    data(){
        return{
            orders:[],
        }
    },
    async created() {
    try {
        const response = await axiosClient.get('api/admin/orders');

        this.orders = response.data;
        console.log(this.orders);
        } catch (error) {
        console.error(error);
        }
    },
    }
</script>

<style lang="scss" scoped>

</style>