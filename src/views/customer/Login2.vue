<template>

    <!-- login -->
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <router-link to="/"><img class="mx-auto h-24 w-auto" src="../../assets/icons/logo.png" alt="Your Company" /></router-link>
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('Log in to your account') }}</h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="login">

          <div v-if="errMsg" class=" flex items-center justify-between p-3 my-2 bg-red-600 text-white rounded">
            {{errMsg}}
              <span @click="errMsg=''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </span>
          </div>

          <div v-if="scMsg" class=" flex items-center justify-between p-3 my-2 bg-green-600 text-white rounded">
            {{scMsg}}
              <span @click="scMsg=''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </span>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('Email address') }}</label>
            <div class="my-2">
              <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full px-4 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('Password') }}</label>
              <div class="text-sm">
                <button @click="forgetPassword" :disabled="isLoading"  class="font-semibold text-pink-600 hover:text-pink-500">{{ $t('Forgot Password') }}</button>
                {{ isLoading ? 'Loading...' : '' }}
              </div>
            </div>
            <div class="mt-2">

              <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-lg px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-lg bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 mt-6">{{ $t('Sign in') }}</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          {{ $t('Not a member') }}

          <router-link :to="{name:'Signup2'}" class="font-semibold leading-6 text-pink-600 hover:text-pink-500">{{ $t('Sign up') }}</router-link>
        </p>
      </div>
    </div>


</template>

<script setup>
// const router = useRouter()
import {ref} from "vue";
import store from "@/store";
import axiosClient from "@/axios";

const user =ref( {
  email: '',
  password: '',
  // remember: false
})

const errMsg = ref('')
const scMsg = ref('')
const login = async (ev) => {
  ev.preventDefault()
  await store.dispatch("auth/login", user.value).catch((err) => {
    errMsg.value = err.response.data.message;
    console.log(user.value.email)
    console.log('errMsg',errMsg.value)
  })
}

const isLoading = ref(false);
  // Forget Password method
  const forgetPassword = async () => {
    try {
      isLoading.value = true;
      console.log(user.value.email)
      const response = await axiosClient.post(`/forgot-password?email=${user.value.email}`);
      // Handle success, e.g., showing a success message
      console.log(response.data);
      scMsg.value = response.data.status;
    } catch (error) {
      // Handle error, e.g., showing an error message
      console.log(error.response.data);
      errMsg.value = error.response.data.errors.email;
    }finally {
      isLoading.value = false; // Reset loading state whether the request succeeds or fails
    }
};
</script>
