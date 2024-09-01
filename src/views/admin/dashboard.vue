<template>

        <!-- Statistic cards -->
        <div class="overflow-x-auto rounded-3xl mt-8 py-10">

        <div class="grid grid-cols-4 gap-4 mb-4 md:grid-cols-1 lg:grid-cols-3 rounded-3xl ">

            <!-- client card -->
            <router-link to="/admin/users" class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg class="h-full fill-white stroke-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span>{{statistics.total_users}}</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">{{ $t('Users') }}</p>
                </div>
            </router-link>

            <!-- Sales card -->
            <router-link to="/admin/" class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10  hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg class="h-full fill-white"  stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path  d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#75EA00" stroke-width="1.5"/>
                            <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5" stroke="#75EA00" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">{{statistics.total_sales}}</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">{{ $t('Sales') }}</p>
                </div>
            </router-link>

            <!-- vendor card -->
            <router-link to="/admin/products" class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10">
                        <svg  class="flex-shrink-0 w-8 h-8 hover:text-gray-100 transition duration-75  group-hover:text-gray-100 " fill="currentColor" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h48v48h-48z" fill="currentColor" fill-opacity=".01"/>
                            <path d="m4 14-.89443-1.7889c-.67757.3388-1.10557 1.0314-1.10557 1.7889zm20-10 .8944-1.78885c-.563-.28153-1.2258-.28153-1.7888 0zm20 10h2c0-.7575-.428-1.4501-1.1056-1.7889zm0 20 .8944 1.7889c.6776-.3388 1.1056-1.0314 1.1056-1.7889zm-20 10-.8944 1.7889c.563.2815 1.2258.2815 1.7888 0zm-20-10h-2c0 .7575.428 1.4501 1.10557 1.7889zm.89443-18.2111 19.99997-10.00005-1.7888-3.5777-20.00003 9.99995zm37.10557-1.7889v20h4v-20zm1.1056 18.2111-20 10 1.7888 3.5778 20-10zm-18.2112 10-19.99997-10-1.78886 3.5778 20.00003 10zm-18.8944-8.2111v-20h-4v20zm38.8944-21.7889-20-9.99995-1.7888 3.5777 20 10.00005z" fill="currentColor"/><path d="m4 14 20 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><path clip-rule="evenodd" d="m24 24v20z" fill="#2f88ff" fill-rule="evenodd"/><path d="m24 44v-20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><path d="m44 14-20 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><path d="m34.8944 10.7889c.988-.494 1.3884-1.69537.8945-2.68333-.494-.98795-1.6954-1.3884-2.6833-.89442zm-21.7888 6.4222c-.988.494-1.3884 1.6954-.8945 2.6833.494.988 1.6954 1.3884 2.6833.8945zm20-9.99995-20 9.99995 1.7888 3.5778 20-10z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">{{statistics.total_products}}</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">{{ $t('Products') }}</p>
                </div>
            </router-link>

            <!-- Orders card -->
            <router-link to="/admin/orders" class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect">
                    <div class="h-10 ">
                        <svg class="flex-shrink-0 w-14 h-14 " enable-background="new 0 0 100 100" height="100" viewBox="0 0 100 110" width="100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g>
                            <path d="m78.8 62.1-3.6-1.7c-.5-.3-1.2-.3-1.7 0l-21.5 10.2c-1.2.6-2.7.6-3.9 0l-21.6-10.2c-.5-.3-1.2-.3-1.7 0l-3.6 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.7z"/><path d="m78.8 48.1-3.7-1.7c-.5-.3-1.2-.3-1.7 0l-21.4 10.2c-1.2.6-2.7.6-3.9 0l-21.5-10.2c-.5-.3-1.2-.3-1.7 0l-3.7 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.8c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.8z"/><path d="m21.2 37.8 26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.6-.8 1.6-2.9 0-3.7l-26.8-12.7c-1.2-.6-2.7-.6-3.9 0l-26.8 12.8c-1.6.7-1.6 2.9 0 3.6z"/></g>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">{{statistics.total_orders}}</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">{{ $t('Orders') }}</p>
                </div>
            </router-link>

            <!-- Stores card -->
            <router-link to="/admin/stores" class="flex justify-center">
                <div class="w-80 mt-2 rounded-3xl bg-white p-10 hover:shadow-2xl transition-all aspect ">
                    <div class="h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0  h-10 ">
                            <path d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"></path>
                        </svg>
                    </div>
                    <div class="my-2">
                        <h2 class="text-4xl font-bold"><span class="">{{statistics.total_stores}}</span></h2>
                    </div>
                    <p class="mt-2 font-sans text-base font-medium text-gray-500">{{ $t('Stores') }}</p>
                </div>
            </router-link>

        </div>
        </div>


</template> 

<script>
import axiosClient from '@/axios';

    export default {
    data() {
    return {
        statistics: [],
    };
    },
    methods: {
    async fetchStatistics() {
        try {
        const response = await axiosClient.get('api/admin/statistics');
        this.statistics = response.data.data
        console.log(this.statistics)
        } catch (error) {
        console.error(error);
        }
    },
    },
    mounted() {
        this.fetchStatistics();
    },
    }

</script>

<style lang="scss" scoped>

</style>