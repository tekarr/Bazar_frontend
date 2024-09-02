<template>

  <div class=" items-start justify-start min-h-screen">

    <!-- Success Message Display -->
    <div v-if="message" class="flex items-center justify-between p-3 my-2 bg-green-700 text-white rounded">
      {{ message }}
      <span @click="message = ''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>

    <!-- Error Message Display -->
    <div v-if="errMsg" class="flex items-center justify-between p-3 my-2 bg-red-600 text-white rounded">
      <div>
        <div v-for="(errors, field) in errMsg" :key="field" class="text-sm">
          <strong>{{ field }}:</strong>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>
      <span @click="errMsg = null" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>

    <!-- Profile Update Form -->

    <form @submit.prevent="submitForm" class="max-w-sm mx-10 mt-4">
      <h2 class="text-lg font-bold mb-4">{{ $t('Update Profile') }}</h2>
      <div class="mb-5">
        <label class="font-normal pl-5" for="name">{{ $t('Name') }}</label>
        <input type="text" id="name" v-model="user.name" placeholder="Name"
               class="w-full bg-white px-5 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
               required>
      </div>
      <div class="mb-5">
        <label class="font-normal pl-5" for="email">{{ $t('Email') }}</label>
        <input type="text" id="email" v-model="user.email" placeholder="Email"
               class="w-full bg-gray-200 px-5 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
               disabled>
      </div>

      <div class="mb-5">
        <label class="font-normal pl-5" for="phone">{{ $t('Phone') }}</label>
        <input type="tel" id="phone" v-model="user.phone" placeholder="Phone Number"
               class="w-full bg-white px-5 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
               required>
      </div>

      <div class="mb-5">
        <label class="font-normal pl-5" for="address">{{ $t('Address') }}</label>
        <input type="text" id="address" v-model="user.address" placeholder="Address"
               class="w-full bg-white px-5 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
               required>
      </div>

      <button type="submit" class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5">
        {{ $t('Update') }}
      </button>
    </form>

    <!-- Password Change Form -->
    <form @submit.prevent="submitPasswordForm" class="max-w-sm mx-10 mt-4">
      <h2 class="text-lg font-bold mb-4">{{$t('Change Password')}}</h2>

      <div class="mb-5">
        <label class="font-normal pl-5" for="current-password">{{$t('Current Password')}}</label>
        <input type="password" id="current-password" v-model="passwordForm.current_password" placeholder="Current Password"
               class="w-full bg-white px-5 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
               required>
      </div>

      <div class="mb-5">
        <label class="font-normal pl-5" for="new-password">{{ $t('New Password') }}</label>
        <input type="password" id="new-password" v-model="passwordForm.password" placeholder="New Password"
               class="w-full bg-white px-5 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
               required>
      </div>

      <div class="mb-5">
        <label class="font-normal pl-5" for="confirm-password">{{ $t("Confirm New Password") }}</label>
        <input type="password" id="confirm-password" v-model="passwordForm.password_confirmation" placeholder="Confirm New Password"
               class="w-full bg-white px-5 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
               required>
      </div>

      <button type="submit" class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5">
        {{$t(" Update Password") }}
      </button>
    </form>

  </div>
</template>

<script>
import { mapState } from "vuex";
import axiosClient from "@/axios";

export default {
  data() {
    return {
      message: '',
      errMsg: null,
      passwordForm: {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    };
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async submitForm() {
      try {
        const updatedUser = {
          name: this.user.name,
          phone: this.user.phone,
          address: this.user.address
        };
        const response = await axiosClient.post('/update-profile', updatedUser);

        // Set success message
        this.message = response.data.message;
        this.errMsg = null; // Clear any previous errors

        console.log('Update successful:', response.data);
      } catch (error) {
        if (error.response && error.response.data.errors) {
          // Set error messages if validation fails
          this.errMsg = error.response.data.errors;
        } else {
          console.error('Error updating profile:', error);
          this.errMsg = { general: ['An unexpected error occurred.'] };
        }
        this.message = ''; // Clear any previous success messages
      }
    },
    async submitPasswordForm() {
      try {
        const response = await axiosClient.post('/change-password', this.passwordForm);
        this.message = response.data.message;
        this.errMsg = null; // Clear previous errors

      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errMsg = error.response.data.errors;
        } else {
          console.error('Error changing password:', error);
          this.errMsg = { general: ['An unexpected error occurred.'] };
        }
        this.message = ''; // Clear any previous success messages
      }
    }
  },
  mounted() {
    this.$store.dispatch('auth/fetchUser');
  }
};
</script>
