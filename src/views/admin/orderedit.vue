
<template>



    <p class="text-2xl font-bold pt-16  pl-24 text-start ">Order : #{{ orders.id }}<br></p>


    <div  class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-10  mx-20 z-10 ">
        <table class="w-full text-base  text-gray-500 rounded-3xl  " >
            <thead class="bg-gray-800 " >
                <tr class="text-gray-50 text-center">
                    <td class="font-bold pt-5 w-60">Date placed</td>
                    <td class="font-bold pt-5  w-10">ID</td>
                    <td class="font-bold pt-5 w-40">Total amount</td>
                    <td class="font-bold pt-5 w-40">Order status</td>
                    <td></td>
                </tr>
                <tr class="text-gray-50 text-center">
                    <td class="font-normal  pb-5">{{ orders.created_at }}</td>
                    <td class="font-normal pb-5 ">{{ orders.id }}</td>
                    <td class="font-normal pb-5">${{ orders.total }}</td>
                    <td class="font-normal pb-5 text-gray-700 ">
                        <select v-model="orders.status" @input="select" class="p-2 my-4 px-4 border-2 border-pink-600 rounded-xl">
                            <option disabled value="">Please select one</option>
                            <option v-for="statusOption in status" :key="statusOption" :value="statusOption">
                                {{ statusOption }}
                            </option>
                        </select>
                    </td>
                    <td class=""></td>
                </tr>
            </thead>
            <tbody  v-for="store in orders.products" :key="store.store_id">
                <div class="my-4 text-center font-bold text-lg">Store id :{{ store.store_id }}</div>   
                <tr class="text-center">
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Product id
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        
                    </th>
                    <th scope="col" class="px-6 py-3 w-20 bg-gray-50">
                        
                    </th>
                </tr>
                <tr class="border-b border-gray-200 text-center" v-for="product in store.products" :key="product.id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                        {{ product.product_id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ product.price }}
                    </td>
                    <td class="px-6 py-4 bg-gray-50">
                        {{ product.quantity }}
                    </td>
                    <td class="px-6 py-4 " >
                        <router-link :to="{ name: 'productpage', params: { id: product.product_id } }" class="text-pink-600">view</router-link>
                    </td>
                    <td>
                        <button class="font-bold">x</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="updateStatus" class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 my-8 mx-2 rounded-md">
                        Update
        </button>
        <router-link :to="{ name: 'invoices', params: { id: orders.id }}" class="bg-white text-pink-600 hover:bg-pink-700 hover:text-white  font-bold py-2 px-4  rounded-md">
                        invoices
        </router-link>
    </div>



</template>

<script>
import axiosClient from '@/axios';

    export default {
        data(){
            return{
                orders:[],
                products:[],
                status:[
                'pending', 'processing','ready_for_shipment', 'shipped' , 'delivered'
                ],
            }
        },
        async created() {
            const id = this.$route.params.id;
            try {
            const response = await axiosClient.get(`api/admin/orders/${id}`);
            this.products = response.data.data.products;
            this.orders = response.data.data;
            console.log(this.products);
            console.log(this.orders);
            } catch (error) {
            console.error(`There was an error fetching the order: ${error}`);
            }
        },
        methods: {
            updateStatus() {
                console.log(this.orders.status);
                this.order.products = this.orders.products.filter(product => product.id !== productId);

                // After deletion, print the order
                console.log('Order:', this.orders);
                // this.products.forEach(store => {
                //     store.products.forEach(product => {
                //         console.log(`Product ID: ${product.product_id}, Status: ${product.status}`);
                //     });
                // });
            },
}}
</script>

<style lang="scss" scoped>

</style>
