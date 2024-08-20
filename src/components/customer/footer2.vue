<template>

    <footer class="bg-white rounded-lg   m-4 ">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="../../assets/icons/BAZAR (2).png" class="h-12" alt="Logo" />
                    <router-link to="/" class="self-center text-xl font-semibold whitespace-nowrap ">{{ $t('Bazar') }}</router-link>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                    <li>
                        <router-link to="/about" class="hover:underline me-4 md:me-6">{{ $t('about') }}</router-link>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">{{ $t('Privacy Policy') }}</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">{{ $t('Licensing') }}</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center ">© 2024 <router-link to="/" class="hover:underline">{{ $t('Bazar') }}</router-link>{{ $t('. All Rights Reserved.') }}</span>   
        </div>      
    </footer>

</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>