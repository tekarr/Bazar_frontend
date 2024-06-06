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
        
    }
</script>

<style lang="scss" scoped>

</style>
