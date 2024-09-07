<template>
  <div class="flex justify-start ml-8 ">
    <form @submit.prevent="submitForm" class="mt-8 ">
      <!-- Error message display -->
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

      <!-- Form fields -->
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
               class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 ">
      </div>

      <div class="mb-5 text-start">
        <label class="font-bold pl-5" for="address">{{ $t('Address') }}</label>
        <input type="text" id="address" v-model="user.address" placeholder="address"
               class="w-full mt-4 bg-slate-50 mr-10 pl-4 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 ">
      </div>

      <!-- Role selection -->
      <div class="">
        <p class="">Role</p>
        <select v-model="user.role_id" class="p-2 my-4 px-4 border-2 border-pink-600 rounded-xl" required>
          <option disabled value="">{{user.role_id ? user.role_id : 'Select a role'}}</option>
          <option value="3">customer</option>
          <option value="2">vendor</option>
          <option value="1">admin</option>
        </select>
      </div>

      <button type="submit" class="m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center">
        {{ isEditing ? 'Update' : 'Add' }} User
      </button>
    </form>
  </div>
</template>

<script>
import axiosClient from '@/axios';

export default {
  data() {
    return {
      errMsg: null,
      user: {},
      isEditing: false, // To track whether adding or editing
    };
  },
  methods: {
    async submitForm() {
      try {
        const userId = this.$route.params.id;
        if (this.isEditing) {
          // Update the user (PUT request)
          const response = await axiosClient.put(`api/admin/users/${userId}`, this.user);
          this.user = response.data;
        } else {
          // Add new user (POST request)
          const response = await axiosClient.post('api/admin/users/', this.user);
          this.user = response.data;
        }
        console.log(this.user);
      } catch (error) {
        this.errMsg = error.response.data.errors;
        console.error(error);
      }
    },
    async fetchUser() {
      const userId = this.$route.params.id;
      if (userId) {
        this.isEditing = true;
        try {
          const response = await axiosClient.get(`api/admin/users/${userId}`);
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>
