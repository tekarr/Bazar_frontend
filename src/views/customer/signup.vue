<template>

    <div class="flex justify-center">
        <router-link class="flex justify-center items-center mt-8 w-32" to="/">
            <img src="../../assets/icons/BAZAR (2).png" class=" h-24" alt="Bazar Logo">
        </router-link>  
    </div>

    <p class="text-xl font-bold text-center pt-2 mb-4">Sign up</p>    
    <div class="flex items-center justify-center ">
    <form @submit.prevent="submit" class="lg:w-1/3 md:w-1/2">

            <div class="mb-5 text-start">
                <label class=" pl-5" for="username">Name</label>
                <input type="text" id="name" v-model="name" placeholder="username" 
                class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>

            <div class="mb-5 text-start">
                <label class=" pl-5" for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="name@gmail.com" 
                class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>

        <div class="grid grid-cols-2 gap-2">
            <div class="mb-5 text-start">
                <label class=" pl-5" for="email">Password</label>
                <input type="password" id="password" v-model="password" placeholder="password" 
                class="w-full mt-4 bg-slate-50 pl-4  py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>

            <div class="mb-5 text-start">
                <label class=" pl-5" for="email">Password Confirmation</label>
                <input type="password" id="password_confirmation" v-model="password_confirmation" placeholder="password" 
                class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>
        </div>

        <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
        <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-pink-300 " required />
        </div>
        
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 ">I agree with the <a href="#" class="text-pink-600 hover:underline ">terms and conditions</a></label>
        </div>
        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Sign up</button>
        <p class="p-1 text-sm">Already have acount<router-link to="/login" class="text-pink-600  hover:underline p-1" > Login</router-link></p>
        
    </form>
</div>
</template>

<script>
import axiosClient from '@/axios';
export default {
    data() {
        return {
        form:
        {
            name: '',
            email: '',
            password: '',
            password_confirmation:''
        }
    };
    },
    methods: {
        async submit() {
            const response = await axiosClient.post('/register',this.form );
            console.log(response.data);
        } 
    }
};
</script>