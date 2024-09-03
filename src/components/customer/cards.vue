<template>

    <div>
        <deals/>

        <!-- categories -->
        <!-- <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button ref="focusButton" @click="allCategories" class="focus:text-pink-600  border focus:border-pink-600  hover:border-pink-500 bg-white focus:ring-2 focus:outline-none focus:ring-white rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3" >All categories</button>
        <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" type="button" class="focus:text-pink-600  border focus:border-pink-600  hover:border-pink-500 bg-white focus:ring-2 focus:outline-none focus:ring-white rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">
            {{ category.name }}
        </button>
        </div> -->
        
        <!-- Alert: Success -->
        <div v-if="success" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-3xl">
            <p class="text-lg"> added successfully!</p>
            <button @click="close" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
            </div>
        </div>

        <!-- Alert: error -->
        <div v-if="error" class="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-3xl">
            <p class="text-lg"> already in your cart</p>
            <button @click="close" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl">Close</button>
            </div>
        </div>


        <div class="flex justify-center py-4 z-10 my-4">
            <!-- stores or products -->
            <div  class="relative inline-block z-10 mx-4">
                <button @click="showOptions = !showOptions" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {{ selectedOption }}
                    <svg class="mx-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <ul v-if="showOptions" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <li @click="selectOption('Stores')" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                    Stores
                    </li>
                    <li @click="selectOption('Products')" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                    Products
                    </li>
                </ul>
            </div>
            <!-- categories -->    
            <div class="relative inline-block z-10 ">
                <button @click="showCategories = !showCategories" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {{ selectedCategory ? selectedCategory.name : 'All Categories' }}
                <svg class=" mx-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                </button>
                <!-- <div v-if=" selectedCategory">{{ selectedCategory.name }}</div> -->
                <ul v-if="showCategories" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <li @click="allCategories" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                        All Categories
                    </li>
                    <li v-for="category in categories" :key="category.id" @click="selectCategory2(category)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                        {{ category.name }}
                    </li>
                </ul>
            </div>

            <!-- attributes -->
            <div v-if="selectedOption === 'Products'" class="flex justify-center">
            <div v-for="(attribute, index) in filteredAttributes" :key="index" class="mr-4 mb-4">
                <select  @change="updateFilter(attribute.name, $event.target.value)" class="block w-full pl-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="">{{ attribute.name }}</option>
                <option v-for="(value, index) in attribute.values" :key="index" :value="value" >
                {{ value }}
                </option>
                </select>
            </div>
            </div>

        </div>

        <!-- search bar -->
        <div class="max-w-md mx-auto flex justify-center rounded-3xl " @click="scrollToSpecificPosition">    
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative mb-2">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" >
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" v-model="searchvalue" id="default-search" class="block  p-3 w-96  ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-3xl bg-gray-50 focus:outline-none focus:ring focus:ring-pink-500 " placeholder="Search Stores, Products..." required @input="search"/>
            </div>
        </div> 

        
        
        <!-- Filter options -->
        <!-- <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-1/4 xl:w-1/5 p-4 lg:p-6 shadow-md bg-white rounded-xl">
            <h2 class="text-lg font-bold mb-4">Filters</h2>
            <div v-for="attribute in attributes" :key="attribute.name" class="mb-4">
            <div class="bg-white shadow-md rounded-3xl p-4">
                <h3 class="text-sm font-bold mb-2">{{ attribute.name }}</h3>
                <div v-for="value in attribute.values" :key="value" class="flex items-center mb-2">
                <input type="radio" :id="`${attribute.name}-${value}`" :name="attribute.name" :value="value" @input="updateFilter(attribute.name, value)" class="mx-2">
                <label :for="`${attribute.name}-${value}`" class="text-sm">{{ value }}</label>
                </div>
            </div>
            </div>
            <button @click="resetFilters" class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full">Reset Filters</button>
        </div> -->
        <!-- Products list will go here -->
        <!-- <div class="w-full lg:w-3/4 xl:w-4/5 p-4 lg:p-6"> -->
        <!-- Stores -->
        
        <div v-if="selectedOption === 'Stores'" ref="specificSection" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-10 p-4 md:p-8" :key="activePage"> 
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

        <!-- products -->
        <div v-if="selectedOption === 'Products'" ref="specificSection" class="grid grid-cols-4 md:grid-cols-1 lg:grid-cols-4 gap-10 p-4 md:p-8" :key="activePage"> 
            <router-link :to="{ name: 'productpage', params: { id: product.id } }" class="bg-gray-100 rounded-3xl cursor-pointer hover:shadow-lg transition-all" v-for="product in products" :key="product.id">
                <img  class="h-auto w-full rounded-t-3xl md:rounded-3xl" :src="product.image" alt="">
                <div class="p-4 md:pl-10">
                    <p class="text-lg md:text-xl font-normal pt-4 md:text-start text-center">{{ product.name }}</p>
                    <p class="pb-1 text-sm md:text-start">{{ product.desc }}</p>
                    <div class="flex flex-col md:flex-row justify-between items-center">
                    <span class="text-lg md:text-2xl font-bold pb-3 md:pb-0">{{ product.price }}$</span>
                    <span class="text-lg md:text-2xl font-bold opacity-30 pb-3 md:pb-0">{{ product.store }}</span>
                    <button class="text-pink-600 hover:text-white border border-pink-600 bg-white hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 rounded-full text-xs font-medium px-5 py-2.5 text-center me-3 mb-3 " 
                    @click.prevent="addToCart(product)">Add to Cart
                    </button>
                    </div>
                </div>
            </router-link>
        </div>
        
        <!-- </div> -->
        <!-- </div> -->

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
    products:[],
    showCategories: false,
    selectedCategory: null,
    selectedCategoryId: null,
    showOptions: false,
    selectedOption: 'Stores',
    activePage: 1,
    searchvalue:'',
    filters: {},
    success: false,
    error: false,
    attributes: [
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
        values: [  "L", "M", "S", "XL"]
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
    this.fetchProducts();
    // this.$refs.focusButton.focus();
},
computed: {
    filteredAttributes() {
        if (this.selectedCategory && this.selectedCategory.name == 'Electronics') {
            return this.attributes.filter(attribute => ['Color', 'Material', 'Storage' , 'Warranty'].includes(attribute.name));
            }
            if (this.selectedCategory && ['Men', 'Women', 'Kids' , "Men's Clothing"].includes(this.selectedCategory.name)) {
                return this.attributes.filter(attribute => ['Color', 'Material', 'Size' ].includes(attribute.name));
            }
            if (this.selectedCategory && ['beauty'].includes(this.selectedCategory.name)) {
                return this.attributes.filter(attribute => ['Color', 'Material', 'Type' ].includes(attribute.name));
            }
            if (this.selectedCategory && ['groceries'].includes(this.selectedCategory.name)) {
                return this.attributes.filter(attribute => ['Color', 'Material', 'Packaging' ].includes(attribute.name));
            }
            if (this.selectedCategory && ['furniture'].includes(this.selectedCategory.name)) {
                return this.attributes.filter(attribute => ['Color', 'Material', 'Weight' ].includes(attribute.name));
            }
            if (this.selectedCategory && ['jewelery'].includes(this.selectedCategory.name)) {
                return this.attributes.filter(attribute => ['Color', 'Material', 'Type' ].includes(attribute.name));
            }
            return this.attributes.filter(attribute => ['Color', 'Material'].includes(attribute.name));
        }
    },
methods: {
    selectOption(option) {
        this.selectedOption = option;
        this.showOptions = false;
        this.allCategories();
        this.resetFilters();
    },
    addToCart(product) {
            // Store product ID in localStorage
            let cartItem = localStorage.getItem('cart');
            let cart = [];
            if (cartItem) {
                try {
                    cart = JSON.parse(cartItem)|| [];
                } catch (error) {
                    console.error('Error parsing cart data from localStorage:', error);
                    cart = [];
                }
            }

            const selectedItem = {
                id: product.id,
            };

            const existingItem = cart.find((item) => {
                return (
                item.id === product.id )
            });
                if (!existingItem) {
                cart.push(selectedItem);
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(cart);
                this.success = true;
            } else {
                this.error = true;
            }
        },
    close(){
    this.success = false;
    this.error = false;
    },
    resetFilters() {
    this.filters = {}; // Reset the filters object
    this.queryString = ''; // Reset the query string
    },
    
    search() {
    if (this.searchvalue) {
        this.searchQuery = this.searchvalue;
        this.fetchStores();
        }
    },
    async fetchStores() {
        try {
            const response = await axiosClient.get(`api/${this.selectedOption.toLowerCase()}?search=${this.searchQuery}`);
            if (this.selectedOption === 'Stores') {
            this.stores = response.data.data;
            } else if (this.selectedOption === 'Products') {
            this.products = response.data.data;
            }
        } catch (error) {
            console.error(`There was an error fetching the stores: ${error}`);
        }
    },
    async fetchProducts() {
        try {
            const response = await axiosClient.get('api/products');
            console.log(response.data.data)
            this.products = response.data.data;
        } catch (error) {
            console.error(error);
        }
    },
    async updateFilter(attributeName, value) {
    try {
        if (value === '') { // default option selected, remove filter value
        delete this.filters[attributeName];
        } else {
        this.filters = { ...this.filters, [attributeName]: value };
        }
        const queryString = Object.keys(this.filters).map(key => `variations[${key}]=${this.filters[key]}`).join('&');
        console.log(queryString);
        if (this.selectedCategory) { // Call fetchProductsByCategory if a category is selected
        await this.fetchProductsByCategory(this.selectedCategory.id);
        } else {
        const response = await axiosClient.get(`api/products?${queryString}`);
        this.products = response.data.data;
        }
    } catch (error) {
        console.error(`There was an error fetching the products: ${error}`);
    }
    },
        changePage(page) {
        this.activePage = page;
        this.allCategories();
        window.scrollTo({ top: 400 });
    },
    async allCategories() {
        this.selectedCategory = null;
        this.showCategories = false;
        if (this.selectedOption === 'Stores') {
        try {
            const response = await axiosClient.get(`api/stores?page=${this.activePage}`);
            this.stores = response.data.data;
            console.log(this.stores)
        } catch (error) {
            console.error(`There was an error fetching all stores: ${error}`);
        }
        }else {
            try {
            const response = await axiosClient.get(`api/products?page=${this.activePage}`);
            this.products = response.data.data;
            console.log(this.products)
            } catch (error) {
                console.error(`There was an error fetching all products: ${error}`);
            } 
        }
    },
    selectCategory2(category) {
    this.selectedCategory = category;
    this.showCategories = false;
    this.selectCategory(category.id);
    console.log(this.selectedCategory.name)
    this.fetchProductsByCategory(category.id);

    },
    async fetchProductsByCategory(categoryId) {
    try {
        let queryParams = `category_id=${categoryId}`;
        for (const attributeName in this.filters) {
        queryParams += `&variations[${attributeName}]=${this.filters[attributeName]}`;
        }
        const response = await axiosClient.get(`api/products?${queryParams}`);
        this.products = response.data.data;
        console.log(this.products)
    } catch (error) {
        console.error(`There was an error fetching products for category ${categoryId}: ${error}`);
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
        const targetPosition = 400; // Desired scroll position in pixels from the top
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