<template>



    <div class="relative overflow-x-auto flex justify-center bg-gray-100 pt-28">
        <table class="w-3/4 text-sm overflow-hidden  text-left rtl:text-right text-gray-500  border-8 rounded-3xl m-10  bg-white">
            <thead class="text-xs text-gray-800 rounded-3xl ">
                <tr>
                    <th scope="col" class="px-10 py-3 text-3xl p-5 font-semibold ">
                        Shopping Cart
                    </th>
                </tr>
            </thead>
            <transition-group name="list" tag="tbody">
            <!-- products -->
            <tbody v-for="product in products" :key="product.id" class="transition-all duration-500 ease-in-out opacity-100 translate-y-2" >
                <tr class="bg-white border-b"  >
                    <div class="flex justify-start items-center mt-8">
                        <td class="p-4 ">
                            <img :src="product.imageSrc" :alt="product.imageAlt" class="w-28 md:w-32 max-w-full max-h-full rounded-3xl" >
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-base font-medium text-gray-700 text-start ">{{ product.name }}</span><br>
                            <span class="text-gray-400 text-lg">{{ product.store }}</span>
                        </td>
                    </div>
                    <td>
                        <p class="flex justify-start p-10">{{product.quantity}} available</p>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div>
                                <input type="number" min="1" :max="product.quantity" id="first_product" class="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-base rounded-xl focus:outline-none focus:ring focus:ring-pink-500 block px-2.5 py-1"
                                v-model="qt[product.id]"  placeholder="Qt" required @input="updateTotal(product)" />
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-700 ">
                        ${{ product.price }}
                    </td>
                    <td class="px-6 py-4">
                        <button @click="removeFromCart(product.id)" class="font-medium text-base text-pink-600 focus:bg-gray-800  focus:text-white px-4 rounded-3xl no-underline">Remove</button>
                    </td>
                </tr>
            </tbody>
        </transition-group>
        </table>
    </div>
    <!-- total -->
    <div>
        <div class="text-xl text-start font-bold text-gray-900 pl-10 pb-5 pt-10 "> 
            Subtotal : <span>${{ finalTotal }}</span>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        </div>
        <div class="flex justify-start pl-10 pb-10">
            <div class="">
                <router-link to="/" class="flex items-center mr-5 rounded-3xl border-2 border-pink-300 bg-white px-10 py-3 text-base font-medium  text-gray-800 shadow-sm hover:bg-pink-600 hover:text-white">Continue Shopping</router-link>
            </div>
            <div class="">
                <router-link to="/customer/checkout" class="flex items-center mr-5 rounded-3xl border-2 border-pink-300 bg-white px-10 py-3 text-base font-medium text-gray-800 shadow-sm hover:bg-pink-600 hover:text-white">Checkout</router-link> 
            </div>
        </div>
    </div>



</template>

<script>
import axiosClient from '@/axios'

        export default {
        data(){
            return{
            total: 0,
            quantity: 0,
            products:[],
            qt: {},
            totals: {},
        }
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        updateTotal(product) {
            this.totals[product.id] = this.qt[product.id] * product.price;
            console.log(this.totals);
        },
        async fetchProducts() {
            this.products = [];
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            for (let id of cart) {
                let response = await axiosClient.get(`api/products/${id}`);
                this.products.push(response.data.product);
            }
            console.log(this.products);
        },
        removeFromCart(productId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let index = cart.indexOf(productId);
            if (index > -1) {
                cart.splice(index, 1);
                this.totals[productId] = 0;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            let productIndex = this.products.findIndex(product => product.id === productId);
            if (productIndex > -1) {
                this.products.splice(productIndex, 1);
            }
        },
    },
    computed: {
        finalTotal() {
            return Object.values(this.totals).reduce((a, b) => a + b, 0).toFixed(1);
        },
    },
}
</script>

<style scoped>
.list-enter-active, .list-leave-active {
    transition: all .5s;
}
.list-enter-from, .list-leave-to {
    opacity: 0;
    transform: translateY(2rem);
}
.list-enter-to, .list-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>