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
  <router-link to="/admin/users/add">
    <button class="px-4 mx-4 py-2 m-2 bg-pink-600 rounded text-white">{{ $t('Add User') }}</button>
  </router-link>
  <div class="bg-white p-2 border border-gray-200 rounded-lg shadow-sm mb-2">
    <div class="flex gap-2 flex-nowrap items-center whitespace-nowrap">
      <input v-model="filters.id" type="text" placeholder="ID" class="p-2 border rounded w-full sm:w-20">
      <input v-model="filters.name" type="text" placeholder="name" class="p-2 border rounded w-full sm:w-20">
      <input v-model="filters.phone" type="text" placeholder="phone" class="p-2 border rounded w-full sm:w-20">
      <select v-model="filters.role_id" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Role</option>
        <option value="1">admin</option>
        <option value="2">vendor</option>
        <option value="3">customer</option>
      </select>
      <button @click="resetFilters" class="px-2 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
        Reset
      </button>
    </div>
  </div>

  <!-- users table -->
  <div class="relative bg-white shadow-md rounded-lg overflow-scroll">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr class="text-center">
        <th class="px-6 py-3">#</th>
        <th class="px-6 py-3">{{ $t('name') }}</th>
        <th class="px-6 py-3">{{ $t('phone') }}</th>
        <th class="px-6 py-3">{{ $t('Role') }}</th>
        <th class="px-6 py-3">{{ $t('phone') }}</th>
        <th class="px-6 py-3"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id" class="bg-white border-b  transition duration-150 ease-in-out">
        <td class="px-6 py-4 text-center">{{ user.id }}</td>
        <td class="px-6 py-4 text-center">{{ user.name }}</td>
        <td class="px-6 py-4 text-center">{{ user.email }}</td>
        <td class="px-6 py-4 text-center">{{ user.role_name }}</td>
        <td class="px-6 py-4 text-center">{{ user.phone }}</td>
        <td class="px-6 py-4 text-center flex">
          <button @click="editUser(user.id)" class="px-4 py-2 mt-2 bg-gray-100 hover:bg-pink-600 hover:text-white rounded-3xl">{{ $t('Edit') }}</button>
          <button @click="showConfirmDialog(user.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button>
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
import axiosClient from '@/axios';
import {mapActions, mapState} from "vuex";
import store from "@/store";
import admin from "@/store/admin";
    export default {
    data(){
        return{
            // users


            imageUrl: null,
            showConfirmationDialog: false,
            userIdToDelete: null,
          filters: {
            id: '',
            name: '',
            phone: '',
            role_id: '',
          },
        }
    },
      computed: {

        ...mapState('admin', ['users', 'pagination']),
    },
    methods: {
      ...mapActions('admin', ['fetchUsers', 'setFilters']),
      resetFilters() {
        Object.keys(this.filters).forEach(key => {
          this.filters[key] = '';
        });
        this.setFilters(this.filters);
        this.fetchUsers();
      },
      changePage(page) {
        if (page < 1 || page > this.pagination.lastPage) return;
        this.fetchUsers(page);
      },

      //this function was replaced by mapgetters

    async deletestore(userId) {
        try {
            await axiosClient.delete(`api/admin/users/${userId}`);

            // Remove the product from the products array
            this.users = this.users.filter(user => user.id !== userId);
        } catch (error) {
            console.error(error);
        }
        },
        editUser(id) {
        this.$router.push({ name: 'EditUser', params: { id } });
        console.log(id)
    },
    showConfirmDialog(userId) {
        this.userIdToDelete = userId;
        console.log(this.userIdToDelete)
        this.showConfirmationDialog = true;
    },
    confirmDelete() {
        this.deletestore(this.userIdToDelete);
        this.showConfirmationDialog = false;
    },
    cancelDelete() {
        this.showConfirmationDialog = false;
    },
    },


created() {
store.dispatch('admin/fetchUsers');
    },
      watch: {
        filters: {
          handler(newFilters) {
            this.setFilters(newFilters);
            this.fetchUsers();
          },
          deep: true,
        },
      },

    }


</script>

<style lang="scss" scoped>

</style>