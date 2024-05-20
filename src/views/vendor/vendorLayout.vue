<template>
    <sidbar/>
    
    <div class="p-4 sm:ml-64"> 
        <navbar/>  
        <router-view></router-view>
    </div>
    
</template>

<script>
import Sidbar from '@/components/vendor/Sidbar.vue'
import Navbar from '@/components/vendor/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
        
    }
</script>

<style lang="scss" scoped>

</style>