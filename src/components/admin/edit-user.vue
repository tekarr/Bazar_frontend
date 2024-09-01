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

        
        <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="phone">Phone</label>
            <input type="tel" id="phone" v-model="user.phone" placeholder="Phone"
            class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
        </div>
      <div class="mb-5 text-start">
            <label class="font-bold pl-5" for="address">{{ $t('Address') }}</label>
            <input type="text" id="address" v-model="user.address" placeholder="address"
            class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " >
        </div>

        <!-- Role -->
        <div class="">
        <p class="">Role </p>    
            <select v-model="user.role_id"  class="p-2 my-4 px-4  border-2 border-pink-600 rounded-xl" required>
                <option disabled value ="{{user.role_id}}">{{user.role_id}}</option>
                <option value="3">customer</option>
                <option value="2">vendor</option>
                <option value="1">admin</option>
            </select>
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

        },
        };
    },
    methods: {

        async submitForm() {
        try {
        const response = await axiosClient.post('api/admin/admins',this.user);
        this.user = response.data;
        console.log(this.user);
    } catch (error) {
        console.error(error);
    }
        
        },
      async feachUser(){
          if(this.$route.params.id){
              const response = await axiosClient.get(`api/admin/users/${this.$route.params.id}`);
              this.user = response.data;
          }

      }

    },
    mounted(){
        this.feachUser();
    }
};
</script>