<template>

        <!-- Orders table -->
  <div class="flex flex-col gap-4  overflow-x-auto" >

    <div class="bg-white p-2 border border-gray-200 w-fit rounded-lg shadow-sm  ">
      <div class="flex gap-2 flex-nowrap items-center whitespace-nowrap ">
        <input v-model="filters.id" type="number" placeholder="ID" class="p-1 border rounded w-full sm:w-32">
        <select v-model="filters.status" class="p-1 border rounded w-full sm:w-32">
          <option value=""> {{ $t('order status') }}</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="ready_for_shipment">ready_for_shipment</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>

        <select v-model="filters.payment_method" class="p-1 border rounded w-full sm:w-40">
          <option value="">{{ $t('payment method') }}</option>
          <option value="on delivery">On Delivery</option>
          <option value="Adfali">Adfali</option>
          <option value="Sadad">Sadad</option>
          <option value="localBankCards">Local Bank Card</option>
        </select>
        <select v-model="filters.payment_status" class="p-1 border rounded w-full sm:w-40">
          <option value="">{{ $t('payment status') }}</option>
          <option value="pending">Pending</option>
          <option value="otp_sent">otp_sent</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
    <!-- Order table -->
    <div class="relative ">
      <table class="w-full  text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50 ">
        <tr class="text-center">
          <th scope="col" class="px-6 py-3 w-10">
            #
          </th>


          <th scope="col" class="px-6 py-3 w-60">
            {{ $t('order status') }}
          </th>
          <th scope="col" class="px-6 py-3 ">
            {{ $t('payment_method') }}
          </th>
          <th scope="col" class="px-6 py-3 ">
            {{ $t('payment_status') }}
          </th>
          <th scope="col" class="px-6 py-3 ">
            {{ $t('order total') }}
          </th>

          <th scope="col" class="px-6 py-3 ">
            {{ $t('created') }}
          </th>
          <th scope="col" class="px-6 py-3">
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in filteredOrders" :key="order.id" class="bg-white text-center " >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{order.id}}
          </th>

          <td class="">
            {{ order.status }}
          </td>

          <td class=" ">
            {{ order.payment_method }}
          </td>
          <td class=" ">
            {{ order.payment_status }}
          </td>
          <td class=" ">
            {{ order.order_total }}
          </td>

          <td class="">
            {{ order.created_at }}
          </td>
          <td class="flex justify-center w-20">
            <router-link :to="{ name: 'view order', params: { id: order.id }}" class="px-4 py-2 mr-4 my-2  bg-gray-50 text-pink-600 hover:bg-pink-600 hover:text-white rounded-3xl"> {{ $t('View') }}</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
import axiosClient from '@/axios'
import {mapState} from "vuex";

    export default {
    components: { Sidbar, Navbar },
    data(){
        return{
            // orders:[],
          filters: {
            id: '',
            status: '',
            payment_method: '',
            payment_status: ''
          }
        }

    },
      computed: {
        ...mapState('vendor', ['orders']),
        filteredOrders() {
          console.log(this.orders.data);
          return  this.orders.filter(order => {
            return order.id.toString().includes(this.filters.id) &&
                order.status.includes(this.filters.status) &&
                order.payment_method.includes(this.filters.payment_method) &&
                order.payment_status.includes(this.filters.payment_status);

          });
        }
        },
 /*   async created() {

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
    },*/
    methods:{
    vieworder(id) {
            this.$router.push({ name: 'view order', params: { id } });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>