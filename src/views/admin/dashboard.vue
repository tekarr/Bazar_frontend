<template>


        <!-- Statistic cards -->
        <div class="  overflow-x-auto rounded-3xl mt-8">

        <div class="grid grid-cols-4 gap-4 mb-4 md:grid-cols-1 lg:grid-cols-3 ">

            <!-- client card -->
            <div class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg class="h-full fill-white stroke-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span>2680 +</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">Clients</p>
                </div>
            </div>

            <!-- Sales card -->
            <div class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10  hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
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
            </div>

            <!-- vendor card -->
            <div class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg class="h-full fill-white stroke-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">380 +</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">Vendors</p>
                </div>
            </div>

            <!-- Orders card -->
            <div class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg class="flex-shrink-0 w-14 h-14  transition duration-75   " enable-background="new 0 0 100 100" height="100" viewBox="0 0 100 110" width="100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g>
                            <path d="m78.8 62.1-3.6-1.7c-.5-.3-1.2-.3-1.7 0l-21.5 10.2c-1.2.6-2.7.6-3.9 0l-21.6-10.2c-.5-.3-1.2-.3-1.7 0l-3.6 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.7z"/><path d="m78.8 48.1-3.7-1.7c-.5-.3-1.2-.3-1.7 0l-21.4 10.2c-1.2.6-2.7.6-3.9 0l-21.5-10.2c-.5-.3-1.2-.3-1.7 0l-3.7 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.8c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.8z"/><path d="m21.2 37.8 26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.6-.8 1.6-2.9 0-3.7l-26.8-12.7c-1.2-.6-2.7-.6-3.9 0l-26.8 12.8c-1.6.7-1.6 2.9 0 3.6z"/></g>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">200 +</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">Orders</p>
                </div>
            </div>

            <!-- Stores card -->
            <div class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect ">
                    <div class="h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0  h-10 ">
                            <path d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"></path>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">90 +</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">Stores</p>
                </div>
            </div>

        </div>
        </div>


</template> 

<script>
import Navbar from '@/components/admin/navbar.vue';
import Sidbar from '/src/components/admin/Sidbar.vue'

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