<template>
    
    <!-- navbar -->
    <div class="flex justify-between p-5  bg-white">
        <p class="p-2 font-semibold text-lg ">{{ $t($route.name) }}</p>
<!--      //m refresh button -->



      <div class="flex justify-between">
        <button @click="refreshAll" class="flex items-center justify-center p-2 bg-pink-600 rounded-full hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
          <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
          </svg>
        </button>
        </div>
    </div>

</template>

<script>
    import {mapActions} from "vuex";

    export default {
        data() {
    return {
        notifiMenu: false,
        profilMenu: false,
        nborderColor: '',
        pborderColor: '',
    };
    },

    methods: {

      async refreshAll() {
        try {
       await   this.$store.dispatch('admin/refreshAll')
          console.log('All states refreshed');
        } catch (error) {
          console.error('Error refreshing states:', error);
        }
      },


      nMenu() {
        this.notifiMenu = !this.notifiMenu;

        if(this.profilMenu == true)
        {
            this.profilMenu = false
            this.pborderColor = ''
        }

        if (this.nborderColor == '')
        {this.nborderColor = ' border-pink-600';}
        else {this.nborderColor = ''}
    },
        pMenu() {
        this.profilMenu = !this.profilMenu;

        if(this.notifiMenu == true)
        {
            this.notifiMenu = false
            this.nborderColor = ''
        }

        if (this.pborderColor == '')
        {this.pborderColor = ' border-pink-600';}
        else {this.pborderColor = ''}
    },
    },
    }
</script>

<script setup>

import { useStore } from 'vuex';
const store = useStore();

const logout = async () => {
    await store.dispatch('auth/logout');
};

</script>

<style lang="scss" scoped>

</style>