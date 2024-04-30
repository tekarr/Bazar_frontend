<template>
  <div>
    <navbarr/>
    <banner/>
    <tabs-2/>
    <cards/>
    <pages/>
    <footer-2/>
  </div>
</template>

<script>
import Banner from '@/components/banner.vue'
import Navbarr from '@/components/Navbarr.vue'
import Tabs2 from '@/components/tabs2.vue'
import Cards from '@/components/cards.vue'
import Pages from '@/components/pages.vue'
import footer2 from '@/components/footer2.vue'
  
export default {
  components: {  
    Banner,
    Navbarr,
    Tabs2,
    Cards,
    Pages,
    footer2},
    
    }
</script>

<style lang="scss" scoped>

</style>