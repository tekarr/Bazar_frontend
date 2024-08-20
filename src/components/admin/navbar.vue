<template>
    
    <!-- navbar -->
    <div class="flex justify-between p-5  bg-white">
        <p class="p-2 font-semibold text-lg ">{{ $t($route.name) }}</p>
        <div class="flex justify-between">
        </div>
    </div>

</template>

<script>
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