<template>
    <sidbar/>
    
    <div :class="locale === 'en' ? 'sm:ml-64' : 'sm:mr-64'">
        <navbar/>
      <div class="m-3 bg-gray-100 w-full h-full rounded-3xl ">
        <router-view class="p-4"> </router-view>
      </div>
    </div>
    
</template>

<script>
import Sidbar from '@/components/admin/Sidbar.vue'
import Navbar from '@/components/admin/navbar.vue'
export default {
    components: { Sidbar, Navbar },
    data() {
    return {
        locale: localStorage.getItem('locale') || 'en', 
    };
    },

    mounted() {
        this.changeLocale();
        this.$store.dispatch('admin/refreshAll');

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
    }
    }
</script>

<style lang="scss" scoped>

</style>