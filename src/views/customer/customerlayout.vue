<template>

        <div>
            <div class=""> 
                <navbarr/> 


                <div class="">
                    <router-view class=""></router-view>
                </div>
            </div>
        </div>

</template>

<script>
import Navbarr from '@/components/customer/Navbarr.vue'
    export default {
    components: { Navbarr },
    methods: {
        changeLocale(locale) {
        this.$i18n.locale = locale;
        if (locale === 'ar') {
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
