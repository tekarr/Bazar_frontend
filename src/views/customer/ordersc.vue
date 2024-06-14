<template>


    <p class="text-2xl font-bold pt-48 pl-24 text-start ">Orders<br>
    </p>

    <div class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-10  mx-20 ">
        <table class="w-full text-base text-left rtl:text-right text-gray-500 rounded-3xl mb-20 " v-for="order in orders" :key="order.id">
            <thead class="bg-gray-50 h-32" >
                <tr class="text-gray-700">
                    <td class="font-bold pl-10 pt-5">Date placed</td>
                    <td class="font-bold pt-5">Order status</td>
                    <td class="font-bold pt-5">Total amount</td>
                    <router-link :to="{ name: 'trackorder', params: { id: order.id } }" v-if="order.order_status !== 'Delivered'">
                        <button rowspan="2" class="font-bold hover:bg-gray-700 bg-pink-600 text-white rounded-3xl mt-10 px-10 py-2">track order</button>
                    </router-link> 
                        <button v-else rowspan="2" class="font-bold bg-gray-50 text-pink-600 rounded-3xl mt-10 px-10 py-2">Delivered</button>
                </tr>
                <tr>
                    <td class="font-normal pl-10 pb-5">{{ order.created_at }}</td>
                    <td class="font-normal pb-5 ">{{ order.order_status }}</td>
                    <td class="font-normal pb-5">${{ order.order_total }}</td>
                    <td></td>
                </tr>
                <tr class="bg-white">.</tr>
            </thead>
            <thead class="text-base text-gray-700 uppercase">
                <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Quantity
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-200"  v-for="product in order.products" :key="product.product_id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                        {{ product.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ product.price }}
                    </td>
                    <td class="px-6 py-4 bg-gray-50">
                        {{ product.quantity }}
                    </td>
                    <td class="px-6 py-4" >
                        <router-link :to="{ name: 'productpage', params: { id: product.product_id } }" class="text-pink-600">view</router-link>
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
            const response = await axiosClient.get('api/customer/orders');
            this.orders = response.data.data;
        },
};
</script>

<style lang="scss" scoped>

</style>