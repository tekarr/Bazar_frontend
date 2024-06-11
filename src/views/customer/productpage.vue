<template>

    <navbarr/>

    <!-- Alerts: Success -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-3xl">
        <p class="text-lg"> added successfully!</p>
        <button @click="showPopup = false" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
        </div>
    </div>


    <div class="grid grid-cols-2 gap-4 mt-40  justify-center items-center">
        <div class="m-10 ">
            <!-- Main image and thumbnails -->
            <div class="flex justify-center">
                <!-- Main image -->
                <div class="flex justify-center items-center">
                    <button @click="nextImage" class="m-4  h-10 w-10 rounded-full border-2 border-gray-300 hover:border-pink-600 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </button>
                </div>
                <img class="w-full object-cover rounded-3xl  hover:cursor-pointer transition-all" 
                    :src="mainImage" alt="">
                <!-- Previous and next buttons -->
                <div class="flex justify-center items-center">
                    <button @click="nextImage" class="m-4  h-10 w-10 rounded-full border-2 border-gray-300 hover:border-pink-600 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </div>
                
            </div>
        </div>
        <!-- Rest of your code... -->

        <div class="w-full md:w-full lg:w-1/3 xl:w-1/2 mt-5 md:mt-0">
            <div class="p-10 mt-20 md:pr-10 w-96">
                <p class="text-lg md:text-3xl font-extrabold pb-1 text-start">{{ product.name }}</p>
                <p class="text-lg md:text-base text-start  font-bold opacity-30 mb-1 md:pb-0">{{ product.name }}</p>
                <div class="text-lg md:text-2xl font-bold p-3 text-start">{{ product.price }}$</div>
                <p class="pb-1 text-base md:text-start w-80">{{ product.description }}</p>
                <div class="flex flex-col md:flex-row justify-start w-80 p-1 pt-10">
                    <router-link to="/product/:id" class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 "
                    @click="showPopup = true"> Add to Cart</router-link>
                </div>
            </div>
        </div>
    </div>

    <footer-2/>
</template>

<script>
import Navbarr from '/src/components/customer/Navbarr.vue';
import Footer2 from '/src/components/customer/footer2.vue';
import axiosClient from '@/axios';

    export default {
    components: { Navbarr, Footer2 },
        data(){
            return{
            mainImage: '', 
            images: [
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/200',
                'https://via.placeholder.com/250',
                'https://via.placeholder.com/300',
            ],   
            product: [],
            showPopup: false,
            };
        },

        async created() {
        const id = this.$route.params.id;
        try {
            const response = await axiosClient.get(`api/products/${id}`);
            this.product = response.data.product;
            console.log(this.product);
        } catch (error) {
            console.error(`There was an error fetching the product: ${error}`);
        }
        if (this.images.length > 0) {
        this.mainImage = this.images[0];
        }
        },
        methods:{
            previousImage() {
            let index = this.images.indexOf(this.mainImage);
            if (index <= 0) {
                index = this.images.length;
            }
            this.mainImage = this.images[index - 1];
            },
            nextImage() {
                let index = this.images.indexOf(this.mainImage);
                if (index >= this.images.length - 1) {
                    index = -1;
                }
                this.mainImage = this.images[index + 1];
            },
    }
}
</script>

<style lang="scss" scoped>

</style>