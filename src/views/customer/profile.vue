<template>
    
    <navbarr/>

    <div class="flex items-start justify-start mt-28 bg-gray-100 py-24 ">
    <form @submit.prevent="submitForm" class="max-w-sm mx-10 mt-4 ">
        
        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="username">Name</label>
            <input type="text" id="username" v-model="username" placeholder="username" 
            class="w-full mt-4 bg-white px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-white px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        
        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="email">Password</label>
            <input type="password" id="password" v-model="password" placeholder="password" 
            class="w-full mt-4 bg-white px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Save Profile</button>
    </form>
    </div>

</template>

<script>
import Navbarr from '@/components/customer/Navbarr.vue';
import navbar from '../../components/vendor/navbar.vue';
import Sidbar from '../../components/vendor/Sidbar.vue';
export default {
    components: { navbar, Sidbar, Navbarr },
    data() {
        return {
        username:'',    
        email: '',
        password: ''
        };
    },
    methods: {
        submitForm() {
        // Perform form submission logic here
        console.log('Loged in!');
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        
        }
    }
};
</script>