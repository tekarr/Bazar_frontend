<template>

    
    
        <div v-bind="$attrs" class="">
        <form @submit.prevent="submitForm" class="  mx-10 ">


            <!-- error massege -->
            <div v-if="errMsg" class="flex items-center justify-between p-3 my-2 mb-6 bg-red-600 text-white rounded">
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

            <!-- sucsses massege -->
            <div v-if="scMsg" class=" flex items-center justify-between p-3 my-2 bg-green-600 text-white rounded">
                {{scMsg}}
                <span @click="scMsg=''" class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </span>
            </div>

            <!-- Preview images -->
            <div class="flex flex-col items-center justify-center   p-4 rounded-3xl mb-4">
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 p-2">
                <div v-for="(imageObj, index) in images" :key="index" class="relative">
                    <img :src="imageObj.url" :alt="'Image ' + index" class="w-full h-auto rounded-xl shadow-md" />
                    <button 
                    @click="removeImage(index)" 
                    class="absolute top-1 right-1 bg-pink-600 text-white rounded-full w-6 h-6 hover:bg-pink-700 focus:outline-none">
                    &times;
                    </button>
                </div>
                </div>
            </div> 
            <hr>

            <!-- File input -->
            <div class="mb-8 mt-8 ">
                <label class="mb-4 p-2 bg-pink-600 text-white rounded-3xl px-4 shadow-md hover:bg-pink-700 cursor-pointer">
                Choose Images
                <input type="file" multiple @change="onFileChange" class="hidden" />
                </label>
            </div>

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
                    <input type="number" min="1" id="price" v-model="product.price" placeholder="$" required class="block w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <p class="mt-2 mb-2 text-gray-500 hidden">Entered price: {{ product.price }}</p>
                </div>

                <div class="">
                    <label for="quantity" class="text-gray-700">Quantity:</label>
                    <input type="number" min="1" id="quantity" v-model="product.quantity" required class="block w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
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
            <label for="status">Status</label><br>
            <select v-model="product.status"  class="p-2 my-4 px-4  border-2 border-pink-600 rounded-xl" required>
                    <option disabled value="">Please select onese</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="out_of_stock">out_of_stock</option>
            </select>
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
            variations: [],
        },
        formData : new FormData(),
        attributes: [],
        checked: false,
        categories: [],
        images: [],
        files: [],
        errMsg: '',
        scMsg: '',
        imageUrl: null,
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
        onFileChange(event) {
        this.files = event.target.files;
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
            this.images.push({ url: e.target.result });
            };
            reader.readAsDataURL(file);
        }
        },
        removeImage(index) {
        this.images.splice(index, 1);
        },

        async submitForm() {
        try {
        this.scMsg = ''
        this.errMsg = ''  
        
        this.formData.append('name', this.product.name);
        this.formData.append('description', this.product.description);
        this.formData.append('status', this.product.status);
        this.formData.append('quantity', this.product.quantity);
        this.formData.append('category_id', this.product.category_id);
        this.formData.append('price', this.product.price);

        for (let i = 0; i < this.product.variations.length; i++) {
            this.formData.append(`variations[${i}]`, JSON.stringify(this.product.variations[i]));
        }
         // Append files to formData
        for (let i = 0; i < this.files.length; i++) {
            this.formData.append(`images[${i}]`, this.files[i]);
        }

        for (let pair of this.formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        const response = await axiosClient.post(`api/vendor/products`, this.formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
        this.scMsg = response.data.message
        // handle successful submission
        } catch (error) {
        console.log(error.response.data);
        this.errMsg = error.response.data.message;
        // handle error during submission
        }
        window.scrollTo({ top: 50 });
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