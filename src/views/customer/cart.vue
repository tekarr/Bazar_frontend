<template>


    <!-- cart -->
    <div v-if="$route.path === '/cart'">
        <div  class="relative overflow-x-auto flex justify-center bg-gray-100 pt-28">
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
                Subtotal : <span>${{ finalTotal() }}</span>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            </div>
            <div class="flex justify-start items-center pl-10 pb-10">
                <div class="">
                    <router-link to="/" class="flex items-center mr-5 rounded-3xl border-2 border-pink-300 bg-white px-10 py-3 text-base font-medium  text-gray-800 shadow-sm hover:bg-pink-600 hover:text-white">Continue Shopping</router-link>
                </div>
                <div class="">
                    <router-link  to="/customer/checkout" v-if="finalTotal() > 0" class="flex items-center mr-5 rounded-3xl border-2 border-pink-300 bg-white px-10 py-3 text-base font-medium text-gray-800 shadow-sm hover:bg-pink-600 hover:text-white">Checkout</router-link> 
                </div>
            </div>
        </div>
    </div>

    <!-- checkout -->
    <form v-if="$route.path === '/customer/checkout'" @submit.prevent="submitForm" class="bg-gray-100 pt-20">
        <div class="w-full max-w-3xl mx-auto lg:p-28 md:p-28 sm:p-28">
        <div class="bg-white p-4 sm:p-8 rounded-3xl shadow-md border text-start">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Checkout
            </h1>

            <!-- Shipping Address -->
            <div class="my-4">
            <label for="address" class="block text-gray-700 mb-1 pl-1">Address</label>
                <select id="address" v-model="addr" class="w-full border py-2 px-3 rounded-lg">
                    <option value="true">Add new address</option>
                </select>
            </div>

            <div v-if="addr" class="mb-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h2>

            <div class="mt-4">
                <label for="address" class="block text-gray-700 mb-1">Address</label>
                <input type="text" id="address" v-model="address" class="w-full rounded-lg border py-2 px-3 "/>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                    <label for="Phone" class="block text-gray-700 mb-1">Phone number</label>
                    <input type="text" id="Phone" v-model="Phone" class="w-full rounded-lg border py-2 px-3"/>
                </div>
                <div class="mt-4 sm:mt-0">
                    <label for="city" class="block text-gray-700 mb-1">City</label>
                    <input type="text" id="city" v-model="city" class="w-full rounded-lg border py-2 px-3"/>
                </div>
            </div>
            </div>

            <!-- Payment Information -->
            <div>
            <h2 class="text-xl font-semibold text-gray-700 mb-4"> Payment Method</h2>

            <div class="flex items-center mb-4">
                <input type="radio" name="paymentMethod" value="creditCard" v-model="PaymentMethod" class="mr-2 text-pink-600 w-5 h-5 rounded-full"/>
                <label for="creditCard" class="text-gray-700">Credit Card</label>
            </div>

            <div class="flex items-center">
                <input type="radio" name="paymentMethod" value="payOnDelivery" v-model="PaymentMethod" class="mr-2 text-pink-600 w-5 h-5 rounded-full"/>
                <label for="payOnDelivery" class="text-gray-700">Pay on Delivery</label>
            </div>

            <div v-if="PaymentMethod === 'creditCard'" class="mt-4">
                <div>
                <label for="card_number" class="block text-gray-700 mb-1">Card Number</label>
                <input
                    type="text" id="card_number" class="w-full rounded-lg border py-2 px-3"/>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                    <label for="exp_date" class="block text-gray-700 mb-1">Expiration Date</label>
                    <input type="text" id="exp_date" class="w-full rounded-lg border py-2 px-3"/>
                </div>
                <div class="mt-4 sm:mt-0">
                    <label for="cvv" class="block text-gray-700 mb-1">CVV</label>
                    <input type="text" id="cvv" class="w-full rounded-lg border py-2 px-3"/>
                </div>
                </div>
            </div>
            </div>

            <div class="mt-8 flex justify-end">
                <router-link to="/cart">
                    <button type="submit" class="bg-white text-gray-900 border-pink-400 border-2 px-4 py-2 rounded-3xl hover:bg-pink-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-300">
                        Back
                    </button>
                </router-link>
            <button type="submit" @click="sendOrder" class="bg-pink-600 text-white ml-2 px-4 py-2 rounded-3xl hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300">
                Place Order
            </button>
            </div>
        </div>
        </div>
    </form>


</template>

<script>
import axiosClient from '@/axios'

        export default {
        data(){
            return{
            addr:false,
            total: 0,
            quantity: {},
            products:[],
            qt: {},
            totals: {},
            cart:[],

            PaymentMethod: '',
            address: '',
            Phone: '',
            city: '',
        }
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        async sendOrder() {
        const order = {
        city: this.city,
        shipping_address: this.address,
        products: this.products.map(product => ({
            product_id: product.id,
            quantity: this.qt[product.id],
        })),
        };

        try {
        const response = await axiosClient.post('api/customer/orders', order);
        console.log(response.data);
        this.removeAllFromCart();
        this.$router.push('/thanks');
        } catch (error) {
        console.error(error);
        }
    },
        updateTotal(product) {
            if (this.qt[product.id] === 0) {
                this.qt[product.id] = 1;
            }
            console.log(product.quantity); 
            if (this.qt[product.id] > product.quantity) {
                this.qt[product.id] = product.quantity;
            }
            this.totals[product.id] = this.qt[product.id] * product.price;
            console.log(this.totals);
        },
        async fetchProducts() {
            this.products = [];
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            for (let id of cart) {
                let response = await axiosClient.get(`api/products/${id}`);
                this.products.push(response.data.data);
            }
            console.log(this.products);
            this.products.forEach(product => {
            this.qt[product.id] = 1;
            this.totals[product.id] = this.qt[product.id] * product.price;
            });

            this.finalTotal();
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
        removeAllFromCart() {
        localStorage.removeItem('cart'); // remove 'cart' from localStorage
        this.products = []; // remove all products from the products array
        this.totals = {}; // reset totals
        },
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