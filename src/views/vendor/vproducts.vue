<template>


        <!-- Add Product -->
        <div class="mx-8 bg-gray-100 p-2  grid grid-cols-6 gap-1 justify-between rounded-3xl ">
            <router-link to="/vendor/products/add">
                <div class="h-40 w-40 bg-gray-200 my-2 ml-2 rounded-3xl cursor-pointer flex justify-center items-center text-3xl text-bold text-gray-500">+</div>
            </router-link>
        </div>

        <div class="ml-10 mt-4">
            you don't have product 
            <router-link to="/vendor/products/add" class=" ml-2 text-pink-600 cursor-pointer">Add product</router-link>
        </div>


</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
        
    }
</script>

<style lang="scss" scoped>

</style>