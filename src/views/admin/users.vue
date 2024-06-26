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
            <h1 class="text-2xl ml-4 mt-2 mb-4 font-bold text-gray-900">Admins</h1>
            <table class="w-full text-sm text-left rtl:text-right text-gray-900  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-900 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            id
                        </th>
                        <th scope="col" class="px-6 py-3">
                            name
                        </th>
                        <th scope="col" class="">
                            Email
                        </th>
                        <th scope="col" class="">
                            Role
                        </th>
                        <th scope="col" class="">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="admin in admins" :key="admin.id" class="bg-white " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{admin.id}}
                        </th>
                        <td>{{ admin.name }}</td>
                        <td>{{ admin.email }}</td>
                        <td>{{ admin.role_id }}</td>
                        <td class="px-1 py-4 flex justify-end">
                            <div class="px-2 flex justify-center items-center">
                                <button @click="showConfirmDialog(admin.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button> 
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <router-link to="/admin/users/add">
                <button class="px-4 mx-4 py-2 mt-2 bg-pink-600 rounded-3xl text-white">Add User</button>
            </router-link>
        </div>
        
</template>

<script>
import axiosClient from '@/axios';
    export default {
    data(){
        return{
            admins:[],
            imageUrl: null,
            showConfirmationDialog: false,
            userIdToDelete: null,
        }
    },
    methods: {
    async fetchStatistics() {
        try {
        const response = await axiosClient.get('api/admin/admins');
        this.admins = response.data.data
        console.log(this.admins)
        } catch (error) {
        console.error(error);
        }
    },
    async deletestore(userId) {
        try {
            await axiosClient.delete(`api/admin/users/${userId}`);

            // Remove the product from the products array
            this.admins = this.admins.filter(admin => admin.id !== userId);
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
        this.fetchStatistics();
    },
    }

</script>

<style lang="scss" scoped>

</style>