<template>
    
    <!-- navbar -->
    <div class="flex justify-between p-4 m-4 rounded-2xl">
        <p class="p-2 font-semibold text-lg ">{{ $t($route.name) }}</p>
        <div class="flex justify-between">
            
        </div>
    </div>

</template>

<script>
import axiosClient from '@/axios';

    export default {
        data() {
    return {
        selectedMenu: null,
        notifiMenu: false,
        profilMenu: false,
        user:[],
    };
    },
    async created() {
        try {
            const response = await axiosClient.get('api/user');
            this.user = response.data;
            console.log(this.user.name);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
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

<script setup>

import { useStore } from 'vuex';
const store = useStore();

const logout = async () => {
    await store.dispatch('auth/logout');
};

</script>

<style  scoped>

</style>