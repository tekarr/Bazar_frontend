
<template>



    <p class="text-2xl font-bold pt-16  pl-24 text-start ">Order : #{{ orders.id }}<br></p>

    <div class="flex justify-start">
    <button @click="updateStatus" class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2  my-8 mx-2  w-80 ml-20 rounded-md">
                        Update
    </button>
    <router-link :to="{ name: 'invoices', params: { id: orders.id }}" class="bg-white text-pink-600 hover:bg-pink-700 hover:text-white  font-bold py-2  my-8 h-10 w-80  text-center rounded-md">
                    invoices
    </router-link>
    </div>

    <div  class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-2  mx-20 z-10 ">
        <table class="w-full text-base  text-gray-500 rounded-3xl  " >
            <thead class="bg-gray-800 " >
                <tr class="text-gray-50 text-center">
                    <td></td>
                    <td class="font-bold pt-5 w-60">Date placed</td>
                    <td class="font-bold pt-5  w-10">ID</td>
                    <td class="font-bold pt-5 w-40">Total amount</td>
                    <td class="w-4"></td>
                    <td class="font-bold pt-5 w-40">Order status</td>
                    <td></td>
                </tr>
                <tr class="text-gray-50 text-center">
                    <td></td>
                    <td class="font-normal  pb-5 ">{{ orders.created_at }}</td>
                    <td class="font-normal pb-5 ">{{ orders.id }}</td>
                    <td class="font-normal pb-5">${{ orders.order_total }}</td>
                    <td class="w-4"></td>
                    <td class="font-normal pb-5 text-gray-700 ">
                        <select v-model="orders.order_status" @input="select" class="p-2 my-4 px-4 border-2 border-pink-600 rounded-xl">
                            <option disabled value="pending">pending</option>
                            <option v-for="statusOption in status" :key="statusOption" :value="statusOption">
                                {{ statusOption }}
                            </option>
                        </select>
                    </td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <div class="my-4 text-center font-bold text-lg"></div>   
                <tr class="text-center">
                    <th scope="col" class="px-6 py-3 w-10">
                        Product id
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3 w-80">
                        Store name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        
                    </th>
                </tr>
                <tr class="border-b border-gray-200 text-center" v-for="product in orders.products" :key="product.id">
                    <td>
                        {{ product.product_id }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                        {{ product.product_name }}
                    </th>
                    <td>
                        {{ product.store_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ product.price }}
                    </td>
                    <td class="px-6 py-4 bg-gray-50">
                        {{ product.quantity }}
                    </td>
                    <td>
                        <select v-model="product.product_status" @input="select" class="p-2 my-4 px-2 border-2 w-32 border-pink-600 rounded-xl">
                            <option disabled value="pending">pending</option>
                            <option v-for="statusOption in product_status" :key="statusOption" :value="statusOption">
                                {{ statusOption }}
                            </option>
                        </select>
                    </td>
                    <td class="px-6 py-4 " >
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
                status:[
                'ready_for_shipment', 'in_the_way' , 'delivered' , 'cancelled'
                ],
                product_status :['in_stock']
            }
        },
        async created() {
            const id = this.$route.params.id;
            try {
            const response = await axiosClient.get(`api/admin/orders/${id}`);
            this.products = response.data.products;
            this.orders = response.data.data;
            //console.log(this.products);
            console.log(this.orders);
            //console.log(response.data);
            } catch (error) {
            console.error(`There was an error fetching the order: ${error}`);
            }
        },
        methods: {
            async updateStatus() {
            const orderId = this.$route.params.id;
            const orderStatus = this.orders.order_status;

            if (orderStatus === 'ready_for_shipment') {
                const allProductsInStock = this.orders.products.every(product => product.product_status === 'in_stock');
                if (!allProductsInStock) {
                    alert('Please set all product statuses to "in_stock" ');
                    return;
                }
            }

            if (orderStatus !== 'pending') {
            try {
                const response = await axiosClient.put(`api/admin/orders/${orderId}/status`, {
                    status: orderStatus,
                });

                console.log(response);
                console.log('Order status updated successfully!');
                
                
                
            } catch (error) {
                console.error(`There was an error updating the order status: ${error}`);
            }
            }

            // Update product status
            this.orders.products.forEach(async (product) => {
                if (product.product_status !== 'pending') {
                try {
                    const response = await axiosClient.put(`api/admin/orders/${orderId}/products/${product.product_id}/status`, {
                    status: product.product_status,
                    });

                    console.log(response);
                    console.log(`Product ${product.product_id} status updated successfully!`);
                } catch (error) {
                    console.error(`There was an error updating the product ${product.product_id} status: ${error}`);
                }
                }
            });
        },
}}

</script>

<style lang="scss" scoped>

</style>
