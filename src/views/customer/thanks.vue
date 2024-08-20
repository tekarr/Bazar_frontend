<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center">
            <p class="text-5xl mb-4">{{ $t('thanks') }}</p>
            <p>{{ $t('for purchasing from us u can find ur placed') }}</p>
            <p class="text-base"><router-link to="/customer/orders" class="text-pink-600 cursor-pointer">orders</router-link> in menu </p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>