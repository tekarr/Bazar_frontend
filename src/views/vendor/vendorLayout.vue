<template >
    <sidbar />
    
    <div :class="locale === 'en' ? 'sm:ml-64' : 'sm:mr-64'"> 
        <navbar/>  

        <div class=" bg-gray-100 w-full h-full  ">
            <router-view class="p-4"> </router-view>
        </div>
    </div>

</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
    data() {
    return {
        locale: localStorage.getItem('locale') || 'en', 
    };
    },
    mounted() {
        this.changeLocale();
        this.$store.dispatch('vendor/refreshAll')
        console.log(this.locale)
    },
    methods: {
        changeLocale() {
            this.$i18n.locale = this.locale;
            if (this.locale === 'ar') {
            document.body.setAttribute('dir', 'rtl');
            } else {
            document.body.removeAttribute('dir');
            }
        }
    },

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
const userRole = store.state.auth.user.role_id;
console.log(userRole);
});
</script>

<style lang="scss" scoped>

</style>