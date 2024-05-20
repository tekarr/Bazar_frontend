<template>

    <div>
        <!-- store -->
        <div class="flex justify-center">
            <div class="mx-8 my-1  w-full flex justify-center h-80 bg-gray-100 rounded-3xl"></div>
        </div>
        <div class="ml-12 m-4"><span class="text-2xl font-bold">Storename</span></div>
        <div class="ml-12 m-4 flex justify-between w-60 mb-8 ">
            <span>Open: 2am</span>
            <span>Close: 4pm </span>
            <span class=" bg-gray-200 cursor-pointer rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Edit</span>
        </div>

        <!-- Add Product -->
        <div class="ml-8 bg-gray-100  grid grid-cols-6 gap-1 justify-between ">
            <div class="h-40 w-40 bg-gray-200 rounded-3xl cursor-pointer flex justify-center items-center text-3xl text-bold text-gray-500">+</div>
            <div class="h-40 w-40 bg-gray-200 rounded-3xl cursor-pointer flex justify-center items-center text-3xl text-bold text-gray-500">+</div>
        </div>
    </div>

</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>