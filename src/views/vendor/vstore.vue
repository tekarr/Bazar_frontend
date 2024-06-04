<template>
    <sidbar/>
    
    
        <div class="">
        <form @submit.prevent="submitForm" class="mx-10 ">

            <!-- imageuploader -->
            <image-uploader/>

            <!-- name -->
            <div class="mb-5 text-start w-80">
                <label class="" for="storename">Name</label>
                <input type="text" id="storename" v-model="storename" placeholder="Storename" 
                class="w-full mt-4 bg-white px-10 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
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

            <!-- open & close -->
            <div class="flex justify-between mb-8 w-96">
            <div>
                <label for="start-time" class=" mb-2 ml-4 text-sm font-medium text-gray-900 flex justify-start">Open </label>
                <div class="relative">
                    <input type="time" id="start-time" class="bg-white border-2 px-8  py-2  leading-none border-gray-300 text-gray-900 text-md rounded-3xl focus:outline-none focus:ring-pink-600 focus:border-pink-600 block w-full " min="09:00" max="18:00" value="00:00" required />
                </div>
            </div>
            <div>
                <label for="end-time" class=" mb-2 ml-4 text-sm font-medium text-gray-900 flex justify-start ">Close </label>
                <div class="relative">
                    <input type="time" id="end-time" class="bg-white px-8 py-2 border-2 leading-none border-gray-300 text-gray-900 text-md rounded-3xl focus:outline-none focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5" min="09:00" max="18:00" value="00:00" required />
                </div>
            </div>
            </div>
            <hr>
            

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Update</button>
    </form>
    </div>

</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue';
import ImageUploader from '@/components/vendor/ImageUploader.vue';
export default {
    components: {  Sidbar, ImageUploader },
    data() {
        return {
        storename: '',
        fileSelected: true,
        startime:'09:00',
        endtime:'18:00',
        selected:'',

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