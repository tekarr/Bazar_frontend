<template>
    <div class="flex items-start justify-start mt-20 bg-gray-100 h-screen  py-16 ">
        <form @submit.prevent="submitForm" class="max-w-sm mx-10 mt-4">
            
        <p class="text-3xl font-medium mb-10 ml-3">Change Password</p>

            <div class="mb-5 text-start">
                <label class="font-normal pl-5" for="current_password">Current password</label>
                <input type="password" id="current_password" v-model="user.current_password"  
                class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
            </div>

            <div class="mb-5 text-start">
                <label class="font-normal pl-5" for="password">New password</label>
                <input type="password" id="password" v-model="user.password"  
                class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
            </div>

            <div class="mb-5 text-start">
                <label class="font-normal pl-5" for="password_confirmation">Password confirmation</label>
                <input type="password" id="password_confirmation" v-model="user.password_confirmation"  
                class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
            </div>

            <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Change Password</button>
        </form>
    </div>
</template>

<script>
import axiosClient from '@/axios';
    export default {
        data() {
        return {
            user: {
            current_password:'',
            password: '',
            password_confirmation:'',
            },
        };
    },
    methods: {
    async submitForm() {
    try {
        const response = await axiosClient.post('change-password', this.user);
        console.log(response.data);
        // You can also display a success message or redirect to a new page here
    } catch (error) {
        console.error(error);
        }
    },
    },
}
</script>

<style lang="scss" scoped>

</style>