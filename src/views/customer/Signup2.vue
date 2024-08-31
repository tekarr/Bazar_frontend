<template>
  <div class="flex flex-col items-center justify-center h-screen">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <router-link to="/"><img class="mx-auto h-24 w-auto" src="../../assets/icons/logo.png" alt="Your Company" /></router-link>
    <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('Sign up') }}</h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit="register" >
      <div v-if="errMsg" class="flex items-center justify-between p-3 my-2 bg-red-600 text-white rounded">
          <div>
            <div v-for="(errors, field) in errMsg" :key="field" class="text-sm">
              <strong>{{ field }}:</strong>
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
          </div>
          <span @click="errMsg=''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </span>
      </div>
      <div>
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('name') }}</label>
      <div class="mt-2">
        <input v-model="user.name" id="name" name="name" type="text" autocomplete="name" required="" class="block px-4 w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
    </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('Email address') }}</label>
        <div class="mt-2">
          <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required="" class="block px-4 w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('Password') }}</label>

        </div>
        <div class="mt-2">
          <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full px-4 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password_conformation" class="block  text-sm font-medium leading-6 text-gray-900">{{ $t('Password confirmation') }}</label>

        </div>
        <div class="mt-2">
          <input v-model="user.password_confirmation" id="password_conformation" name="password_conformation" type="password" autocomplete="current-password_confirmation" required="" class="block px-4 w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <label for="address" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('Address') }}</label>
        <div class="mt-2">
          <input v-model="user.address" id="address" name="address" type="text"  required="" class="block px-4 w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <label for="Phone" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('Phone number') }}</label>
        <div class="mt-2">
          <input v-model="user.phone" id="Phone" name="Phone" type="text"  required="" class="block px-4 w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-lg bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ $t('Sign up') }}</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      {{ $t('Already have an Account') }}
      <router-link :to="{name:'Login2'}"  class="font-semibold leading-6 text-pink-600 hover:text-pink-500">{{$t('Sign in')}}</router-link>
    </p>
  </div>
  </div>
</template>

<script setup>

import store from "@/store/index.js";
import router from "@/router/index.js";
import {useRouter} from "vue-router";
import {ref} from "vue";

const routerr =useRouter();
const errMsg = ref('')
const user = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  address:'',
  phone:''
  // password_confirmation: ''
});
const register = async (ev) => {
  ev.preventDefault()
  await store.dispatch("auth/register", user.value).catch((err) => {
    console.log(err)
    errMsg.value = err.response.data.errors;
  })
}
</script>

<style scoped>

</style>
