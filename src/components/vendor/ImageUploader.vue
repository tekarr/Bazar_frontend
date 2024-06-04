<template>
    
    <!-- image preview -->
    <div v-if="imageUrl" class="my-8 flex justify-center pt-8">
        <img :src="imageUrl" alt="Selected Image" class="w-full rounded-3xl hover:shadow-md" />
    </div>

    <hr class="mb-8">

    <!-- Choose image button -->
    <div class=" h-20 ">    
        <label class="mb-4 p-2 px-4 bg-pink-600 text-white rounded-3xl shadow-md hover:bg-gray-800 cursor-pointer">
            Choose image
            <input type="file" @change="onFileChange" class="hidden" />
        </label>
    </div>
    <div class="mb-4 opacity-80">Prefered image size <span class="text-pink-500">100x50</span></div>

</template>

<script>
export default {
    data() {
    return {
        imageUrl: null,
    };
    },
    methods: {
    onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
        }
    },
    },
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>