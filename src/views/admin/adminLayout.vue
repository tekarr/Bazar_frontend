<template>
    <sidbar/>
    
    <div class="sm:ml-64 ">
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
        
    }
</script>

<style lang="scss" scoped>

</style>