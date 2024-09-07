<template>
  <!-- delete message -->
  <div v-if="showConfirmationDialog" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-3xl">
      <p class="text-lg"> Are u sure u want to delete ? </p>
      <div class="flex justify-between">
        <button @click="confirmDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Delete</button>
        <button @click="cancelDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Cancel</button>
      </div>
    </div>
  </div>

  <!-- filters -->
  <router-link to="/admin/products/add">
    <button class="px-4 mx-4 py-2 m-2 bg-pink-600 rounded text-white">{{ $t('Add Product') }}</button>
  </router-link>
  <div class="bg-white p-2 border border-gray-200 rounded-lg shadow-sm mb-2">
    <div class="flex gap-2 flex-nowrap items-center whitespace-nowrap">
      <input v-model="filters.id" type="text" placeholder="ID" class="p-2 border rounded w-full sm:w-20">
      <input v-model="filters.store_id" type="text" placeholder="store" class="p-2 border rounded w-full sm:w-20">
      <input v-model="filters.name" type="text" placeholder="name" class="p-2 border rounded w-full sm:w-20">
      <select v-model="filters.category_id" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <button @click="resetFilters" class="px-2 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
        Reset
      </button>
    </div>
  </div>

  <!-- products table -->
  <div class="relative bg-white shadow-md rounded-lg overflow-scroll">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr class="text-center">
        <th class="px-6 py-3">#</th>
        <th class="px-6 py-3">{{ $t('image') }}</th>
        <th class="px-6 py-3">{{ $t('store') }}</th>
        <th class="px-6 py-3">{{ $t('name') }}</th>
        <th class="px-6 py-3">{{ $t('category') }}</th>
        <th class="px-6 py-3">{{ $t('price') }}</th>
        <th class="px-6 py-3">{{ $t('quantity') }}</th>
        <th class="px-6 py-3">{{ $t('status') }}</th> <!-- New status column -->
        <th class="px-6 py-3">{{ $t('actions') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id" class="bg-white border-b  transition duration-150 ease-in-out">
        <td class="px-6 py-4 text-center">{{ product.id }}</td>
        <td class="px-6 py-4 text-center">
          <img :src="product.image[0]?.image" alt="Product Image" class="w-10 h-10 object-cover mx-auto">
        </td>
        <td class="px-6 py-4 text-center">
          <router-link :to="{ name: 'EditStore', params: { id: product.store_id } }" class="text-blue-500 hover:text-pink-700 hover:underline">
            {{ product.store_id }}
          </router-link>
        </td>
        <td class="px-6 py-4 text-center">{{ product.name }}</td>
        <td class="px-6 py-4 text-center">{{ product.category }}</td>
        <td class="px-6 py-4 text-center">{{ product.price }}</td>
        <td class="px-6 py-4 text-center">{{ product.quantity }}</td>
        <td class="px-6 py-4 text-center">
          {{ product.status }} <!-- New status data -->
        </td>
        <td class="px-6 py-4 text-center">
          <router-link :to="{ name: 'EditProduct ', params: { id: product.id } }" class="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 rounded-3xl transition">
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
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      filters: {
        id: '',
        store_id: '',
        name: '',
        category_id: '',
      },
    };
  },
  computed: {
    ...mapState('admin', ['products', 'pagination', 'categories']),
  },
  methods: {
    ...mapActions('admin', ['fetchProducts', 'setFilters']),
    resetFilters() {
      Object.keys(this.filters).forEach(key => {
        this.filters[key] = '';
      });
      this.setFilters(this.filters);
      this.fetchProducts();
    },
    changePage(page) {
      if (page < 1 || page > this.pagination.lastPage) return;
      this.fetchProducts(page);
    }
  },
  created() {
    this.fetchProducts();
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.setFilters(newFilters);
        this.fetchProducts();
      },
      deep: true,
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