<template>
    <sidbar/>
    
    <div class="p-4 sm:ml-64 mt-20"> 

        <p class="text-3xl font-bold text-center pt-5 ">{{ $route.name }}</p>       
        <div class="flex items-center justify-center min-h-screen">
        <form @submit.prevent="submitForm" class="max-w-sm mx-auto mb-40">
            <!-- image -->
            <div class="relative mb-10 flex justify-center ">
                <input type="file" id="fileInput" class="hidden">
                <label for="fileInput" class="cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-3xl">
                Select image
                </label>
                <span
                class="absolute top-0 right-0 mt-2 mr-2 text-gray-500"
                v-if="!fileSelected">
                No chosen file
                </span>
            </div>

            <!-- name -->
            <div class="mb-5 text-start">
                <label class="font-bold pl-5" for="storename">Name</label>
                <input type="text" id="storename" v-model="storename" placeholder="storename" 
                class="w-full mt-4 bg-slate-50 px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 " required>
            </div>
            
            <!-- open & close -->
            <div class="flex justify-between">
            <div>
                <label for="start-time" class=" mb-2 text-sm font-medium text-gray-900 flex justify-center">Open </label>
                <div class="relative">
                    <input type="time" id="start-time" class="bg-white border-2 px-8  py-2  leading-none border-gray-300 text-gray-900 text-md rounded-3xl focus:outline-none focus:ring-pink-600 focus:border-pink-600 block w-full " min="09:00" max="18:00" value="00:00" required />
                </div>
            </div>
            <div>
                <label for="end-time" class=" mb-2 text-sm font-medium text-gray-900 flex justify-center ">Close </label>
                <div class="relative">
                    <input type="time" id="end-time" class="bg-white px-8 py-2 border-2 leading-none border-gray-300 text-gray-900 text-md rounded-3xl focus:outline-none focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5" min="09:00" max="18:00" value="00:00" required />
                </div>
            </div>
            </div>


        <button type="submit" class=" m-5 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">Add</button>
    </form>
    </div>
    </div>

</template>

<script>
import navbar from './navbar.vue';
import Sidbar from './Sidbar.vue';
export default {
    components: { navbar, Sidbar },
    data() {
        return {
        storename: '',
        fileSelected: true,
        startime:'09:00',
        endtime:'18:00'
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
    }
};
</script>