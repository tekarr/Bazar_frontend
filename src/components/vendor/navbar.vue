<template>
    
    <!-- navbar -->
    <div class="flex justify-between p-2 m-4 rounded-2xl">
        <p class="p-2 font-semibold text-lg ">{{ $t($route.name) }}</p>
        <div class="flex justify-between">

          <div class="flex justify-between">
            <button @click="refreshAll" class="flex items-center justify-center p-2 bg-pink-600 rounded-full hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
              </svg>
            </button>
          </div>
        </div>
    </div>

</template>

<script>
import axiosClient from '@/axios';
import {mapState} from "vuex";

    export default {
        data() {
    return {
        selectedMenu: null,
        notifiMenu: false,
        profilMenu: false,
        // user:[],
    };
    },

   computed: {
     ...mapState('auth', ['user']),
    },
/*
    async created() {
        try {
            const response = await axiosClient.get('api/user');
            this.user = response.data;
            console.log(this.user.name);
        } catch (error) {
            console.error(error);
        }
    },
*/
    methods: {
      async refreshAll() {
        try {
          await   this.$store.dispatch('vendor/refreshAll')
          console.log('All states refreshed');
        } catch (error) {
          console.error('Error refreshing states:', error);
        }
      },
        nMenu() {
            this.notifiMenu = !this.notifiMenu;
            this.profilMenu = false;
        },
        pMenu() {
            this.profilMenu = !this.profilMenu;
            this.notifiMenu = false;
        },
    },
}
</script>


<style  scoped>

</style>