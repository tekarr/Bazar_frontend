<template>

    
    <div class="flex items-start justify-start mt-28 bg-gray-100 py-16 ">
        <form @submit.prevent="submitForm" class="max-w-sm mx-10 mt-4 ">
            
        <p class="text-3xl font-medium mb-10 ml-3">Profile</p>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="username">Name</label>
            <input type="text" id="username" v-model="user.name" placeholder="username" 
            class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="user.email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="email">Password</label>
            <input type="password" id="password" v-model="password" placeholder="password" 
            class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

        <div class="my-4 mb-10">
        <label for="address" class="block text-gray-700 pl-5 mb-1">Address</label>
            <select id="address" v-model="addr" class="w-full border py-2 px-3 rounded-2xl">
                <option value="true">Add new address</option>
            </select>
        </div>

        <div v-if="addr" class="mb-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h2>

            <div class="mt-4">
                <label for="address" class="block text-gray-700 mb-1">Address</label>
                <input type="text" id="address" v-model="address" class="w-full rounded-lg border py-2 px-3"/>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                    <label for="Phone" class="block text-gray-700 mb-1">Phone number</label>
                    <input type="text" id="Phone" v-model="Phone" class="w-full rounded-lg border py-2 px-3"/>
                </div>
                <div class="mt-4 sm:mt-0">
                    <label for="city" class="block text-gray-700 mb-1">City</label>
                    <input type="text" id="city" v-model="city" class="w-full rounded-lg border py-2 px-3"/>
                </div>
            </div>
        </div>

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Save Profile</button>
    </form>
    </div>

</template>

<script>
import axiosClient from '@/axios';
export default {
    data() {
        return {
        addr:false,
        user: [],
        password: ''
        };
    },
    async created() {
    try {
        const response = await axiosClient.get('api/user');
        this.user = response.data;
        console.log(this.user);
    } catch (error) {
        console.error(error);
    }
    },
    methods: {
    }
};
</script>