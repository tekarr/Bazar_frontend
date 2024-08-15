<template>

    
    <div class="flex items-start justify-start mt-28 bg-gray-100 py-16 ">
        <form @submit.prevent="submitForm" class="max-w-sm mx-10 mt-4 ">
            
        <p class="text-3xl font-medium mb-10 ml-3">Profile</p>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="name">Name</label>
            <input type="text" id="name" v-model="user.name" placeholder="username" 
            class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
        </div>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="user.email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
        </div>

        <div class="mb-5 text-start">
            <label class="font-normal pl-5" for="phone">Phone number</label>
            <input type="text" id="phone" v-model="user.phone" placeholder="Phone number" 
            class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
        </div>

        <div class=" my-8"> 
            <router-link to="/customer/profile/change-password" class=" ml-2 p-2 px-4 rounded-full text-pink-600 bg-white hover:bg-pink-600 hover:text-white cursor-pointer">Change Password</router-link>
        </div>



        <hr class="my-8">


        <div  class="mb-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-5">Shipping Address</h2>

            <div class="mb-3 text-start">
                <label class="font-normal pl-5" for="city">City</label>
                <input type="text" id="city" v-model="city" 
                class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
            </div>

            <div class="mb-5 text-start">
                <label class="font-normal pl-5" for="address">Address</label>
                <input type="text" id="address" v-model="user.address"  
                class="w-full mt-4 bg-white mr-20 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
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
        user: [],
        password: '',
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
    async submitForm() {
    try {
        const userData = {
        name: this.user.name,
        //email: this.user.email,
        //password: this.password,
        phone: this.user.phone,
        address: this.user.address,
        //city: this.city,
        };

        const response = await axiosClient.post('update-profile', userData);
        console.log(response.data);
        // You can also display a success message or redirect to a new page here
    } catch (error) {
        console.error(error);
    }
    },
},
};
</script>