<script setup>
// defineProps(['error']);
</script>

<template>
  <div class="bg-gray-700 h-screen flex flex-col justify-center items-center">
    <h1 class="text-red-400 text-2xl font-bold mb-6">Error</h1>
    <p class="text-white mb-8 text-lg">Something went wrong. Please try again later.</p>
    <router-link
to="/"        class="bg-pink-600 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-700 transition">
      Go to Homepage
    </router-link>
  </div>
</template>

<style scoped lang="scss">
</style>
