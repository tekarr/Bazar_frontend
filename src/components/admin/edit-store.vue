<template>
    <sidbar/>
    
    <div class="p-4 sm:ml-64 mt-20"> 

    <p class="text-3xl font-bold text-center pt-5 ">{{ $route.name }}</p>       
    <div class="flex items-center justify-center min-h-screen">
    <form @submit.prevent="submitForm" class="max-w-sm mx-auto mb-40">
            <div class="relative mb-10 flex justify-center ">
                <input type="file" id="fileInput" class="hidden">
                <label for="fileInput" class="cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-3xl">
                Update image
                </label>
                <span
                class="absolute top-0 right-0 mt-2 mr-2 text-gray-500"
                v-if="!fileSelected">
                No chosen file
                </span>
            </div>
        <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="username">Name</label>
            <input type="text" id="storename" v-model="storename" placeholder="storename" 
            class="w-full mt-4 bg-slate-50 px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
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
        fileSelected: true
        };
    },
    methods: {
        submitForm() {
        // Perform form submission logic here
        console.log('Loged in!');
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        
        },
    }
};
</script>