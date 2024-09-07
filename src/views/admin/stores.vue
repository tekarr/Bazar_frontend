<template>
  <!-- delete message -->
  <div v-if="showConfirmationDialog" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-3xl">
      <p class="text-lg"> Are you sure you want to delete? </p>
      <div class="flex justify-between">
        <button @click="confirmDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Delete</button>
        <button @click="cancelDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Cancel</button>
      </div>
    </div>
  </div>

  <!-- filters -->
  <router-link to="/admin/store/add">
    <button class="px-4 mx-4 py-2 m-2 bg-pink-600 rounded text-white">{{ $t('Add Store') }}</button>
  </router-link>
  <div class="bg-white p-2 border border-gray-200 rounded-lg shadow-sm mb-2">
    <div class="flex gap-2 flex-nowrap items-center whitespace-nowrap">
      <input v-model="filters.id" type="text" placeholder="ID" class="p-2 border rounded w-full sm:w-20">
      <input v-model="filters.name" type="text" placeholder="name" class="p-2 border rounded w-full sm:w-20">
      <input v-model="filters.user_id" type="text" placeholder="user" class="p-2 border rounded w-full sm:w-20">
      <select v-model="filters.status" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select v-model="filters.category_id" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <button @click="resetFilters" class="px-2 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
        Reset
      </button>
    </div>
  </div>

  <!-- stores table -->
  <div class="relative bg-white shadow-md rounded-lg overflow-scroll">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr class="text-center">
        <th class="px-6 py-3">ID</th>
        <th class="px-6 py-3">{{ $t('image') }}</th>
        <th class="px-6 py-3">{{ $t('name') }}</th>
        <th class="px-6 py-3">{{ $t('User') }}</th>
        <th class="px-6 py-3">{{ $t('status') }}</th>
        <th class="px-6 py-3">{{ $t('category') }}</th>
        <th class="px-6 py-3">{{ $t('Products') }}</th>
        <th class="px-6 py-3">{{ $t('Orders') }}</th>
        <th class="px-6 py-3">{{ $t('actions') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="store in stores" :key="store.id" class="bg-white border-b  transition duration-150 ease-in-out">
        <td class="px-6 py-4 text-center">
          <router-link :to="{ name: 'StorePage', params: { id: store.id } }" class="text-blue-500 hover:text-pink-700 hover:underline">
            {{ store.id }}
          </router-link>
        </td>
        <td class="px-6 py-4 text-center">
          <img :src="store.image" alt="store image" class="w-10 h-10 rounded-full mx-auto">
        </td>
        <td class="px-6 py-4 text-center">{{ store.name }}</td>
        <td class="px-6 py-4 text-center">
          <router-link :to="{ name: 'EditUser', params: { id: store.user } }" class="text-blue-500 hover:text-pink-700 hover:underline">
            {{ store.user }}
          </router-link>
        </td>
        <td class="px-6 py-4 text-center">{{ store.status }}</td>
        <td class="px-6 py-4 text-center">{{ store.category }}</td>
        <td class="px-6 py-4 text-center">{{ store.products }}</td>
        <td class="px-6 py-4 text-center">{{ store.orders }}</td>
        <td class="px-6 py-4 text-center flex">
          <button @click="editStore(store.id)" class="px-4 py-2 bg-pink-600 text-white  rounded-3xl transition">{{ $t('Edit') }}</button>
          <button @click="showConfirmDialog(store.id)" class="px-4 py-2 mx-2 bg-gray-700 text-white hover:bg-pink-600 rounded-3xl transition">x</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- pagination controls -->
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
import axiosClient from '@/axios'
import {mapActions, mapGetters, mapState} from "vuex";
export default {
  data(){
    return{
      // stores:[],

      imageUrl: null,
      showConfirmationDialog: false,
      storeIdToDelete: null,
      filters: {
        id: '',
        name: '',
        user_id: '',
        category_id: '',
        status: '',
      },
    }
  },
  computed: {
    // Access the stores data from Vuex store
    ...mapState('admin', ['stores', 'pagination', 'categories']),




  },
  created() {
    this.$store.dispatch('admin/fetchStores');
  },
  methods:{

    ...mapActions('admin', ['fetchStores', 'setFilters']),
    resetFilters() {
      Object.keys(this.filters).forEach(key => {
        this.filters[key] = '';
      });
      this.setFilters(this.filters);
      this.fetchStores();
    },
    changePage(page) {
      if (page < 1 || page > this.pagination.lastPage) return;
      this.fetchStores(page);
    },

    async deletestore(storeId) {
      try {
        await axiosClient.delete(`api/admin/stores/${storeId}`);

        // Remove the product from the products array
        this.stores = this.stores.filter(store => store.id !== storeId);
      } catch (error) {
        console.error(error);
      }
    },
    editStore(id) {
      this.$router.push({ name: 'EditStore', params: { id } });
      console.log(id)
    },
    showConfirmDialog(storeId) {
      this.storeIdToDelete = storeId;
      this.showConfirmationDialog = true;
    },
    confirmDelete() {
      this.deletestore(this.storeIdToDelete);
      this.showConfirmationDialog = false;
    },
    cancelDelete() {
      this.showConfirmationDialog = false;
    },
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.setFilters(newFilters);
        this.fetchStores();
      },
      deep: true, // Ensures that the watcher reacts to changes within the filters object
    },
  },
  mounted() {
    this.resetFilters();
  },

}
</script>

<style lang="scss" scoped>

</style>