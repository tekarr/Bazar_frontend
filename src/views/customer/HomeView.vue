<template>
  <div>
    <navbarr/>
    <banner/>
    <cards/>
    <pages/>
    <footer-2/>
  </div>
</template>

<script>

import Banner from '/src/components/customer/banner.vue'
import Navbarr from '/src/components/customer/Navbarr.vue'
import Cards from '/src/components/customer/cards.vue'
import Pages from '/src/components/customer/pages.vue'
import footer2 from '/src/components/customer/footer2.vue'

export default {
  components: {  
    Banner,
    Navbarr,
    Cards,
    Pages,
    footer2,
    }}

</script>

<style lang="scss" scoped>

</style>