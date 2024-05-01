<template>
    <div class="flex justify-center items-center ">
        <p class="text-3xl p-40">product {{ id }} detail page</p>
    </div>

</template>

<script>
    export default {
        data(){
        return{
            id : this.$route.params.id
        }
    }
    }
</script>

<style lang="scss" scoped>

</style>