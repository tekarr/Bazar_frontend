<template>
    
    <div class="flex items-start justify-start  min-h-screen ">
    <form @submit.prevent="submitForm" class="max-w-sm mx-10 mt-4 ">
        
        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="username">Name</label>
            <input type="text" id="username" v-model="user.name" placeholder="username" 
            class="w-full mt-4 bg-white py-2 px-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="user.email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-white px-2 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        
        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="email">Password</label>
            <input type="password" id="password" v-model="password" placeholder="password" 
            class="w-full mt-4 bg-white px-2  pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">{{ $t('Update') }}</button>
    </form>
    </div>

</template>

<script>
import axiosClient from '@/axios';

export default {
    data() {
        return {
            user: [],
            // other data properties...
        };
    },
    methods: {
        async submitForm() {
            try {
                // Send a POST request to the API
                const response = await axiosClient.post('api/customer/become-vendor', this.user);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        // other methods...
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
    // other component options...
};
</script>