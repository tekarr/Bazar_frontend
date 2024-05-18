<template>

    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
    </button>


    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    
        <div class="h-full px-3 py-4 overflow-y-auto  bg-gray-50 ">
            <router-link to="/" class="flex items-center  mb-5 ">
                <img src="../../assets/icons/logo.png" class="h-14  pl-6 " alt="Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap">Bazar</span>
            </router-link>
            <hr class="pb-4">
        <ul class="space-y-4 font-medium">
            <li>
                <router-link to="/admin/dashboard" :class="sidebarLinkClass('/admin/dashboard')" class="flex items-center p-4 text-gray-900 rounded-lg   hover:bg-pink-600 group">
                <svg  class="w-5 h-5 hover:text-gray-100 transition duration-75 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <span class="ms-3">Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/admin/notification" :class="sidebarLinkClass('/admin/notification')" class="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-pink-600">
                <svg class="flex-shrink-0 w-5 h-5 hover:text-gray-100 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap ">Notifications</span>
                <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-gray-100 bg-pink-300 rounded-full">3</span>
            </router-link>
            </li>
            <li>
                <router-link to="/admin/users" :class="sidebarLinkClass('/admin/users')" class="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-pink-600  group">
                <svg class="flex-shrink-0 w-5 h-5 hover:text-gray-100 transition duration-75  group-hover:text-gray-100 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                </router-link>
            </li>
            <li>
                <router-link to="/admin/stores" :class="sidebarLinkClass('/admin/stores')"  class="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-pink-600 dark:hover:bg-gray-700 group">
                    <svg class="flex-shrink-0 w-6 h-6 hover:text-gray-100 transition duration-75  group-hover:text-gray-100 " aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M231.98987,95.79919c-.00293-.11914-.00971-.23779-.01807-.35705-.01269-.1836-.03168-.36475-.05658-.5448-.0144-.10315-.02868-.20581-.04712-.30872-.03772-.21142-.08545-.41894-.13946-.62426-.01416-.05372-.02094-.10853-.03626-.16211L217.35059,43.604A16.06985,16.06985,0,0,0,201.96582,32H54.03418A16.06971,16.06971,0,0,0,38.64941,43.60449L24.30762,93.80225c-.01532.05358-.0221.10839-.03626.16211-.054.20532-.10174.41284-.13946.62426-.01844.10291-.03272.20557-.04712.30872-.0249.18-.04389.3612-.05658.5448-.00836.11926-.01514.23791-.01807.35705C24.00848,95.86658,24,95.93213,24,96v16a39.96225,39.96225,0,0,0,16,31.978V208a16.01833,16.01833,0,0,0,16,16H200a16.01833,16.01833,0,0,0,16-16V143.978A39.96225,39.96225,0,0,0,232,112V96C232,95.93213,231.99152,95.86658,231.98987,95.79919ZM54.03027,48H201.96582l11.42871,40H42.60547ZM104,104h48v8a24,24,0,0,1-48,0Zm-16,0v8a23.98436,23.98436,0,0,1-35.12427,21.256,7.98348,7.98348,0,0,0-1.813-1.05774A23.99615,23.99615,0,0,1,40,112v-8ZM200,208H56V151.19507a39.99151,39.99151,0,0,0,40-15.223,39.95817,39.95817,0,0,0,64,0,39.99151,39.99151,0,0,0,40,15.223Zm4.932-75.79834a7.97833,7.97833,0,0,0-1.80152,1.05115A23.9845,23.9845,0,0,1,168,112v-8h48v8A23.99617,23.99617,0,0,1,204.932,132.20166Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Stores</span>
                </router-link>
            </li>
            <li>
                <router-link to="/admin/orders" :class="sidebarLinkClass('/admin/orders')"  class="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-pink-600 dark:hover:bg-gray-700 group">
                    <svg class="flex-shrink-0 w-7 h-7 hover:text-gray-100 transition duration-75  group-hover:text-gray-100 " enable-background="new 0 0 100 100" height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g>
                        <path d="m78.8 62.1-3.6-1.7c-.5-.3-1.2-.3-1.7 0l-21.5 10.2c-1.2.6-2.7.6-3.9 0l-21.6-10.2c-.5-.3-1.2-.3-1.7 0l-3.6 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.7z"/><path d="m78.8 48.1-3.7-1.7c-.5-.3-1.2-.3-1.7 0l-21.4 10.2c-1.2.6-2.7.6-3.9 0l-21.5-10.2c-.5-.3-1.2-.3-1.7 0l-3.7 1.7c-1.6.8-1.6 2.9 0 3.7l26.8 12.8c1.2.6 2.7.6 3.9 0l26.8-12.7c1.7-.8 1.7-3 .1-3.8z"/><path d="m21.2 37.8 26.8 12.7c1.2.6 2.7.6 3.9 0l26.8-12.7c1.6-.8 1.6-2.9 0-3.7l-26.8-12.7c-1.2-.6-2.7-.6-3.9 0l-26.8 12.8c-1.6.7-1.6 2.9 0 3.6z"/></g>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Orders</span>
                </router-link>
            </li>
            <li>
                <router-link to="/admin/profile" :class="sidebarLinkClass('/admin/profile')"  class="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-pink-600 dark:hover:bg-gray-700 group">
                    <svg class="flex-shrink-0 w-7 h-7 hover:text-gray-100 transition duration-75  group-hover:text-gray-100 " height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g>
                        <path d="m22 12c0-5.51-4.49-10-10-10s-10 4.49-10 10c0 2.9 1.25 5.51 3.23 7.34 0 .01 0 .01-.01.02.1.1.22.18.32.27.06.05.11.1.17.14.18.15.38.29.57.43.07.05.13.09.2.14.19.13.39.25.6.36.07.04.15.09.22.13.2.11.41.21.63.3.08.04.16.08.24.11.22.09.44.17.66.24.08.03.16.06.24.08.24.07.48.13.72.19.07.02.14.04.22.05.28.06.56.1.85.13.04 0 .08.01.12.02.34.03.68.05 1.02.05s.68-.02 1.01-.05c.04 0 .08-.01.12-.02.29-.03.57-.07.85-.13.07-.01.14-.04.22-.05.24-.06.49-.11.72-.19.08-.03.16-.06.24-.08.22-.08.45-.15.66-.24.08-.03.16-.07.24-.11.21-.09.42-.19.63-.3.08-.04.15-.09.22-.13.2-.12.4-.23.6-.36.07-.04.13-.09.2-.14.2-.14.39-.28.57-.43.06-.05.11-.1.17-.14.11-.09.22-.18.32-.27 0-.01 0-.01-.01-.02 1.99-1.83 3.24-4.44 3.24-7.34zm-5.06 4.97c-2.71-1.82-7.15-1.82-9.88 0-.44.29-.8.63-1.1 1-1.52-1.54-2.46-3.65-2.46-5.97 0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5c0 2.32-.94 4.43-2.46 5.97-.29-.37-.66-.71-1.1-1z"/><path d="m12 6.92969c-2.07 0-3.75 1.68-3.75 3.75001 0 2.03 1.59 3.68 3.7 3.74h.09.07.02c2.02-.07 3.61-1.71 3.62-3.74 0-2.07001-1.68-3.75001-3.75-3.75001z"/></g>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
                </router-link>
            </li>
            <li>
                <router-link to="/" :class="sidebarLinkClass('/')"  class="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-pink-600 group">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 20H6a2 2 0 01-2-2V6a2 2 0 012-2h5M20 12l-4-4m4 4l-4 4m4-4H10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">logout</span>
                </router-link>
            </li>
        </ul>
        </div>
    </aside>

</template>

<script>
    export default {
    data() {
    return {
    isActive: false,
    hover: true,
    };
    },
    methods: {
        sidebarLinkClass(routePath) {
        return {
        'bg-pink-600': this.$route.path === routePath,
        'text-white': this.$route.path === routePath,
        'group-hover:text-white': this.$route.path === routePath,
        'text-gray-600': this.$route.path !== routePath,
        'hover:bg-pink-600': this.$route.path !== routePath,
        'hover:text-white': this.$route.path !== routePath,
        'px-4 py-4': true,
        'block': true,
        };
    },
    },
    }
</script>

<style lang="scss" scoped>

</style>