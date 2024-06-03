<template>

    <div class="flex justify-center">
        <router-link class="flex justify-center items-center mt-8 w-32" to="/">
            <img src="../../assets/icons/BAZAR (2).png" class=" h-24" alt="Bazar Logo">
        </router-link>
    </div>

    <p class="text-xl font-bold text-center pt-2 mb-4">Login</p>    
    <div class="flex items-center justify-center ">
    <form @submit.prevent="login" class="max-w-sm w-96 ">
        
        <div class="mb-5 text-start">
            <label class=" pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="form.email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        
        <div class="mb-5 text-start">
            <label class=" pl-5" for="email">Password</label>
            <input type="password" id="password" v-model="form.password" placeholder="password" 
            class="w-full mt-4 bg-slate-50 pl-4  py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Login</button>
        <p class="p-1 text-sm">you don't have acount<router-link to="/signup" class="text-pink-600  hover:underline p-1" > Sign up</router-link></p>
    </form>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from "@/router";

const store = useStore();
const form = ref({
    email: '',
    password: ''
});

const login = async () => {

    try {
        const response = await store.dispatch('auth/login', form.value);
        const userRole = response.data.user.role_id;
        const authenticated = store.getters['auth/authenticated'];



        console.log(response);
        console.log(userRole);
        console.log(authenticated);
        
        
        if (userRole === 1) {
            //await router.push('/admin');
            console.log('admin')
        if (userRole === 2) {
            //await router.push('/vendor');
            console.log('vendor')
        }   
        } else {
            //await router.push('/');
            console.log('customer')
            }
        } catch (error) {
            console.log(error);
            alert('Login failed. Please check your credentials.');
        }
    };
</script>