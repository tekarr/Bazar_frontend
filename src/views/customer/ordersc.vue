<template>


    <p class="text-2xl font-bold pt-48 pl-24 text-start ">Orders<br>
    </p>

    <div class="relative overflow-x-auto rounded-3xl sm:rounded-lg  mt-10  mx-20">
        <table class="w-full text-base text-left rtl:text-right  text-gray-500 rounded-3xl mb-4 " v-for="order in orders" :key="order.id">
            <thead class="bg-gray-50 h-32" >
                <tr class="text-gray-700 text-center">
                    <td class="font-bold pt-5 w-20">ID</td>
                    <td class="font-bold pt-5">Date placed</td>
                    <td class="font-bold pt-5">Order status</td>
                    <td class="font-bold pt-5">Total amount</td>
                    <div class="flex justify-end mr-10">
                        <div class="flex justify-center ">
                            <router-link :to="{ name: 'orderview', params: { id: order.id } }">
                                <button rowspan="2" class="font-bold mr-4 hover:bg-pink-600 hover:text-white bg-white text-pink-600 w-28 rounded-3xl mt-10 px-10 py-2">view</button>
                            </router-link>
                            <router-link :to="{ name: 'trackorder', params: { id: order.id } }" v-if="order.order_status !== 'Delivered'">
                                <button rowspan="2" class="font-bold hover:bg-pink-700 bg-pink-600 text-white w-48 rounded-3xl mt-10 px-10 py-2">track order</button>
                            </router-link>
                            <button v-else rowspan="2" class="font-bold bg-gray-50 text-pink-600 rounded-3xl mt-10 px-10 py-2">Delivered</button>
                        </div>
                    </div>
                </tr>
                <tr class="text-center">
                    <td class="font-normal pb-5 ">{{ order.id }}</td>
                    <td class="font-normal  pb-5">{{ order.created_at }}</td>
                    <td class="font-normal pb-5 ">{{ order.order_status }}</td>
                    <td class="font-normal pb-5">${{ order.order_total }}</td>
                    <td class=""></td>
                </tr>
            </thead>
        </table>
    </div>

</template>

<script>
import axiosClient from '@/axios';

    export default {
        data(){
            return{
                orders:[],
                product:[],
            }
        },
        async created() {
            const response = await axiosClient.get('api/customer/orders');
            this.orders = response.data.data;
        },
};
</script>

<style lang="scss" scoped>

</style>