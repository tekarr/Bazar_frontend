<template>

    <div class="p-10 flex justify-between">
        
        <div class="grid gap-5" v-for="card in cards" :key="card.id">
            <div>
                <img class="h-auto w-4/6 ml-16 rounded-3xl " :src="selectedImage"  alt="">
            </div>
            <div class="grid grid-cols-6 gap-3 rounded-3xl">
                <div v-for="pr in prs" :key="pr.id">
                    <img class="h-auto rounded-3xl border-4 hover:border-pink-600 hover:cursor-pointer transition-all" :src="pr.image" alt="" @click="switchimg(pr.image)" >
                </div>
            </div>
        </div>

    
        <div class=" w-1/2 " v-for="card in cards" :key="card.id">
            <div class="p-10 md:pr-10">
                <p class="text-lg md:text-3xl font-extrabold pb-1 text-start">{{ id }}</p>
                <p class="text-lg md:text-base text-start  font-bold opacity-30 mb-1 md:pb-0">{{ card.store }}</p>
                <div class="text-lg md:text-2xl font-bold p-3 text-start">{{ card.price }}$</div>
                <p class="pb-1 text-base md:text-start w-80">{{ card.description }}</p>
                <div class="flex flex-col md:flex-row justify-between items-center p-10">
                    <router-link to="/" class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 "> Add to Cart</router-link>
                    <router-link to="/" class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 "> Buy </router-link>
                </div>
            </div>
        </div> 

    </div>
</template>

<script>
    export default {
        data(){
            return{
            id : this.$route.params.id ,
            selectedImage: '',

            cards: [
            {
                id: 1,
                image: 'https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg',
                title: 'Weed',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, beatae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, alias.',
                price: '95',
                store: 'Store-name' 
            },
            ],
            prs:[
            {
                id:1,
                image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
            },
            {
                id:2,
                image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
            },    
            {
                id:3,
                image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
            },
            {
                id:4,
                image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
            },
            {
                id:5,
                image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
            }
        ]
        };
        },
        methods:{
            switchimg(image) {
            this.selectedImage = image;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>