<template>

        <!-- delete message -->
        <div v-if="showConfirmationDialog" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-3xl">
            <p class="text-lg"> Are u sure u want to delete ? </p>
                <div class="flex justify-between">
                    <button  @click="confirmDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Delete</button>
                    <button @click="cancelDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Cancel</button>
                </div>
            </div>
        </div>
  <div class="bg-white p-2 border border-gray-200 rounded-lg shadow-sm mb-2">
    <router-link to="/admin/store/add">
      <button class="px-4 mx-4 py-2 m-2 bg-pink-600 rounded text-white">{{ $t('Add Store') }}</button>
    </router-link>
    <div class="flex gap-2 flex-nowrap items-center whitespace-nowrap">
      <input v-model="filters.id" type="text" placeholder="Filter by ID" class="p-2 border rounded w-full sm:w-32">
      <input v-model="filters.name" type="text" placeholder="Filter by name" class="p-2 border rounded w-full sm:w-32">
      <input v-model="filters.user" type="text" placeholder="Filter by user" class="p-2 border rounded w-full sm:w-32">
<select v-model="filters.status" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
      </select>
      <select v-model="filters.category" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category" :value="category.name">{{ category.name }}</option>
      </select>
    </div>

  </div>
    <!-- Stores table -->
        <div class="relative overflow-x-auto p-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>

                        <th scope="col" class="px-6 py-3 text-start">

                          ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('image') }}
                        </th>
                        <th scope="col" class="px-6 py-3">

                          {{ $t('name') }}
                        </th>
                      <th scope="col" class="px-6">
                        {{ $t('User') }}
                      </th>
                      <th scope="col" class="px-6">
                        {{ $t('status') }}
                      </th>
                        <th scope="col" class="px-6">
                            {{ $t('category') }}
                        </th>



                        <th scope="col" class="px-6">
                            {{ $t('Products') }}
                        </th>
                        <th scope="col" class="px-6">
                            {{ $t('Orders') }}
                        </th>
                        <th scope="col" class="">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="store in filteredStores" :key="store.id" class="bg-white text-black " >
                        <td scope="row" class="px-6 py-8 font-medium text-base">
                            {{store.id}}
                        </td>
                      <td class=" px-6 py-4">
                      <img :src="store.image" alt="store image" class="w-10 h-10 rounded-full">
                      </td>
                        <td  class="px-6 py-4 font-medium ">
                            {{store.name}}
                        </td>
                        <td class=" px-6 py-4">
                          <router-link :to="{ name: 'EditUser', params: { id: store.user } }" class='text-blue-500 hover:text-pink-700 hover:underline'>
                            {{store.user}}
                          </router-link>                        </td>

                      <td class=" px-6 py-4">
                        {{store.status}}
                      </td>
                        <td class=" px-6 py-4">
                            {{store.category}}
                        </td>

                        <td class=" px-6 py-4">
                            {{store.products}}
                        </td>
                        <td class=" px-6 py-4">
                            {{store.orders}}
                        </td>
                        <td class="px-1 py-4 flex justify-end">
                            <div class="px-2 flex justify-center items-center">
                                <button  @click="editStore(store.id)" class="px-4 py-2 mt-2  bg-gray-100 hover:bg-pink-600 hover:text-white rounded-3xl">{{ $t('Edit') }}</button>
                                <button @click="showConfirmDialog(store.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button>
                                                </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

</template>

<script>
import axiosClient from '@/axios'
import {mapGetters, mapState} from "vuex";
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
            user: '',
            category: '',
            status: '',
          },
        }
    },
      computed: {
        // Access the stores data from Vuex store
        ...mapState(['stores']),
        ...mapState(['categories']),
        filteredStores() {
          return this.stores.filter(store => {
                return (
                    (this.filters.name === '' || store.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
                    (this.filters.id === '' || store.id.toString().includes(this.filters.id)) &&
                    (this.filters.user === '' || store.user.toLowerCase().includes(this.filters.user.toLowerCase())) &&
                    (this.filters.category === '' || store.category.toLowerCase().includes(this.filters.category.toLowerCase())) &&
                    (this.filters.status === '' || store.status.toString().includes(this.filters.status))
                );
      });
      },
    },


    async created() {
    try {
        const response = await axiosClient.get('api/admin/stores');
        this.stores = response.data.data;
        console.log(this.stores);
    } catch (error) {
        console.error(error);
    }
    },
    methods:{
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
      mounted() {
        this.$store.dispatch('fetchStores');
        this.$store.dispatch('fetchCategories');


      }
    }
</script>

<style lang="scss" scoped>

</style>