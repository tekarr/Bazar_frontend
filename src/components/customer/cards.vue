<template>

    <div>
        <deals/>

        <!-- categories -->
        <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button ref="focusButton" @click="allCategories" class="focus:text-pink-600  border focus:border-pink-600  hover:border-pink-500 bg-white focus:ring-2 focus:outline-none focus:ring-white rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3" >All categories</button>
        <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" type="button" class="focus:text-pink-600  border focus:border-pink-600  hover:border-pink-500 bg-white focus:ring-2 focus:outline-none focus:ring-white rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">
            {{ category.name }}
        </button>
        </div>

        <!-- search bar -->
        <div class="max-w-md mx-auto rounded-3xl" @click="scrollToSpecificPosition">    
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative mb-2">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" >
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" v-model="searchvalue" id="default-search" class="block w-full p-3 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-3xl bg-gray-50 focus:outline-none focus:ring focus:ring-pink-500 " placeholder="Search Stores, Products..." required @input="search"/>
            </div>
        </div> 
        
        
        <!-- Filter options -->
        <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-1/4 xl:w-1/5 p-4 lg:p-6 shadow-md bg-white rounded-xl">
            <h2 class="text-lg font-bold mb-4">Filters</h2>
            <div v-for="attribute in attributes" :key="attribute.name" class="mb-4">
            <div class="bg-white shadow-md rounded-3xl p-4">
                <h3 class="text-sm font-bold mb-2">{{ attribute.name }}</h3>
                <div v-for="value in attribute.values" :key="value" class="flex items-center mb-2">
                <input type="radio" :id="`${attribute.name}-${value}`" :name="attribute.name" :value="value" @input="updateFilter(attribute.name, value)" class="mr-2">
                <label :for="`${attribute.name}-${value}`" class="text-sm">{{ value }}</label>
                </div>
            </div>
            </div>
            <button @click="resetFilters" class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full">Reset Filters</button>
        </div>
        <!-- Products list will go here -->
        <div class="w-full lg:w-3/4 xl:w-4/5 p-4 lg:p-6">
        <!-- Stores -->
        
        <div ref="specificSection" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10 p-4 md:p-8" :key="activePage"> 
            <router-link :to="{ name: 'StorePage', params: { id: store.id } }" class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="store in stores" :key="store.id">
                    <img class="h-auto w-full rounded-t-3xl md:rounded-3xl" :src="store.image" alt="">
                    <div class="p-4 md:pl-10">
                        <p class="text-lg md:text-2xl font-bold pt-4 md:text-start text-center">{{ store.name }}</p>
                        <p class="pb-1 text-sm md:text-start">{{ store.description }}</p>
                        <div class="flex flex-col md:flex-row justify-between items-center">
                            <span class="text-lg md:text-2xl font-bold opacity-30 pb-3 md:pb-0">{{ store.category }}</span>
                        </div>
                    </div>
            </router-link>
        </div>
        
        </div>
        </div>

    </div>

    <!-- pages -->
    <div class="flex justify-center p-5">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
            <li class="me-2" v-for="page in 5" :key="page">
                <button 
                    class="inline-block px-4 py-2.5 rounded-3xl font-bold" 
                    :class="{
                        'text-white bg-pink-600 active focus:bg-pink-600 focus:text-white': page === activePage,
                        'hover:text-gray-900 hover:bg-gray-100': page !== 5,
                        'text-gray-400 cursor-not-allowed': page === 5
                    }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </button>
            </li>
        </ul>
    </div>

</template>

<script>
import axiosClient from '@/axios';
import deals from './deals.vue';

export default {
    components: { deals },
data() {
    return {
    categories: [],
    stores: [],
    selectedCategoryId: null,
    activePage: 1,
    searchvalue:'',
    filters: {},
    attributes: [
        {
        name: "Brand",
        values: ["adidas", "nike", "puma"]
        },
        {
        name: "Color",
        values: ["Beige", "Black", "Blue", "Bronze", "Brown", "Deep", "Gold", "Gray", "Green", "Ivory", "Natural", "Red", "Rose", "Silver", "White", "Yellow"]
        },
        {
        name: "Material",
        values: ["Canvas", "Cotton", "Fabric", "Glass", "Gold", "Leather", "Metal", "Plastic", "Platinum", "Polyester", "Rose Gold", "Silver", "Synthetic", "Wood", "Non-organic", "Organic"]
        },
        {
        name: "Packaging",
        values: ["Bag", "Bottle", "Box", "Can"]
        },
        {
        name: "Size",
        values: ["1kg", "2kg", "500g", "5kg", "Extra Large", "L", "Large", "M", "Medium", "S", "Small", "XL"]
        },
        {
        name: "Storage",
        values: ["128GB", "16GB", "32GB", "64GB"]
        },
        {
        name: "Style",
        values: ["Modern", "Rustic", "Traditional"]
        },
        {
        name: "Type",
        values: ["Blush", "Bracelet", "Concealer", "Earrings", "Foundation", "Mascara", "Necklace", "Ring"]
        },
        {
        name: "Warranty",
        values: ["1 year", "2 years", "3 years"]
        },
        {
        name: "Weight",
        values: ["1kg", "2kg", "3kg", "4kg", "5kg", "6kg", "7kg", "8kg", "9kg"]
        }
    ]
    }
},
async created() {
    const lang = localStorage.getItem('locale');
    try {
    const response = await axiosClient.get(`api/categories?lang=${lang}`);
    this.categories = response.data;
    } catch (error) {
    console.error(`There was an error fetching the categories: ${error}`);
    }
    this.allCategories();
    this.$refs.focusButton.focus();
},
methods: {
    search() {
    if (this.searchvalue) {
        this.searchQuery = this.searchvalue;
        this.fetchStores();
        }
    },
    async fetchStores() {
        try {
            const response = await axiosClient.get(`api/stores?search=${this.searchQuery}`);
            this.stores = response.data.data;
        } catch (error) {
            console.error(`There was an error fetching the stores: ${error}`);
        }
    },
    updateFilter(attributeName, value) {
    this.filters[attributeName] = value;
    this.filterProducts();
    },
    async filterProducts() {
    try {
        const queryParams = {};
        for (const attributeName in this.filters) {
        queryParams[`variations[${attributeName}]`] = this.filters[attributeName];
        }
        const queryString = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
        const response = await axiosClient.get(`api/products?${queryString}`);
        this.stores = response.data.data;
        console.log(this.stores)
    } catch (error) {
        console.error(`There was an error fetching the products: ${error}`);
    }
    // ...
    },
    resetFilters() {
    this.filters = {};
    // Reset radio button selections
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
        button.checked = false;
    });
    this.filterProducts();
    },
        changePage(page) {
        this.activePage = page;
        this.allCategories();
        window.scrollTo({ top: 400 });
    },
    async allCategories() {
        try {
            const response = await axiosClient.get(`api/stores?page=${this.activePage}`);
            this.stores = response.data.data;
            console.log(this.stores)
        } catch (error) {
            console.error(`There was an error fetching all stores: ${error}`);
        }
    },
    async selectCategory(id) {
    this.selectedCategoryId = id;
    try {
        const response = await axiosClient.get(`api/categories/${id}/stores`);
        this.stores = response.data.data.stores;
        console.log(this.stores)
    } catch (error) {
        console.error(`There was an error fetching the stores: ${error}`);
    }
    },
    scrollToSpecificPosition() {
        const targetPosition = 560; // Desired scroll position in pixels from the top
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth' // Smooth scroll transition
        });
    }
}
}
</script>

<style  scoped>

</style>