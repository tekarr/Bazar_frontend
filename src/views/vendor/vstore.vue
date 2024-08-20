<template>
        <div class="">
        <form @submit.prevent="submitForm" class="mx-10 ">
            <div class="mt-4">.</div>

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

            <!-- image preview -->
            <div v-if="imageUrl" class="my-4 flex justify-start pt-8">
                <img :src="imageUrl" alt="" class="max-w-md max-h-md rounded-3xl hover:shadow-md" />
            </div>

            <hr class="mb-8">

            <!-- Choose image button -->
            <div class=" h-20 ">    
                <label class="mb-4 p-2 px-4 bg-pink-600 text-white rounded-3xl shadow-md hover:bg-gray-800 cursor-pointer">
                    {{ $t('Choose image') }}
                    <input type="file" @change="onFileChange" class="hidden" />
                </label>
            </div>
            <div class="mb-4 opacity-80">{{ $t('Prefered image size') }}<span class="text-pink-500"> 100x50</span></div>


            <!-- id -->

                <hr class="my-4">

            <!-- name -->
            <div class="mb-5 text-start w-80">
                <label class="" for="storename">{{ $t('Store name') }}</label>
                <input type="text" id="storename" v-model="store.name" placeholder="Storename" 
                class="w-full mt-4 bg-white px-4 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>



            <!-- Description -->
            <div class="mb-2 text-start ">
                <div><label class=" " for="storename" >{{ $t('Description') }}</label></div>
                <textarea v-model="store.description"
                    class="w-full max-w-lg p-4 bg-white my-4 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500" rows="5" 
                    placeholder="Enter your text here...">
                </textarea>
            </div>
            <p class="hidden">{{ store.description }}</p>

            <!-- phone number -->
            <!-- <div class="mb-5 text-start w-80">
                <label class="" for="storename">Phone number</label>
                <input type="text" id="Phonenumber" v-model="Phonenumber" placeholder="Phone number" 
                class="w-full mt-4 bg-white mr-10 pl-4 py-2 rounded-xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div> -->


            <!-- Status -->
            <div class="">
            <p class="">{{ $t('Status') }}</p>    
            <select v-model="store.status" @input="select" class="p-2 my-4 px-4  border-2 border-pink-600 rounded-xl">
                <option disabled value="">Please select one</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
            </select>
        </div>
        <p class="hidden">{{ store.status }}</p>

            <hr>
            

        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">{{ $t('Update') }}</button>
    </form>
    </div>

</template>

<script>
import axiosClient from "@/axios";


export default {
    data() {
        return {
        fileSelected: true,
        store: { },
        categories: [],
        selectedFile: null,
        imageUrl: null,
        errMsg: '',
        scMsg: '',
        };
    },
    methods: {
        onFileChange(e) {
            if (e.target.files.length > 0) {    
            this.selectedFile = e.target.files[0]
            } else {
            this.selectedFile = null;
            }
            //this.imageUrl = this.selectedFile;
            if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(this.selectedFile);
            }
            console.log(this.selectedFile)
        },
        async fetchStores() {
        try {
            const response = await axiosClient.get('api/vendor/stores');
            this.store = response.data.data;
            //console.log(this.store.image)
            //this.selectedFile = this.store.image;
            console.log(this.selectedFile)
            this.imageUrl = `http://localhost:8000/storage/${this.store.image}`;
        } catch (error) {
            console.error(`There was an error fetching the stores: ${error}`);
        }
        },
        async fetchCategories() {
        try {
            const response = await axiosClient.get('api/categories');
            this.categories = response.data;
        } catch (error) {
            console.error(`There was an error fetching the categories: ${error}`);
        }
        },
        async submitForm() {
        try {
        this.scMsg = ''
        this.errMsg = ''    
        const formData = new FormData();

        formData.append('name', this.store.name);
        formData.append('description', this.store.description);
        formData.append('status', this.store.status);
        if (this.selectedFile != null){
            formData.append('image', this.selectedFile);
        }
        

        console.log(this.selectedFile);

        const response = await axiosClient.post('api/vendor/stores', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log(response.data);
        this.scMsg = response.data.message

        // handle successful submission
        } catch (error) {
            if (error.response) {
            console.log(error.response.data.errors);
            this.errMsg = error.response.data.errors;
        } else {
            console.log('Error', error.message);
        }
        }
        window.scrollTo({ top: 50 });
        },
    },
    created() {
        this.fetchStores();
        this.fetchCategories();
        },
    // other component options...
    };
</script>