<template>

    <p class="text-2xl font-bold pt-16  pl-24 text-start ">Order : #{{ orders.id }}<br></p>

    <div  class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-10  mx-20 z-10 ">
        <table class="w-full text-base text-left rtl:text-right text-gray-500 rounded-3xl mb-20 ">
            <thead class="bg-gray-50 h-32" >
                <tr class="text-gray-700 text-center">
                    <td class="font-bold pt-5 w-4">ID</td>
                    <td class="font-bold pt-5">Date placed</td>
                    <td class="font-bold pt-5">Order status</td>
                    <td class="font-bold pt-5">Total amount</td>
                </tr>
                <tr class="text-center">
                    <td class="font-normal pb-5 text-center">{{ orders.id }}</td>
                    <td class="font-normal  pb-5">{{ orders.created_at }}</td>
                    <td class="font-normal pb-5 ">{{ orders.order_status }}</td>
                    <td class="font-normal pb-5">${{  calculateTotalAmount }}</td>
                    <td class=""></td>
                </tr>
                <tr class="bg-gray-100">.</tr>
            </thead>
            <thead class="text-base text-gray-700 uppercase">
                <tr class="text-center">
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
                <tr class="border-b border-gray-200 text-center" v-for="product in products" :key="product.product_id">
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
                products:[],
            }
        },
        async created() {
            const id = this.$route.params.id;
            try {
            const response = await axiosClient.get(`api/vendor/orders/${id}`);
            this.products = response.data.data.products;
            this.orders = response.data.data;
            console.log(this.products);
            console.log(this.orders);
            } catch (error) {
            console.error(`There was an error fetching the order: ${error}`);
            }
        },
        computed: {
            calculateTotalAmount() {
                let total = 0;
                this.products.forEach(product => {
                    total += product.price * product.quantity;
                });
                return total.toFixed(2);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>