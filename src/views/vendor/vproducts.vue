<template>


  <!-- delete message -->
  <div v-if="showConfirmationDialog" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-3xl">
      <p class="text-lg"> Are u sure u want to delete ? </p>
      <div class="flex justify-between">
        <button  @click="confirmDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Delete</button>
        <button @click="cancelDelete" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Cancel</button>
      </div>
    </div>
  </div>

  <div class="bg-white p-2 border border-gray-200 rounded-lg shadow-sm mb-2">
    <router-link to="/vendor/products/add">
      <button class="px-4 mx-4 py-2 m-2 bg-pink-600 rounded text-white">{{ $t('Add Product') }}</button>
    </router-link>

    <div class="flex gap-2 flex-nowrap items-center whitespace-nowrap">
      <input v-model="filters.id" type="text" placeholder="Filter by ID" class="p-2 border rounded w-full sm:w-32">
      <input v-model="filters.name" type="text" placeholder="Filter by name" class="p-2 border rounded w-full sm:w-32">
      <select v-model="filters.category" class="p-2 border rounded w-full sm:w-48">
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category" :value="category.name">{{ category.name }}</option>
      </select>
    </div>
  </div>
  <!-- products table -->
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-700  rounded-3xl overflow-hidden m-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" class="px-6 py-3 text-start">
          #
        </th>
        <th scope="col" class="px-6 py-3 text-start">
          image
        </th>

        <th scope="col" class="px-6 py-3 text-start">
          {{ $t('name') }}
        </th>
        <!-- <th scope="col" class=" py-3 text-center">
            image
        </th> -->
        <th scope="col" class="px-6 py-3 text-center">
          {{ $t('category') }}
        </th>

        <th scope="col" class="px-6 py-3 text-center">
          {{ $t('price') }}
        </th>
        <th scope="col" class="px-6 py-3 text-center">
          quantity
        </th>
        <th scope="col" class="px-6 py-3 text-center">
          {{ $t('created') }}
        </th>

        <th scope="col" class="px-6 py-3">

        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in filteredProducts" :key="product.id" class="bg-white " >
        <td scope="row" class="px-6 py-8 font-medium text-base w-20">
          <router-link :to="{ name: 'EditProduct', params: { id: product.id } }" class='text-blue-500 hover:text-pink-700 hover:underline'>
            {{product.id}}
          </router-link>
        </td>
        <td scope="row" class="px-4 py-4 text-base w-10">
          <img :src="product.image[0]?.image" alt="Product Image" />
        </td>


        <td scope="row" class="px-6 py-8  text-base w-40">
          {{product.name}}
        </td>
        <!-- <td scope="row" class="font-normal text-sm text-center">
            <img :src="product.image" alt="Product Image" />
        </td> -->
        <td class="px-6 text-center ">
          {{ product.category }}
        </td>
        <td class="px-6 text-center ">
          {{ product.price }}$
        </td>
        <td class="px-6 text-center">
          {{ product.quantity }}
        </td>

        <td class="px-6 text-center">
          {{ product.created_at }}
        </td>
        <td>
          <div class="px-2 flex justify-center items-center">
            <button  @click="editProduct(product.id)" class="px-4 py-2 mt-2  bg-gray-100 hover:bg-pink-600 hover:text-white rounded-3xl">{{ $t('Edit') }}</button>
            <button @click="showConfirmDialog(product.id)" class="px-4 py-2 mx-2 mt-2 rounded-3xl text-base hover:bg-pink-600 bg-gray-700 text-white">x</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

  </div>



</template>

<script>
import axiosClient from "@/axios";
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
import {mapState} from "vuex";
export default {
  components: {Sidbar, Navbar},
  data() {
    return {
      // products:[],
      showConfirmationDialog: false,
      productIdToDelete: null,
      filters: {
        id: '',
        name: '',
        category: '',

        // created_at: '',
      },
    };
  },
  /*async created() {
  try {
      const response = await axiosClient.get('api/vendor/products');

      this.products = response.data.data;
      console.log(this.products);
      } catch (error) {
      console.error(error);
      }
  },*/
  computed: {
    ...mapState('vendor', ['products']),
    ...mapState('vendor', ['categories']),
    filteredProducts() {
      return this.products.filter(product => {
        return (
            (this.filters.name === '' || product.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
            (this.filters.id === '' || product.id.toString().includes(this.filters.id)) &&
            (this.filters.category === '' || product.category.toLowerCase().includes(this.filters.category.toLowerCase()))
        );
      });
    },
  },

  methods: {
    async deleteProduct(productId) {
      try {
        await axiosClient.delete(`api/vendor/products/${productId}`);

        // Remove the product from the products array
        this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        console.error(error);
      }
    },
    editProduct(id) {
      this.$router.push({name: 'EditProduct', params: {id}});
    },
    showConfirmDialog(productId) {
      this.productIdToDelete = productId;
      this.showConfirmationDialog = true;
    },
    confirmDelete() {
      this.deleteProduct(this.productIdToDelete);
      this.showConfirmationDialog = false;
    },
    cancelDelete() {
      this.showConfirmationDialog = false;
    },

  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  }
}
</script>

<style lang="scss" scoped>

</style>