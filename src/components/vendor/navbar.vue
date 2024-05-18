<template>
    
    <!-- navbar -->
    <div class="flex justify-between p-4 m-4 rounded-2xl">
        <p class="p-2 font-semibold text-lg ">{{ $route.name }}</p>
        <div class="flex justify-between">
                <!-- notification -->
                <div class="pr-1">
                    <button @click="nMenu" :class="nborderColor"  class="p-2 mt-0.5 border-2 hover:border-pink-600 text-white rounded-full "><img src="../../assets/icons/bell.png" class="w-4 h-4" alt="notifi"></button>
                    <div v-if="notifiMenu" class="bg-white mt-2 p-8 rounded-3xl shadow-md absolute top-20 right-5 z-10 " >
                        <h3 class="text-lg font-bold mb-2">Notifications</h3>
                        <ul>
                        <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
                        </ul>
                        <div class="pt-2"><router-link to="/admin/notification" class="text-pink-600">Show all</router-link></div>
                    </div>
                </div>
                <!-- profile -->
                <div>
                    <button @click="pMenu" :class="pborderColor"  class="p-2 border-2 hover:border-pink-600 text-white rounded-full w-10"><img src="../../assets/icons/profile-circle-new.png" class="w-6" alt="notifi"></button>
                    <div v-if="profilMenu" class="bg-white mt-2 p-8 rounded-3xl shadow-md absolute top-20 right-5 z-10 " >
                        <h3 class="text-lg font-bold mb-2">username</h3>
                        <div><router-link to="/admin/profile" class="hover:text-pink-600">Edit profile</router-link></div>
                        <div class="pt-2"><router-link to="/" class=" text-pink-600 cursor-pointer">logout</router-link></div>
                    </div>
                </div>
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
        messages: [
        { id: 1, text: 'Message 1' },
        { id: 2, text: 'Message 2' },
        { id: 3, text: 'Message 3' },
        ],
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

<style lang="scss" scoped>

</style>