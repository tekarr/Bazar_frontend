<template>
    <sidbar/>
    <div class="p-4 sm:ml-64"> 
        <navbar/>

        <!-- users table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500  rounded-3xl overflow-hidden">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            users
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
                    <tr v-for="user in users" :key="user.id" class="bg-white " >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{user.name}}
                        </th>
                        <td>ahmed@gmail.com</td>
                        <td>customer</td>
                        <td class=" py-4 flex justify-end">
                            <router-link to="/admin/users/edit">
                                <button class="px-4 py-2  bg-gray-100 rounded-3xl">Edit</button>
                            </router-link>
                            <button class="px-4 py-2 mx-2  rounded-3xl bg-pink-600 text-white">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <router-link to="/admin/users/add">
                <button class="px-4 mx-4 py-2 mt-2 bg-pink-600 rounded-3xl text-white">Add User</button>
            </router-link>
        </div>

    </div>    
</template>

<script>
import Sidbar from '@/components/admin/Sidbar.vue'
import Navbar from '@/components/admin/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
    data(){
        return{
            users:[
                {
                    id:1,
                    name:'Ahmed',
                }
            ],
        }
    }
    }

</script>

<style lang="scss" scoped>

</style>