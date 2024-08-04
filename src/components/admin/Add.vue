<template>
        

    <div class="flex justify-start ml-8 ">
    <form @submit.prevent="submitForm" class="mt-8 ">
        
        <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="username">Name</label>
            <input type="text" id="username" v-model="user.name" placeholder="username" 
            class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>


        <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="user.email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        
        <!-- <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="email">Password</label>
            <input type="password" id="password" v-model="user.password" placeholder="password" 
            class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
        </div> -->

        <!-- Role -->
        <div class="">
        <p class="pl-5">Role </p>    
            <select v-model="user.role_id"  class="p-2 my-4 px-4  border-2 border-pink-600 rounded-xl" required>
                <option disabled value ="">Please select one</option>
                <option value=3>customer</option>
                <option value=2>vendor</option>
                <option value=1 >admin</option>
            </select>
        </div>

        <hr class="my-4">

        <div v-if="user.role_id == 2">
            <!-- storename -->
            <div class="mb-5 text-start">
                <label class="font-bold pl-5" for="storename">Storename</label>
                <input type="text" id="storename" v-model="user.store_name" placeholder="username" 
                class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>

            <!-- category -->
            <div class="">
                <p class="pl-5">Category </p>    
                <select v-model="user.category"  class=" p-2 my-4 px-4  border-2 border-pink-600 rounded-xl" required>
                    <option disabled value ="">Please select one</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
        </div>


        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Add</button>
    </form>
    </div>

</template>

<script>
import axiosClient from '@/axios';

export default {
    data() {
        return {
        user:{
            role_id: '',
            store_name: '',
            category:'',
        },
        categories: [],
        };
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await axiosClient.get('api/admin/categories');
                this.categories = response.data;
                console.log(response);
                console.log(this.categories);
            } catch (error) {
                console.error(error);
            }
        },
    async submitForm() {
    if (this.user.role_id != 2){
        delete this.user.store_name;
        delete this.user.category;
    }
    this.user.category = this.user.category.toString();
    try {
        const response = await axiosClient.post('api/admin/users',this.user);
        this.user = response.data;
        console.log(this.user);
    }
    catch (error) {
        console.error(error);
        console.log(this.user);
        console.log(this.userData);
    }
    }
    },
    mounted() {
    this.fetchCategories();
    }
};
</script>