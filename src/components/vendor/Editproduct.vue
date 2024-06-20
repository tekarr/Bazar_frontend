<template>
    <sidbar/>
    
    
        <div v-if="product"  class="">
        <form @submit.prevent="submitForm" v-bind="$attrs" class="  mx-10 " >


            <div class="flex flex-col items-center justify-center   p-4 rounded-3xl mb-4">
                <hr>

                <!-- Preview images -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 p-2">
                <div v-for="(image, index) in images" :key="index" class="relative">
                    <img :src="image.url" :alt="'Image ' + index" class="w-full h-auto rounded-xl shadow-md" />
                    <button 
                    @click="removeImage(index)" 
                    class="absolute top-1 right-1 bg-pink-600 text-white rounded-full w-6 h-6 hover:bg-pink-700 focus:outline-none">
                    &times;
                    </button>
                </div>
                </div>
            </div>

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
            <p class="">{{ product.name }}</p>

            <!-- Description -->
            <div class="mb-2 text-start ">
                <div><label class=" " for="storename" >Description</label></div>
                <textarea v-model="product.description"
                    class="w-full max-w-lg p-4 bg-white my-4 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500" rows="5" 
                    placeholder="Enter your text here...">
                </textarea>
            </div>
            <p class="">{{ product.description }}</p>


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
                <select v-model="product.category_id" @input="select" class="p-2 my-4 px-4  border-2 border-pink-600 rounded-xl" required>
                    <option disabled value="">Please select onese</option>
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
            
        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Update</button>
    </form>
    </div>

</template>

<script>
import axiosClient from "@/axios";
export default {
    data() {
        return {
        product: {
        variations: [],
        },
        categories: [],
        attributes: [],
        checked: false,
        images: [],
        files: null,
        };
    },
    async created() {
        //fetching product 
        try {
            const id = this.$route.params.id;
            console.log(id)
            const response = await axiosClient.get(`api/vendor/products/${id}`);
            this.product = response.data.data;
            console.log(this.product);
            //console.log(this.product.category_id);
            
        } catch (error) {
            console.error(error);
        }
        //fetching categories
        try {
        const response = await axiosClient.get('api/categories');
        this.categories = response.data;
        const categoryNames = this.categories.map(category => category.id);
        //console.log(categoryNames);
        } catch (error) {
        console.error(error);
        }
         //fetching variations
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
        this.product.variations.length = 0;

    },
    methods: {

        async submitForm() {
        try {   
        const id = this.$route.params.id;  
        const formData = new FormData();
        this.product = this.product

        formData.append('name', this.product.name);
        formData.append('description', this.product.description);
        formData.append('status', this.product.status);
        formData.append('quantity', this.product.quantity);
        formData.append('category_id', this.product.category_id);
        formData.append('price', this.product.price);
        this.product.variations.forEach((variation, index) => {
            formData.append(`variations[${index}]`, variation);
        });
        for (let i = 0; i < this.files.length; i++) {
            console.log(this.files[i]);
            formData.append(`images[${i}]`, this.files[i]);
        }  
        
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        const response = await axiosClient.put(`api/vendor/products/${id}`, formData)

        console.log(response.data);
        // handle successful submission
        } catch (error) {
            if (error.response) {
            console.log(error.response);
            //this.errMsg = error.response.data.errors;
        } else {
            console.log('Error', error.message);
        }
        }
        },
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