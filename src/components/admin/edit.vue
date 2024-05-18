<template>
    <sidbar/>
    
    <div class="p-4 sm:ml-64 mt-20"> 

    <p class="text-3xl font-bold text-center pt-5 ">{{ $route.name }}</p>       
    <div class="flex items-center justify-center min-h-screen">
    <form @submit.prevent="submitForm" class="max-w-sm mx-auto mb-40">
        
        <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="username">Name</label>
            <input type="text" id="username" v-model="username" placeholder="username" 
            class="w-full mt-4 bg-slate-50 px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>

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

        <div class="mb-5 text-start ml-4">
            <label class="font-semibold flex items-center mb-4" for="mySelect">Role</label>
            
            <label>
            <input class="p-10" type="radio" v-model="selectedOption" value="vendor"><span class="px-2">Vendor</span>
            </label>

            <label>
            <input class="" type="radio" v-model="selectedOption" value="customer"><span class="px-2">Customer</span>
            </label>
        </div>

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Update</button>
    </form>
    </div>
    </div>

</template>

<script>
import navbar from './navbar.vue';
import Sidbar from './Sidbar.vue';
export default {
    components: { navbar, Sidbar },
    data() {
        return {
        email: '',
        password: '',
        selectedOption: '' 
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