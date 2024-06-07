<template>

<navbarr/>

        <div v-bind="$attrs" class="mt-28 bg-gray-900 py-10 pt-20 flex justify-center">
        <form @submit.prevent="submitForm" class="mx-10 text-white ">

            <!-- image preview -->
            <div v-if="imageUrl" class="my-8 flex justify-center pt-8">
                <img :src="imageUrl" alt="Selected Image" class="max-w-md max-h-md rounded-3xl hover:shadow-md" />
            </div>

            <!-- Choose image button -->
            <div class=" h-20 ">    
                <label class="mb-4 p-2 px-4 bg-pink-600 text-white rounded-3xl shadow-md hover:bg-gray-800 cursor-pointer">
                    Choose image
                    <input type="file" @change="onFileChange" class="hidden" />
                </label>
                </div>
            <div class="mb-4 opacity-80">Prefered image size <span class="text-pink-500">100x50</span></div>
                
            

            <!-- name -->
            <div class="mb-5 text-start w-80">
                <label class="" for="name">Store Name</label>
                <input type="text" id="name" v-model="name" placeholder="Storename" 
                class="w-full mt-4 bg-white text-black mr-10 pl-4 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>

            <!-- Description -->
            <div class="mb-2 text-start ">
                <div><label class=" " for="description" >Description</label></div>
                <textarea 
                    class="w-full max-w-lg text-black p-4 bg-white my-4 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500" rows="5" 
                    v-model="description" placeholder="Enter your text here...">
                </textarea>
            </div>


            <!-- phone number -->
            <!-- <div class="mb-5 text-start w-80">
                <label class="" for="storename">Phone number</label>
                <input type="text" id="Phonenumber" v-model="Phonenumber" placeholder="Phone number" 
                class="w-full mt-4 bg-white text-black mr-10 pl-4 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div> -->
            
            <!-- catagories -->
            <div class="hidden">Selected: {{ selected }}</div>
            <div class="">
                <p class="">Category</p>    
                <select v-model="category" @input="select" class="p-2 my-4 px-4  border-2 text-black border-pink-600 rounded-xl">
                    <option disabled value="">Please select one</option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.id">
                    {{ category.name }}
                    </option>
                </select>
            </div>


            <!-- open & close -->
            <!-- <div class="flex justify-between mb-8 w-96">
            <div>
                <label for="start-time" class=" mb-2 ml-4 text-sm font-medium  flex justify-start">Open </label>
                <div class="relative">
                    <input type="time" id="start-time" class="bg-white border-2 px-8  py-2  leading-none border-gray-300 text-gray-900 text-md rounded-3xl focus:outline-none focus:ring-pink-600 focus:border-pink-600 block w-full " value="00:00" required />
                </div>
            </div>
            <div>
                <label for="end-time" class=" mb-2 ml-4 text-sm font-medium  flex justify-start ">Close </label>
                <div class="relative">
                    <input type="time" id="end-time" class="bg-white px-8 py-2 border-2 leading-none border-gray-300 text-gray-900 text-md rounded-3xl focus:outline-none focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5" value="00:00" required />
                </div>
            </div>
            </div> -->

            <hr>
            

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Become Vendor</button>
    </form>
    </div>

</template>

<script>
import Navbarr from '@/components/customer/Navbarr.vue';
import axiosClient from "@/axios";
import ImageUploader from '@/components/vendor/ImageUploader.vue';
export default {
    components: { Navbarr , ImageUploader },
    data() {
        
        return {
        name: '',
        imageUrl: '',
        image: '',
        startime:'09:00',
        endtime:'18:00',
        selected:'',
        Phonenumber:'',
        description:'',
        selectedFile: null,
        categories: [],
        category: '',
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
    },
    methods: {
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
            this.image = this.selectedFile.name;
            if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(this.selectedFile);
            }
        },
        async submitForm() {
        try {
        const formData = new FormData();

        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('category', this.category);
        formData.append('image', this.selectedFile);

        // Get the user token from local storage
        const token = localStorage.getItem('token');

        // Send a POST request to the API
        const response = await axiosClient.post('api/customer/become-vendor', formData, {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
        }
        });

        // Log the response for debugging
        console.log(response.data);

        // Clear the form fields
        this.name = '';
        this.description = '';
        this.image = '';
        this.category = '';

        // Redirect the user to the dashboard
        this.$router.push('/vendor');

        } catch (error) {
        console.error(error);
        }
    },
        select(category){
            category.name = this.selected
        }
    },
};
</script>