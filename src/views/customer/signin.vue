<template>

    <div class="flex justify-center">
        <router-link class="flex justify-center items-center mt-8 w-32" to="/">
            <img src="../../assets/icons/BAZAR (2).png" class=" h-24" alt="Bazar Logo">
        </router-link>
    </div>

    <p class="text-xl font-bold text-center pt-2 mb-4">Sign in</p>    
    <div v-bind="$attrs" class="flex items-center justify-center ">
    <form @submit.prevent="Signin" class="max-w-sm w-96 ">
        
        <div class="mb-5 text-start">
            <label class=" pl-5" for="email">Email</label>
            <input type="email" id="email" v-model="form.email" placeholder="name@gmail.com" 
            class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
        </div>
        
        <div class="mb-5 text-start">
            <label class=" pl-5" for="email">Password</label>
            <input type="password" id="password" v-model="form.password" placeholder="password" 
            class="w-full mt-4 bg-slate-50 pl-4  py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " pattern=".{8,}"  title="Password must be at least 8 characters long" required>
        </div>

        <div v-if="err" class=" my-4 p-2 bg-pink-600 text-white rounded-xl text-sm">
        {{ errorMessage}}
        </div>

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Sign in</button>
        <p class="p-1 text-sm">you don't have acount<router-link to="/signup" class="text-pink-600  hover:underline p-1" > Sign up</router-link></p>
    </form>
</div>
</template>

<script setup>
import { ref , computed} from 'vue';
import { useStore } from 'vuex';
import { mapState } from 'vuex';
import router from "@/router";

const store = useStore();
const form = ref({
    email: '',
    password: '',
    emails:[
        'g@g.g','s@s.s'
    ]
});
    const err = ref(false);
    const errorMessage = computed(() => store.state.auth ? store.state.auth.errorMessage : null);    //console.log('Error Message:', errorMessage.value);
    

    const Signin = async () => {
        await store.dispatch('auth/login', form.value);
        setTimeout(() => {
            console.log('Error Message:', errorMessage.value);
            err.value = true;
        }, 500);
    }
</script>