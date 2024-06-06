<template>
    <sidbar/>
    
    <div class="sm:ml-64"> 
        <navbar/>  

        <div class="m-3 bg-gray-100 w-full h-full rounded-3xl ">
            <router-view class="p-4"> </router-view>
        </div>
    </div>
    
</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
        
    }
</script>

<script setup>
import { computed, onMounted } from 'vue';
import { ref } from 'vue'
import {mapActions, useStore} from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();

onMounted( async() => {

//console.log(store.getters["auth/user"]);
//console.log(store.state.auth.user);
store.dispatch('auth/checkAuth')
const userRole = store.state.auth.user.role_id;
console.log(userRole);
});
</script>

<style lang="scss" scoped>

</style>