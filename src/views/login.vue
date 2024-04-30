<template>

    <router-link class="flex justify-center items-center space-x-3 mt-20 rtl:space-x-reverse" to="/">
        <img src="../assets/icons/BAZAR (2).png" class=" h-24" alt="Bazar Logo">
    </router-link>

    <p class="text-xl font-bold text-center pt-5">Login</p>    
    <div class="flex items-center justify-center min-h-screen">
    <form @submit.prevent="submitForm" class="max-w-sm mx-auto mb-80 ">
        
        <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-slate-50 px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        
        <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="email">Password</label>
            <input type="password" id="password" v-model="password" placeholder="password" 
            class="w-full mt-4 bg-slate-50 px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Login</button>
        <p class="p-1 text-sm">you don't have acount<router-link to="/signup" class="text-pink-600  hover:underline p-1" > Sign up</router-link></p>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
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