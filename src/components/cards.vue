<template>


<li class="fixed top-1 right-80 flex items-center justify-center w-auto h-28 z-50 ">
    <img class="px-3 w-14 hover:cursor-pointer" src="../assets/icons/carts/shopping-bag.png" alt="cart1" >
</li>
    
<ul class="fixed top-1 mr-10 right-96 flex items-center justify-center w-auto h-28 z-50 ">
    <li class="p-3">
    <input
    v-model="searchTerm"
    type="text"
    placeholder="Search..." 
    class="w-full bg-slate-50 px-20 py-2 rounded-3xl focus:outline-none focus:ring focus:ring-pink-500 font-bold" @click="scrollDown" />
    </li>

    <li>   
    <button
    class=" px-2 py-2 rounded-3xl  bg-pink-600 hover:bg-pink-700 text-white focus:outline-none "
    @click="clearSearch">
    <img class="w-5" src="../assets/icons/image.png" alt="Search">
    </button>
    </li> 
</ul>

<p class="text-xl"></p>

<div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10 p-4 md:p-8">
    <div class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="card in filteredItems" :key="card.id">
        <img class="h-auto w-full rounded-t-3xl md:rounded-3xl" :src="card.image" alt="">
        <div class="p-4 md:pl-10">
            <p class="text-lg md:text-2xl font-bold pt-4 md:text-start text-center">{{ card.title }}</p>
            <p class="pb-1 text-sm md:text-start">{{ card.description }}</p>
            <div class="flex flex-col md:flex-row justify-between items-center">
            <span class="text-lg md:text-2xl font-bold pb-3 md:pb-0">{{ card.price }}$</span>
            <span class="text-lg md:text-2xl font-bold opacity-30 pb-3 md:pb-0">{{ card.store }}</span>
            <router-link to="/" class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 " >Add to Cart</router-link>
            </div>
        </div>
    </div>
</div>

</template>

<script>
    export default {
        data(){
        return {   
        searchTerm:'' ,
        cards: [
        {
            id: 1,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
            title: 'Weed',
            description: 'good for ur health',
            price: '95',
            store: 'Store-name'
        },
        {
            id: 2,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
            title: 'Shoes',
            description: 'This is the description for it.',
            price: '10',
            store: 'Store-name'
        },
        {
            id: 3,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
            title: 'Sleep',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 4,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
            title: 'Plant',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 5,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
            title: 'Watch',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 6,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
            title: 'Shoes',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 7,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
            title: 'Cream',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 8,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
            title: 'Sleap',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 9,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
            title: 'Lamp',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 10,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
            title: 'Power supply',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id:11,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
            title: 'Controller',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        {
            id: 12,
            image: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
            title: 'Bag',
            description: 'This is the description for it.',
            price: '20',
            store: 'Store-name'
        },
        ]
    };
    },
    computed: {
        filteredItems() {
        return this.cards.filter(card => card.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
        },
    },
    methods:{
        clearSearch() {
        this.searchTerm = '';
        },
        scrollDown() {
        window.scrollTo({
        top: window.pageYOffset + 500,
        behavior: 'smooth'
        });
    }
    }
}
</script>

<style lang="scss" scoped>

</style>