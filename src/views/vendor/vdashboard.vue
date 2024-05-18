<template>
    <sidbar/>
    
    <div class="p-4 sm:ml-64"> 
        <navbar/>  
        <!-- Statistic cards -->
        <div class="bg-pink-600 p-10 rounded-3xl">   
        
        <div class="grid grid-cols-4 gap-4 mb-4 ">
            
            <!-- client card -->
            <div class="w-50 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                <div class="h-12">
                    <svg class="h-full fill-white stroke-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </div>
                <div class="my-2">
                    <h2 class="text-4xl font-bold"><span>2680 +</span></h2>
                </div>
                <p class="mt-2 font-sans text-base font-medium text-gray-500">Clients</p>
            </div>
            
            <!-- Sales -->
            <div class="w-50 rounded-3xl bg-white p-10 ml-4 hover:shadow-2xl transition-all aspect">
                <div class="h-12">
                    <svg class="h-full fill-white"  stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path  d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#75EA00" stroke-width="1.5"/>
                        <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5" stroke="#75EA00" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="my-2">
                    <h2 class="text-4xl font-bold"><span class="">380$</span></h2>
                </div>
                <p class="mt-2 font-sans text-base font-medium text-gray-500">Sales</p>
            </div>

            <!-- vendor card -->
            <div class="w-50 rounded-3xl bg-white p-10 mx-4 hover:shadow-2xl transition-all aspect">
                <div class="h-12">
                    <svg class="h-full fill-white stroke-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </div>
                <div class="my-2">
                    <h2 class="text-4xl font-bold"><span class="">380 +</span></h2>
                </div>
                <p class="mt-2 font-sans text-base font-medium text-gray-500">Vendors</p>
            </div>

            
            <!-- Orders card -->
            <div class="w-48 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                <div class="h-12">
                    <svg class="flex-shrink-0 w-16 h-16  transition duration-75   " enable-background="new 0 0 100 100" height="100" viewBox="0 0 100 110" width="100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g>
                        <path d="m78.8 62.1-3.6-1.7c-.5-.3-1.2-.3-1.7 0l-21.5 10.2c-1.2.6-2.7.6-3.9 0l-21.6-10.2c-.5-.3-1.2-.3-1.7 0l-3.6 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.7z"/><path d="m78.8 48.1-3.7-1.7c-.5-.3-1.2-.3-1.7 0l-21.4 10.2c-1.2.6-2.7.6-3.9 0l-21.5-10.2c-.5-.3-1.2-.3-1.7 0l-3.7 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.8c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.8z"/><path d="m21.2 37.8 26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.6-.8 1.6-2.9 0-3.7l-26.8-12.7c-1.2-.6-2.7-.6-3.9 0l-26.8 12.8c-1.6.7-1.6 2.9 0 3.6z"/></g>
                    </svg>
                </div>
                <div class="my-2">
                    <h2 class="text-4xl font-bold"><span class="">200 +</span></h2>
                </div>
                <p class="mt-2 font-sans text-base font-medium text-gray-500">Orders</p>
            </div>
            

        </div>   
        </div>
    </div>

</template> 

<script>
import Navbar from '@/components/vendor/navbar.vue';
import Sidbar from '/src/components/vendor/Sidbar.vue'

    export default {
    components:
    { Sidbar , Navbar },
    data() {
    return {
    };
    },
    methods: {
    },
    }

</script>

<style lang="scss" scoped>

</style>