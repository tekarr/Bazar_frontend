<template>
  <navbarr/>
  <div class=" p-52">
    <h1 class=" text-3xl">{{ $t('About us') }}</h1> <br>
    <p>{{ $t('About us2') }}<br></p>
  </div>
  <footer-2/>
</template>

<script>
import Navbarr from '/src/components/customer/Navbarr.vue'
import Footer2 from '/src/components/customer/footer2.vue'

  export default {
  components: { Navbarr, Footer2 },
    
  }
</script>

<style lang="scss" scoped>

</style>

