
<template>



    <p class="text-2xl font-bold pt-16   text-start ">Order : #{{ orders.id }}<br></p>

    <!-- error massege -->
    <div v-if="errMsg" class="flex items-center justify-between p-3 my-2 mb-6 bg-red-600 text-white rounded">
        <div>
            <div v-for="(errors, field) in errMsg" :key="field" class="text-sm">
            <strong>{{ field }}:</strong>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
            </div>
        </div>
        <span @click="errMsg=''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </span>
    </div>

    <!-- sucsses massege -->
    <div v-if="scMsg" class=" flex items-center justify-between p-3 mx-20 mt-4 bg-green-600 text-white rounded">
        {{scMsg}}
        <span @click="scMsg=''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </span>
    </div>


    <div class="flex justify-start">
    <button @click="updateStatus" :disabled="!hasChanges" :class="{ 'bg-gray-300': !hasChanges, 'bg-pink-600 hover:bg-pink-700': hasChanges }" class="bg-pink-600 text-white font-bold py-2  my-4 mx-2 h-10  w-80 ml-20 rounded-md">
                        Update
    </button>
    <router-link :to="{ name: 'invoices', params: { id: orders.id }}" class="bg-white text-pink-600 hover:bg-pink-700 hover:text-white  font-bold py-2  my-4 h-10 w-80  text-center rounded-md">
                    invoices
    </router-link>
    </div>
  <div class="bg-white p-2 border border-gray-200 rounded-lg shadow-sm mb-2">

    <div class="flex gap-2 flex-nowrap items-center whitespace-nowrap">
      <input v-model="filters.id" type="text" placeholder="Filter by ID" class="p-2 border rounded w-full sm:w-32">
      <input v-model="filters.name" type="text" placeholder="Filter by name" class="p-2 border rounded w-full sm:w-32">
      <input v-model="filters.store_id" type="text" placeholder="Filter by store" class="p-2 border rounded w-full sm:w-32">
      <select v-model="filters.product_status" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="in_stock">In Stock</option>
      </select>

    </div>

  </div>

    <div  class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-2  mx-4 z-10 ">

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
                            <option disabled value="processing">processing</option>
                            <option v-for="statusOption in status" :key="statusOption" :value="statusOption">
                                {{ statusOption }}
                            </option>
                        </select>
                    </td>
                    <td></td>
                </tr>


            </thead>
            <tbody>

                <div class="my-4 text-center font-bold text-lg">

                </div>

                <tr class="text-center">
                    <th scope="col" class="px-6 py-3 w-10">
                        Product id
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3 w-80">
                        Store ID
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


                <tr class="border-b border-gray-200 text-center" v-for="product in filteredProducts" :key="product.product_id">
                    <td>
                        {{ product.product_id }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                        {{ product.product_name }}
                    </th>
                    <td>
                      <router-link :to="{ name: 'EditStore', params: { id: product.store_id } }" class='text-blue-500 hover:text-pink-700 hover:underline'>
                        {{product.store_id}}
                      </router-link>
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
                'ready_for_shipment', 'in_the_way' , 'delivered' , 'cancelled',
                ],
                product_status :['in_stock'],
                errMsg: '',
                scMsg: '',
                originalOrderStatus: '',
                originalProductStatuses: [],
              filters: {
                id: '',
                store_id: '',
                name: '',
                product_status: '',
            }
        }
        },
        computed: {
            hasChanges() {
            return (
                this.orders.order_status !== this.originalOrderStatus ||
                this.orders.products.some((product, index) => product.product_status !== this.originalProductStatuses[index])
            );
            },
          filteredProducts(){
            return this.products.filter(product => {
                return product.product_id.toString().includes(this.filters.id) &&
                product.store_id.toString().includes(this.filters.store_id) &&
                product.product_name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
                   product.product_status.toLowerCase().includes(this.filters.product_status.toLowerCase())
                    ;
            });
          }
        },    
        async created() {
            const id = this.$route.params.id;
            try {
            const response = await axiosClient.get(`api/admin/orders/${id}`);
            this.products = response.data.data.products;
            this.orders = response.data.data;
            this.originalOrderStatus = this.orders.order_status;
            this.originalProductStatuses = this.orders.products.map(product => product.product_status);
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

            if (orderStatus !== this.originalOrderStatus) {
            try {
                const response = await axiosClient.put(`api/admin/orders/${orderId}/status`, {
                    status: orderStatus,
                });

                
                console.log('Order status updated successfully!');
                this.scMsg = response.data.message

                this.originalOrderStatus = this.orders.order_status;
                
            } catch (error) {
                console.error(`There was an error updating the order status: ${error}`);
            }
            }

            // Update product status
            this.orders.products.forEach(async (product, index) => {
                if (product.product_status !== this.originalProductStatuses[index]) {
                try {
                    const response = await axiosClient.put(`api/admin/orders/${orderId}/products/${product.product_id}/status`, {
                    status: product.product_status,
                    });

                    console.log(`Product ${product.product_id} status updated successfully!`);
                    this.scMsg = response.data.message

                    this.originalProductStatuses[index] = product.product_status;

                } catch (error) {
                    console.error(`There was an error updating the product ${product.product_id} status: ${error}`);
                }
                }
            });
        },
}

    }

</script>

<style lang="scss" scoped>

</style>
