<template>
  <div>
    <banner/>
    <tabs-2/>
    <deals/>
    <navbarr/>
    <pages/>
    <footer-2/>
  </div>
</template>

<script>

import Banner from '/src/components/customer/banner.vue'
import Navbarr from '/src/components/customer/Navbarr.vue'
import Tabs2 from '/src/components/customer/tabs2.vue'
import Cards from '/src/components/customer/cards.vue'
import Pages from '/src/components/customer/pages.vue'
import footer2 from '/src/components/customer/footer2.vue'
import Deals from '/src/components/customer/deals.vue'

export default {
  components: {  
    Banner,
    Navbarr,
    Tabs2,
    Cards,
    Pages,
    footer2,
    Deals,
    }}

</script>

<style lang="scss" scoped>

</style>