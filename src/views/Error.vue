<template>
  <div class="bg-gray-700 h-screen flex flex-col justify-center items-center">
    <h1 class="text-red-400 text-2xl font-bold mb-6">Error</h1>
    <p class="text-white mb-8 text-lg">Something went wrong. Please try again later.</p>
    <div class="flex space-x-10">
      <button
          @click="goBack"
          class="bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-gray-600 transition"
      >
        Go Back
      </button>
      <router-link
          to="/"
          class="bg-pink-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-50 hover:text-pink-700 transition"
      >
        Go to Homepage
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

// Get the router instance
const router = useRouter();

// Define the function to go back
function goBack() {
  router.back();
}
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
