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
  <router-link to="/admin/users/add">
    <button class="px-4 mx-4 py-2 mt-2 bg-pink-600 rounded-3xl text-white">{{ $t('Add User') }}</button>
  </router-link>
  <div class="bg-white p-2 border gap-2 flex flex-nowrap border-gray-200 rounded-lg shadow-sm mb-2">
<input v-model="filters.id" type="text" placeholder="Filter by ID" class="p-2 border rounded w-full sm:w-32">
<input v-model="filters.name" type="text" placeholder="Filter by name" class="p-2 border rounded w-full sm:w-32">
<input v-model="filters.email" type="text" placeholder="Filter by email" class="p-2 border rounded w-full sm:w-32">
    <select v-model="filters.role" class="p-2 border rounded w-full sm:w-48">
      <option value="">Select Role</option>
      <option v-for="role in  roles" :key="role.id" :value="role.name">{{ role.name }}</option>
    </select>

  </div>
  <!-- users table -->
        <div class="relative overflow-x-auto p-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-900  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-900 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            #
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {{ $t('name') }}
                        </th>
                        <th scope="col" class="">
                            {{ $t('Email') }}
                        </th>
                        <th scope="col" class="">
                            {{ $t('Role') }}
                        </th>

                      <th scope="col" class="">
                            {{ $t('phone') }}
                        </th>
                        <th scope="col" class="">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers"  :key="user.id" class="bg-white " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{user.id}}
                        </th>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role_name }}</td>
                        <td>{{ user.phone }}</td>

                        <td class="px-1 py-4 flex justify-end">
                            <div class="px-2 flex justify-center items-center">
                              <button  @click="editUser(user.id)" class="px-4 py-2 mt-2  bg-gray-100 hover:bg-pink-600 hover:text-white rounded-3xl">{{ $t('Edit') }}</button>
                              <button @click="showConfirmDialog(user.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        
</template>

<script>
import axiosClient from '@/axios';
import {mapState} from "vuex";
    export default {
    data(){
        return{
            // users:[],
          roles : [
            { name: 'Admin', id: 1 },
            { name: 'Vendor', id: 2 },
            { name: 'Customer', id: 3 }
          ],

            imageUrl: null,
            showConfirmationDialog: false,
            userIdToDelete: null,
          filters: {
            id: '',
            name: '',
            email: '',
            role: '',
          },
        }
    },
      computed: {
        ...mapState(['users']),
        filteredUsers() {
          return this.users.filter(user => {
            return user.id.toString().includes(this.filters.id) &&
              user.name.toLowerCase().includes(this.filters.name.toLowerCase()) &&
              user.email.toLowerCase().includes(this.filters.email.toLowerCase()) &&
user.role_name.toLowerCase().includes(this.filters.role.toLowerCase());
          });
        },
    },
    methods: {
      //this function was replaced by mapgetters
        async fetchUsers() {
        try {
            const response = await axiosClient.get('api/admin/users');
            this.users = response.data.data
            console.log(response);
            console.log(this.users);
        } catch (error) {
            console.error(error);
        }
    },
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
    mounted() {
      this.$store.dispatch('fetchUsers');
        },
    }

</script>

<style lang="scss" scoped>

</style>