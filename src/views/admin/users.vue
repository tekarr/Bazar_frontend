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
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users"  :key="user.id" class="bg-white " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{user.id}}
                        </th>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role_id }}</td>
                        <td class="px-1 py-4 flex justify-end">
                            <div class="px-2 flex justify-center items-center">
                                <button @click="showConfirmDialog(user.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button> 
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <router-link to="/admin/users/add">
                <button class="px-4 mx-4 py-2 mt-2 bg-pink-600 rounded-3xl text-white">{{ $t('Add User') }}</button>
            </router-link>
        </div>
        
</template>

<script>
import axiosClient from '@/axios';
    export default {
    data(){
        return{
            users:[],
            imageUrl: null,
            showConfirmationDialog: false,
            userIdToDelete: null,
        }
    },
    methods: {
        async fetchUsers() {
        try {
            const response = await axiosClient.get('api/admin/users');
            this.users = response.data
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
        this.fetchUsers();
        },
    }

</script>

<style lang="scss" scoped>

</style>