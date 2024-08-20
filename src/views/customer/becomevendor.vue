<template>

<navbarr/>

        <div v-bind="$attrs" class="mt-28 bg-gray-900 py-10 pt-20 flex justify-center">
        <form @submit.prevent="submitForm" class="mx-10 text-white ">

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

            <!-- image preview -->
            <div v-if="imageUrl" class="my-8 flex justify-center pt-8">
                <img :src="imageUrl" alt="Selected Image" class="max-w-md max-h-md rounded-3xl hover:shadow-md" />
            </div>

            <!-- Choose image button -->
            <div class=" h-20 ">    
                <label class="mb-4 p-2 px-4 bg-pink-600 text-white rounded-3xl shadow-md hover:bg-gray-800 cursor-pointer">
                    {{ $t('Choose image') }}
                    <input type="file" @change="onFileChange" class="hidden" />
                </label>
                </div>
            <div class="mb-4 opacity-80">{{ $t('Prefered image size') }} <span class="text-pink-500">100x50</span></div>
                
            

            <!-- name -->
            <div class="mb-5 text-start w-80">
                <label class="" for="name">{{ $t('Store name') }}</label>
                <input type="text" id="name" v-model="name" placeholder="Storename" 
                class="w-full mt-4 bg-white text-black  px-4 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>

            <!-- Description -->
            <div class="mb-2 text-start ">
                <div><label class=" " for="description" >{{ $t('Description') }}</label></div>
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
            <div class="">
                <p class="">{{ $t('category') }}</p>    
                <select v-model="category" @input="select" class="p-2 my-4 px-4  border-2 text-black border-pink-600 rounded-xl">
                    <option disabled value="">Please select one</option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.id">
                    {{ category.name }}
                    </option>
                </select>
            </div>

            <p>{{category}}</p>

            <hr>
            

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">{{ $t('Become vendor') }}</button>
    </form>
    </div>

</template>

<script>
import axiosClient from "@/axios";

export default {
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
        errMsg: '',
        };
    },
    async created() {
    try {
        const response = await axiosClient.get('api/categories');
        this.categories = response.data;
        const categoryNames = this.categories.map(category => category.id);
        //console.log(categoryNames);
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

        // Send a POST request to the API
        const response = await axiosClient.post('api/customer/become-vendor', formData, {
        headers: {
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
        console.log(error.response.data.errors);
        this.errMsg = error.response.data.errors;
        }
    },
        select(category){
            category.name = this.selected
        }
    },
};
</script>