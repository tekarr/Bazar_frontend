<template>
    <sidbar/>
    
    
        <div v-bind="$attrs" class="">
        <form @submit.prevent="submitForm" class="  mx-10 " >


            <!-- imageuploader -->
            <image-uploader-2/>

            <!-- name -->
            <div class="mb-5 text-start w-80">
                <label class="" for="storename">Name</label>
                <input type="text" id="productname" v-model="product.name" placeholder="product name" 
                class="w-full mt-4 bg-white px-10 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>
            <p class="hidden">{{ product.name }}</p>

            <!-- Description -->
            <div class="mb-2 text-start ">
                <div><label class=" " for="storename" >Description</label></div>
                <textarea v-model="product.description"
                    class="w-full max-w-lg p-4 bg-white my-4 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500" rows="5" 
                    placeholder="Enter your text here...">
                </textarea>
            </div>
            <p class="hidden">{{ product.description }}</p>


            <!-- Price -->
            <div class="flex justify-between w-96">
                <div>
                    <label for="price" class="text-gray-700">Price $:</label>
                    <input type="number" min="1" id="price" v-model="product.price" placeholder="$"  class="block w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <p class="mt-2 mb-2 text-gray-500 hidden">Entered price: {{ product.price }}</p>
                </div>

                <div class="">
                    <label for="quantity" class="text-gray-700">Quantity:</label>
                    <input type="number" min="1" id="quantity" v-model="product.quantity" class="block w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <p class="mt-2 text-gray-500 hidden">Entered price: {{ product.quantity }}</p>  
                </div>
            </div>

            <!-- catagories -->
            <div class="">
                <p class="">Category</p>    
                <select v-model="product.category_id" @input="select" class="p-2 my-4 px-4  border-2 border-pink-600 rounded-xl">
                    <option disabled value="">Please select one</option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.id">
                    {{ category.name }}
                    </option>
                </select>
            </div>
            <p class="hidden">{{ product.category_id }}</p>

            <!-- Status -->
            <div class="mb-5 text-start w-80">
            <label for="status">Active</label>
            <input type="checkbox" id="status" v-model="product.status" 
                class="ml-4 mt-2">
            </div>
            <p class="hidden">{{product.status}}</p>


            <!-- Attributes -->
            <div class="p-6 bg-white shadow-md rounded-lg">
                <p class="mb-4 text-lg font-bold hidden">{{product.variations}}</p>
                <p class="mb-4 text-lg font-bold">Attributes</p>
                <div v-for="(attribute, index) in attributes" :key="index" class="mb-4">
                        <input type="checkbox" :id="attribute.name" v-model="attribute.checked" @change="onAttributeChange(attribute)" class="hidden">
                        <label class="text-lg cursor-pointer flex items-center" :for="attribute.name">
                            <span class="mr-2 text-pink-600">
                                <svg v-if="attribute.checked" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                                </svg>
                            </span>
                            {{ attribute.name }}
                        </label>
                        
                <!-- variations -->
                <div v-if="attribute.checked">
                    <div v-for="(variation, index2) in attribute.variations" :key="index2" class="pl-6 py-2">
                        <input type="checkbox" :id="variation.id" v-model="variation.checked" @change="onVariationChange(variation)" class="hidden">
                        <label class="text-sm cursor-pointer flex items-center " :for="variation.id">
                            <span class="mr-2 text-blue-500">
                                <svg v-if="variation.checked" class="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                                </svg>
                            </span>
                            {{ variation.value }}
                        </label>
                    </div>
                </div>
                </div>
            </div>

            <hr>
            
        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Add</button>
    </form>
    </div>

</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue';
import ImageUploader2 from './ImageUploader2.vue';
import axiosClient from "@/axios";
export default {
    components: {  Sidbar, ImageUploader2 },
    data() {
        return {
        product: {
            name: '',
            description: '',
            quantity: 0,
            category_id:'',
            price: '',
            status: true,
            variations: [],
        },
        attributes: [],
        checked: false,
        categories: [],
        };
    },
    async created() {

    try {
        const response = await axiosClient.get('api/categories');
        this.categories = response.data;
        const categoryNames = this.categories.map(category => category.id);
        console.log(categoryNames);
        } catch (error) {
        console.error(error);
        }

    try {
        const response = await axiosClient.get('api/variations');
        this.attributes = response.data.map(attribute => ({
            ...attribute,
        checked: false,
        values: attribute.variations.map(variation => variation.value)
        }));
        } catch (error) {
        console.error(error);
        }
    },
    methods: {
        
        async submitForm() {
        try {
        const response = await axiosClient.post('api/vendor/products', this.product);
        console.log(response.data);
        // handle successful submission
        } catch (error) {
        console.error(error);
        // handle error during submission
        }
        },
        onAttributeChange(attribute) {
        if (!attribute.checked) {
            attribute.variations.forEach(variation => {
            const index = this.product.variations.indexOf(variation.id);
            if (index !== -1) {
                this.product.variations.splice(index, 1);
            }
            variation.checked = false; 
            });
        }
        },
        onVariationChange(variation) {
        if (variation.checked) {
            this.product.variations.push(variation.id);
        } else {
            const index = this.product.variations.indexOf(variation.id);
            if (index !== -1) {
            this.product.variations.splice(index, 1);
            }
        }
        }
    },
};
</script>