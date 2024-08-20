<template>


    <!-- Alert: Success -->
    <div v-if="success" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-3xl">
        <p class="text-lg"> added successfully!</p>
        <button @click="success = false" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
        </div>
    </div>

    <!-- Alert: error -->
    <div v-if="error" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-3xl">
        <p class="text-lg"> already in your cart</p>
        <button @click="error = false" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
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
                <img class="h-96 w-96 object-cover rounded-3xl  hover:cursor-pointer transition-all" 
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

        <div class="w-full  md:w-full lg:w-1/3 xl:w-1/2 mt-5 md:mt-0">
            <div class="p-10 mt-20 md:pr-10 w-96">
                <p class="text-lg md:text-3xl font-extrabold pb-1 text-start">{{ product.name }}</p>
                <p class="text-lg md:text-base text-start  font-bold opacity-30 mb-1 md:pb-0">{{ product.status }}</p>
                <div class="text-lg md:text-2xl font-bold p-3 text-start">{{ product.price }}$</div>
                <p class="pb-1 text-base md:text-start w-80">{{ product.description }}</p>
                <div class="flex flex-col md:flex-row justify-start w-80 p-1 pt-10">
                    <button  class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 "
                    @click="addToCart(product)">{{ $t('Add to Cart') }}</button>
                </div>
            </div>
        </div>

    </div>


        <!-- varations -->
        <div class="flex justify-center mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center ">
            <div v-for="(attribute, index) in variationAttributes" :key="index" class="bg-white rounded-3xl p-6 shadow-md w-full md:w-80 xl:w-64 mx-4 ">
            <h3 class="text-xl font-bold mb-2">{{ attribute }}</h3>
            <ul class="list-none mb-0 ">
                <li v-for="variation in getVariationsByAttribute(attribute)" :key="variation.variation_id" class="flex items-center mb-2 ">
                <input type="radio" :id="variation.variation_id" :value="variation.value" v-model="selectedVariations[attribute]" class="mr-2">
                <label :for="variation.variation_id" class="text-gray-600 mx-2">{{ variation.value }}</label>
                </li>
            </ul>
            </div>
        </div>
        </div>



</template>

<script>
import axiosClient from '@/axios';

    export default {
        data(){
            return{
            mainImage: '', 
            images: [],   
            product: [],
            success: false,
            error: false,
            selectedVariations: {},
            variationAttributes: [],
            selectedVariation: null,
            props: {
                attribute: String,
                variations: Array
            },
            };
        },

        async created() {
        const id = this.$route.params.id;
        try {
            const response = await axiosClient.get(`api/products/${id}`);
            this.product = response.data.data;
            this.images = this.product.images;
            this.variationAttributes = [...new Set(this.product.variations.map(v => v.attribute))]
            console.log(this.product);
        } catch (error) {
            console.error(`There was an error fetching the product: ${error}`);
        }
        if (this.images.length > 0) {
        this.mainImage = this.images[0];
        }
        },
        methods:{
            getVariationsByAttribute(attribute) {
                return this.product.variations.filter(v => v.attribute === attribute)
            },
            addToCart(product) {
            // Store product ID in localStorage
            let cartItem = localStorage.getItem('cart');
            let cart = [];
            if (cartItem) {
                try {
                    cart = JSON.parse(cartItem)|| [];
                } catch (error) {
                    console.error('Error parsing cart data from localStorage:', error);
                    cart = [];
                }
            }

            const selectedItem = {
                id: product.id,
                variations: Object.keys(this.selectedVariations).map((attribute) => ({
                attribute,
                value: this.selectedVariations[attribute],
                })),
            };

            const existingItem = cart.find((item) => {
                return (
                item.id === product.id &&
                item.variations.every((variation, index) => {
                    return (
                    variation.attribute === selectedItem.variations[index].attribute &&
                    variation.value === selectedItem.variations[index].value
                    );
                })
                );
            });

                if (!existingItem) {
                cart.push(selectedItem);
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(cart);
                this.success = true;
            } else {
                this.error = true;
            }
        },
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