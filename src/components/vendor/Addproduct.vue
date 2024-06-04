<template>
    <sidbar/>
    
    
        <div class="">
        <form @submit.prevent="submitForm" class="  mx-10 " >


            <!-- imageuploader -->
            <image-uploader-2/>

            <!-- name -->
            <div class="mb-5 text-start w-80">
                <label class="" for="storename">Name</label>
                <input type="text" id="productname" v-model="productname" placeholder="product name" 
                class="w-full mt-4 bg-white px-10 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>

            <!-- Description -->
            <div class="mb-2 text-start ">
                <div><label class=" " for="storename" >Description</label></div>
                <textarea 
                    class="w-full max-w-lg p-4 bg-white my-4 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500" rows="5" 
                    placeholder="Enter your text here...">
                </textarea>
            </div>

            <!-- Price -->
            <div class="flex justify-between w-96">
                <div>
                    <label for="price" class="text-gray-700">Price $:</label>
                    <input type="number" min="1" id="price" v-model.number="price" placeholder="$"  class="block w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <p class="mt-2 mb-2 text-gray-500 hidden">Entered price: {{ price }}</p>
                </div>
                <div class="">
                    <label for="quantity" class="text-gray-700">Quantity:</label>
                    <input type="number" min="1" id="quantity" v-model.number="quantity" class="block w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <p class="mt-2 text-gray-500 hidden">Entered price: {{ quantity }}</p>  
                </div>
            </div>

            <!-- catagories -->
            <div class="hidden">Selected: {{ selected }}</div>
            <div class="">
                <p class="">Category</p>    
                <select v-model="selected" @input="select" class="p-2 my-4 px-4  border-2 border-pink-600 rounded-xl">
                    <option disabled value="">Please select one</option>
                    <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
                </select>
            </div>

            <hr>
            
        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Add</button>
    </form>
    </div>

</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue';
import ImageUploader from '@/components/vendor/ImageUploader.vue';
import ImageUploader2 from './ImageUploader2.vue';
export default {
    components: {  Sidbar, ImageUploader, ImageUploader2 },
    data() {
        return {
        productname: '',
        fileSelected: true,
        startime:'09:00',
        endtime:'18:00',
        selected:'',
        price: null,
        quantity: null,

        categories: [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
        // Add more categories as needed
        ],
        };
    },
    methods: {
        submitForm() {
        // Perform form submission logic here
        console.log('Added');
        console.log('name:', this.storename);
        console.log('startime:', this.startime);
        console.log('endtime:', this.endtime);
        },
        select(category){
            category.name = this.selected
        }
    },
};
</script>