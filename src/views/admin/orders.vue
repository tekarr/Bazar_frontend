<template>
  <div class="flex flex-col gap-4 overflow-x-auto">
    <!-- Filter Section -->
    <div class="bg-white p-2 border border-gray-200 w-full m-2 rounded-lg shadow-sm">



      <div class="flex flex-wrap gap-2 items-center mt-2">
        <input v-model="filters.id" type="text" placeholder="ID" class="p-2 border rounded w-full sm:w-32">
        <input v-model="filters.user_id" type="text" placeholder="User" class="p-2 border rounded w-full sm:w-32">
        <select v-model="filters.status" class="p-2 border rounded w-full sm:w-32">
          <option value="">{{ $t('order status') }}</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="ready_for_shipment">Ready for Shipment</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
        <select v-model="filters.payment_method" class="p-2 border rounded w-full sm:w-40">
          <option value="">{{ $t('payment method') }}</option>
          <option value="on delivery">On Delivery</option>
          <option value="Adfali">Adfali</option>
          <option value="Sadad">Sadad</option>
          <option value="localBankCards">Local Bank Card</option>
        </select>
        <select v-model="filters.payment_status" class="p-2 border rounded w-full sm:w-40">
          <option value="">{{ $t('payment status') }}</option>
          <option value="pending">Pending</option>
          <option value="otp_sent">otp_sent</option>
          <option value="completed">Completed</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
        <button @click="resetFilters" class="px-2 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
          Reset
        </button>
      </div>
    </div>

    <!-- Order Table -->
    <div class="relative bg-white shadow-md rounded-lg overflow-scroll">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr class="text-center">
          <th class="px-6 py-3">#</th>
          <th class="px-6 py-3">{{ $t('User') }}</th>
          <th class="px-6 py-3">{{ $t('order status') }}</th>
          <th class="px-6 py-3">{{ $t('payment_method') }}</th>
          <th class="px-6 py-3">{{ $t('payment_status') }}</th>
          <th class="px-6 py-3">{{ $t('order total') }}</th>
          <th class="px-6 py-3">{{ $t('created') }}</th>
          <th class="px-6 py-3"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id" class="bg-white border-b  transition duration-150 ease-in-out">
          <td class="px-6 py-4 text-center">{{ order.id }}</td>
          <td class="px-6 py-4 text-center">
            <router-link :to="{ name: 'EditUser', params: { id: order.user_id } }" class="text-blue-500 hover:text-pink-700 hover:underline">
              {{ order.user_id }}
            </router-link>
          </td>
          <td class="px-6 py-4 text-center">{{ order.status }}</td>
          <td class="px-6 py-4 text-center">{{ order.payment_method }}</td>
          <td class="px-6 py-4 text-center">{{ order.payment_status }}</td>
          <td class="px-6 py-4 text-center">{{ order.order_total }}</td>
          <td class="px-6 py-4 text-center">{{ order.created_att }}</td>
          <td class="px-6 py-4 text-center">
            <router-link :to="{ name: 'Update Order', params: { id: order.id } }" class="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 rounded-3xl transition">
              {{ $t('Edit') }}
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-4 space-x-1">
      <button :disabled="pagination.currentPage === 1" @click="changePage(pagination.currentPage - 1)" class="px-4 py-2 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-100">
        Previous
      </button>
      <span class="px-4 py-2 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700">
        Page {{ pagination.currentPage }} of {{ pagination.lastPage }}
      </span>
      <button :disabled="pagination.currentPage === pagination.lastPage" @click="changePage(pagination.currentPage + 1)" class="px-4 py-2 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-100">
        Next
      </button>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';


export default {
  data() {
    return {
      filters: {
        id: '',
        user_id: '',
        status: '',
        payment_method: '',
        payment_status: '',
      },
    };
  },
  computed: {
    ...mapState('admin', ['orders', 'pagination']),
  },
  methods: {
    ...mapActions('admin', ['fetchOrders', 'setFilters']),

    resetFilters() {
      Object.keys(this.filters).forEach(key => {
        this.filters[key] = '';
      });
      this.setFilters(this.filters);
      this.fetchOrders();
    },
    changePage(page) {
      if (page < 1 || page > this.pagination.lastPage) return;
      this.fetchOrders(page);
    }
  },
  created() {
    this.fetchOrders();
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.setFilters(newFilters);

        this.fetchOrders();
      },
      deep: true, // Ensures that the watcher reacts to changes within the filters object
    },
  },
  mounted() {
    this.resetFilters();
  },

};
</script>


<style scoped>
/* Add any necessary styles here */
</style>
