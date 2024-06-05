<template>

        <!-- Statistic cards -->
        <div class=" p-6 rounded-3xl">   
        
        <div class="grid grid-cols-5 gap-2 mb-4 md:grid-cols-2 lg:grid-cols-3 ">
            
            <!-- Products card -->
            <div class="flex justify-center">
                <div class="w-80 mt-4 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10 flex justify-start">
                        <svg  class=" w-9 h-9 hover:text-gray-100 transition duration-75  group-hover:text-gray-100 " fill="blue" height="20" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h48v48h-48z" fill="blue" fill-opacity=".01"/>
                            <path d="m4 14-.89443-1.7889c-.67757.3388-1.10557 1.0314-1.10557 1.7889zm20-10 .8944-1.78885c-.563-.28153-1.2258-.28153-1.7888 0zm20 10h2c0-.7575-.428-1.4501-1.1056-1.7889zm0 20 .8944 1.7889c.6776-.3388 1.1056-1.0314 1.1056-1.7889zm-20 10-.8944 1.7889c.563.2815 1.2258.2815 1.7888 0zm-20-10h-2c0 .7575.428 1.4501 1.10557 1.7889zm.89443-18.2111 19.99997-10.00005-1.7888-3.5777-20.00003 9.99995zm37.10557-1.7889v20h4v-20zm1.1056 18.2111-20 10 1.7888 3.5778 20-10zm-18.2112 10-19.99997-10-1.78886 3.5778 20.00003 10zm-18.8944-8.2111v-20h-4v20zm38.8944-21.7889-20-9.99995-1.7888 3.5777 20 10.00005z" fill="#00C1DC"/><path d="m4 14 20 10" stroke="#00C1DC" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><path clip-rule="evenodd" d="m24 24v20z" fill="#00C1DC" fill-rule="evenodd"/><path d="m24 44v-20" stroke="#00C1DC" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><path d="m44 14-20 10" stroke="#00C1DC" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><path d="m34.8944 10.7889c.988-.494 1.3884-1.69537.8945-2.68333-.494-.98795-1.6954-1.3884-2.6833-.89442zm-21.7888 6.4222c-.988.494-1.3884 1.6954-.8945 2.6833.494.988 1.6954 1.3884 2.6833.8945zm20-9.99995-20 9.99995 1.7888 3.5778 20-10z" fill="#00C1DC"/>
                        </svg>
                    </div>

                    <div>
                        <h2 class="text-4xl font-bold"><span>10 +</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">Products</p>
                </div>
            </div>


            <!-- Sales card -->
            <div class="flex justify-center">
                <div class="w-80 mt-4 rounded-3xl bg-white p-10  hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg class="h-full fill-white"  stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path  d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#75EA00" stroke-width="1.5"/>
                            <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5" stroke="#75EA00" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">180$</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">Sales</p>
                </div>
            </div>

            <!-- Low in stock card -->
            <div class="flex justify-center">
                <div class="w-80 mt-4 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10 ">
                        <svg height="34" viewBox="0 0 16 16" width="34" xmlns="http://www.w3.org/2000/svg"><g fill="#DB2777">
                            <path d="m12 6v-6h-8v6h-4v7h16v-7zm-5 6h-6v-5h2v1h2v-1h2zm-2-6v-5h2v1h2v-1h2v5zm10 6h-6v-5h2v1h2v-1h2z"/><path d="m0 16h3v-1h10v1h3v-2h-16z"/></g>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">2 +</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">Low in stock</p>
                </div>
            </div>
            
            <!-- Orders card -->
            <div class="flex justify-center">
                <div class="w-80 mt-4 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg class="flex-shrink-0 w-14 h-14  transition duration-75   " enable-background="new 0 0 100 100" height="100" viewBox="0 0 100 110" width="100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g>
                            <path d="m78.8 62.1-3.6-1.7c-.5-.3-1.2-.3-1.7 0l-21.5 10.2c-1.2.6-2.7.6-3.9 0l-21.6-10.2c-.5-.3-1.2-.3-1.7 0l-3.6 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.7z"/><path d="m78.8 48.1-3.7-1.7c-.5-.3-1.2-.3-1.7 0l-21.4 10.2c-1.2.6-2.7.6-3.9 0l-21.5-10.2c-.5-.3-1.2-.3-1.7 0l-3.7 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.8c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.8z"/><path d="m21.2 37.8 26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.6-.8 1.6-2.9 0-3.7l-26.8-12.7c-1.2-.6-2.7-.6-3.9 0l-26.8 12.8c-1.6.7-1.6 2.9 0 3.6z"/></g>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">9 +</span></h2>
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
import Storecard from '@/components/customer/storecard.vue';


    export default {

    components:
    { Sidbar , Navbar, Storecard },
    data() {
    return {
        cards: [
        {
            id: 1,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
            title: 'Weed',
            description: 'good for ur health',
            price: '95',
            store: 'Store-name'
        },
    ]
    };
    },
    methods: {
    },
    }

</script>

<style lang="scss" scoped>

</style>