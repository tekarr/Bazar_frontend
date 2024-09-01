<template>

    
    <div class="p-4  mt-20 items-start justify-start ">

        <p class="text-3xl font-bold  pt-5 ">{{ $route.name }}</p>
        <div class="flex   min-h-screen">
            <form @submit.prevent="submitForm" class="max-w-lg  mb-40" enctype="multipart/form-data">

              <!-- Image -->
              <div class="relative mb-5">
                <label for="fileInput" class="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" id="fileInput" @change="onFileSelected" class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-pink-600 focus:ring-pink-600" required>
                <p class="mt-2 text-sm text-gray-500" v-if="!fileSelected">No file chosen</p>
                <p class="mt-2 text-sm text-gray-500" v-else>{{ fileName }}</p>
              </div>

              <!-- Name -->
              <div class="mb-5">
                <label for="storename" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="storename" v-model="storename" placeholder="Store name"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-600 focus:border-pink-600 sm:text-sm" required>
              </div>

              <!-- Description -->
              <div class="mb-5">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" v-model="description" placeholder="Store description"
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-600 focus:border-pink-600 sm:text-sm" required></textarea>
              </div>



              <!-- Category -->
              <div class="mb-5">
                <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                <select v-model="category_id" id="category" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-600 focus:border-pink-600 sm:text-sm" required>
                  <option value="" disabled>Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                  <option value="new">Add New Category</option>

                </select>
                <button @click="showAddCategoryInput = !showAddCategoryInput" class="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg focus:outline-none">
                  <span class="text-xl">+</span>
                </button>
                <div v-if="showAddCategoryInput" class="mt-2">
                  <input v-model="newCategoryName" type="text" placeholder="New Category Name" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-600 focus:border-pink-600 sm:text-sm" />
                  <button @click="addCategory" class="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg">Add Category</button>
                </div>
              </div>

              <!-- User -->
              <div class="mb-5">
                <label for="user" class="block text-sm font-medium text-gray-700">User</label>
                <select v-model="user_id" id="user" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-600 focus:border-pink-600 sm:text-sm" required>
                  <option value="" disabled>Select User</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Add Store
              </button>
            </form>

                  </div>
    </div>

</template>

<script>
import navbar from './navbar.vue';
import Sidbar from './Sidbar.vue';
import {mapState} from "vuex";
export default {
    components: { navbar, Sidbar },
    data() {
      return{
        storename: '',
        description: '',
        status: '',
        category_id: '',
        user_id: '',
        fileSelected: false,
        fileName: '',
        file: null
      }
    },
  computed: {
      ...mapState(['users']),
    ...mapState(['categories']),

  },
  mounted() {
    this.$store.dispatch('fetchUsers');
    this.$store.dispatch('fetchCategories');


  }

};
</script>