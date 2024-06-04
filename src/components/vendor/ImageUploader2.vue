<template>
    
    <div class="flex flex-col items-center justify-center   p-4 rounded-3xl mb-4">
        <hr>

        <!-- Preview images -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 p-2">
        <div v-for="(image, index) in images" :key="index" class="relative">
            <img :src="image.url" :alt="'Image ' + index" class="w-full h-auto rounded-xl shadow-md" />
            <button 
            @click="removeImage(index)" 
            class="absolute top-1 right-1 bg-pink-600 text-white rounded-full w-6 h-6 hover:bg-pink-700 focus:outline-none">
            &times;
            </button>
        </div>
        </div>
    </div>

    <!-- File input -->
    <div class="mb-8 mt-8 ">
        <label class="mb-4 p-2 bg-pink-600 text-white rounded-3xl px-4 shadow-md hover:bg-pink-700 cursor-pointer">
        Choose Images
        <input type="file" multiple @change="onFileChange" class="hidden" />
        </label>
    </div>

</template>

<script>
export default {
data() {
    return {
    images: [],
    };
},
methods: {
    onFileChange(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
        this.images.push({ url: e.target.result });
        };
        reader.readAsDataURL(file);
    }
    },
    removeImage(index) {
    this.images.splice(index, 1);
    },
},
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>