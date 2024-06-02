<template>
    <sidbar/>
    
    <div class="bg-gray-100  sm:ml-64 h-screen">
        <navbar/>
      <div class="m-3">

        <router-view> </router-view>
      </div>
    </div>
    
</template>

<script>
import Sidbar from '@/components/admin/Sidbar.vue'
import Navbar from '@/components/admin/navbar.vue'
    export default {
    components: { Sidbar, Navbar },
        
    }
</script>

<style lang="scss" scoped>

</style>