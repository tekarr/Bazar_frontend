<template>

    <!-- reset password -->
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">

        <div v-if="errMsg" class="flex items-center justify-between p-3 my-2 bg-red-600 text-white rounded">
            <div>
                <div v-for="(errors, field) in errMsg" :key="field" class="text-sm">
                <strong>{{ field }}:</strong>
                <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
                </div>
            </div>
            <span @click="errMsg=''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </span>
        </div>

        <div v-if="scMsg" class=" flex items-center justify-between p-3 my-2 bg-green-600 text-white rounded">
        {{scMsg}}
        </div>

        <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="submitResetPassword">
        <div class="rounded-md shadow-sm -space-y-px">
            <div>
            <label for="password" class="sr-only">New Password</label>
            <input type="password" id="password" v-model="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New Password">
            </div>
            <div>
            <label for="passwordConfirmation" class="sr-only">Confirm New Password</label>
            <input type="password" id="passwordConfirmation" v-model="passwordConfirmation" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password">
            </div>
        </div>

        <div class="grid grid-cols-1 gap-2">
            <button v-if="!scMsg" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Reset
                </button>
            <router-link to="/signin" v-if="scMsg">
                <button  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Login</button>
            </router-link>
        </div>
        </form>
    </div>
    </div>

</template>

<script>
import axiosClient from '@/axios';

export default {
    data() {
        return {
        password: '',
        passwordConfirmation: '',
        token: '',
        email: localStorage.getItem('emailForPasswordReset') || '',
        scMsg:'',
        errMsg:''
        };
    },
    mounted() {
        // Set the token from the URL query parameters
        this.token = this.$route.query.token;
        console.log(this.token)
        console.log(this.email)
    },
    methods: {
        async submitResetPassword() {
        const url = `/reset-password?token=${this.token}&password=${this.password}&password_confirmation=${this.passwordConfirmation}&email=${this.email}`;
        try {
            const response = await axiosClient.post(url);
            console.log('Password reset successful:', response.data);
            this.scMsg = response.data.status;
            // Handle success, e.g., redirecting the user or showing a success message
        } catch (error) {
            // console.error( error.response.data);
            // this.errMsg = error.response.data.errors
            // Handle error, e.g., showing an error message
            if (error.response.data.errors.length === 1) {
                this.errMsg = error.response.data;
            } else {
                this.errMsg = error.response.data.errors
            }
        }
        }
    }
    }
</script>
