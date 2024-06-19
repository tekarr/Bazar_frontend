<template>
  <div class="flex justify-center">
    <router-link class="flex justify-center items-center mt-8 w-32" to="/">
      <img src="../../assets/icons/BAZAR (2).png" class="h-24" alt="Bazar Logo"/>
    </router-link>
  </div>

  <p class="text-xl font-bold text-center pt-2 mb-4">Sign up</p>
  <div class="flex items-center justify-center">
    <form @submit.prevent="register" class="lg:w-1/3 md:w-1/2">
      
      <!-- name -->
      <div class="mb-5 text-start">
        <label class="pl-5" for="name">Name</label>
        <input type="text" id="name" v-model="form.name" placeholder="username" class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500" required />
      </div>
      <!-- <p> {{ form.name }}</p> -->

      <!-- email -->
      <div class="mb-5 text-start">
        <label class="pl-5" for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="name@gmail.com"
          class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500"
          required
        />
      </div>
      <!-- <p> {{ form.email }}</p> -->
      
      <!-- password -->
      <div class="grid grid-cols-2 gap-2">
        <div class="mb-5 text-start">
          <label class="pl-5" for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="password"
            class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500"
            pattern=".{8,}" @change="checkPassword" @blur="checkPasswordsMatch" title="Password must be at least 8 characters long" required
          />
        </div>
        <!-- password_confirmation -->
        <div class="mb-5 text-start">
          <label class="pl-5" for="password_confirmation"
            >Password Confirmation</label
          >
          <input
            type="password"
            id="passwordconfirmation"
            v-model="form.password_confirmation"
            placeholder="password"
            class="w-full mt-4 bg-slate-50 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500"
            @change="checkPasswordsMatch"  required
          />
        </div>
        <!-- <p> {{ form.password }}</p>
        <p> {{ form.password_confirmation }}</p> -->
      </div>

      <!-- terms and conditions -->
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-pink-300"
            required
          />
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900">I agree with the
          <a href="#" class="text-pink-600 hover:underline">terms and conditions</a></label>
      </div>

      <!-- errors -->
      <div v-if="errors.password_confirmation" class=" my-4 p-2 bg-pink-600 text-white rounded-xl text-sm">
        {{ errors.password_confirmation }}
      </div>  

      <div v-if="err2" class=" my-4 p-2 bg-pink-600 text-white rounded-xl text-sm">
        Password must be at least 8 characters long
      </div>

      <div v-if="err" class=" my-4 p-2 bg-pink-600 text-white rounded-xl text-sm">
      {{ errorMessage}}
      </div>

      <!-- signup -->
      <button
        type="submit"
        class="m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
      >
        Sign up
      </button>
      <p class="p-1 text-sm">
        Already have an account<router-link
          to="/signin"
          class="text-pink-600 hover:underline p-1"
          >Sign in</router-link
        >
      </p>
    </form>
  </div>

</template>

<script setup>
import { ref , computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

const store = useStore();
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});
const errors = ref({});
const passwordsMatch = computed(() => form.value.password === form.value.password_confirmation);


const checkPasswordsMatch = () => {
  if (!passwordsMatch.value) {
    errors.value.password_confirmation = "Passwords do not match.";
  }else
    errors.value.password_confirmation = null;
};

const err2 = ref(false);
const err = ref(false);

const checkPassword = () => {
    err2.value = form.value.password.length < 8;
};
    
const errorMessage = computed(() => store.state.auth ? store.state.auth.errorMessage : null); 

const register = async () => {
    await store.dispatch("auth/register", form.value);
    //console.log(form.value)
    setTimeout(() => {
            //console.log('Error Message:', errorMessage.value);
            err.value = true;
    }, 500);
};


</script>

<style scoped>
/* Add your styles here */
</style>
