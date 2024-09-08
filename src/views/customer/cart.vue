<template>
<div class="flex-col">
    <div v-if="message" class="fixed top-4 right-4 z-50 min-w-[300px] max-w-md rounded-2xl bg-green-700 border border-gray-200 shadow-lg p-5">
    <div class="flex items-start">
        <div class="flex-shrink-0">
        <!-- Optional icon here -->
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
        <p class="text-sm font-medium text-white">{{ message }}</p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
        <button @click="message = ''" class="inline-flex text-white ">
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
        </div>
    </div>
    </div>
    <div v-if="errMsg" class="fixed top-4 right-4 z-50 min-w-[300px] max-w-md rounded-2xl  border bg-red-600 shadow-lg p-5">
    <div class="flex items-start">
        <div class="flex-shrink-0">
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
        <p class="text-sm font-medium text-white">{{ errMsg }}</p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
        <button @click="errMsg = ''" class="inline-flex text-white hover:text-gray-500">
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
        </div>
    </div>
    </div>

    <div v-if="showOtpInput" class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4 text-center">{{ $t('Confirm Payment') }}</h2>
        <p class="mb-4 text-gray-600 text-center">{{ $t('Enter the OTP code sent to your mobile number.') }}</p>

        <input
            v-model="otpCode"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-4"
            placeholder="Enter OTP code"
            maxlength="6"
            title="OTP code must be at least 4 digits long"
            minlength="4"
        />

        <button
            @click="confirmPayment"
            class="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-300"
        >
        {{ $t('Confirm Payment') }}
        </button>
    </div>
    </div>

    <div v-else>
    <!-- cart -->
    <div v-if="$route.path === '/cart'">
        <div  class="relative overflow-x-auto flex justify-center bg-gray-100 pt-28">
        <table class="w-3/4 text-sm overflow-hidden  text-left rtl:text-right text-gray-500  border-8 rounded-3xl m-10  bg-white">
            <thead class="text-xs text-gray-800 rounded-3xl ">
            <tr>
            <th scope="col" class="px-10 py-3 text-3xl p-5 font-semibold ">
                {{ $t('Shopping Cart') }}
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
                <p class="flex justify-start p-10">{{product.quantity}} {{ $t('available') }}</p>
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
                <button @click="removeFromCart(product.id)" class="font-medium text-base text-pink-600 focus:bg-gray-800  focus:text-white px-4 rounded-3xl no-underline">x</button>
                </td>
            </tr>
            </tbody>
            </transition-group>
        </table>
        </div>
        <!-- total -->
        <div>
        <div class="text-xl text-start mx-6 font-bold text-gray-900 pl-10 pb-5 pt-10 ">
            {{ $t('Subtotal') }} : <span>${{ finalTotal() }}</span>
            <p class="mt-0.5 text-sm text-gray-500">{{ $t('Shipping and taxes calculated at checkout.') }}</p>
        </div>
        <div class="flex justify-start items-center pl-10 pb-10">
            <div class="">
            <router-link to="/" class="flex items-center mr-5 rounded-3xl border-2 border-pink-300 bg-white px-10 py-3 text-base font-medium  text-gray-800 shadow-sm hover:bg-pink-600 hover:text-white">{{ $t('Continue Shopping') }}</router-link>
            </div>
            <div class="">

            <router-link  to="/customer/checkout" v-if="finalTotal() > 0" class="flex items-center mr-5 rounded-3xl border-2 border-pink-300 bg-white px-10 py-3 text-base font-medium text-gray-800 shadow-sm hover:bg-pink-600 hover:text-white">{{ $t('Checkout') }}</router-link>
            </div>
        </div>
        </div>
    </div>


    
    <!-- checkout -->
    <form v-if="$route.path === '/customer/checkout'" @submit.prevent="sendOrder" class="bg-gray-100 pt-20">


        <div class="w-full max-w-3xl mx-auto lg:p-28 md:p-28 sm:p-28">
        <div class="bg-white p-4 sm:p-8 rounded-3xl shadow-md border text-start">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            {{ $t('Checkout') }}
            </h1>
            <!-- User Info Section -->
            <div class="w-full max-w-xl mx-auto p-4 bg-white text-start">
            <h2 class=" font-semibold text-sky-950 mb-4">{{ $t('User Information') }}</h2>

            <div class="mb-3">
                <label class="block text-gray-600 font-medium">{{ $t('Phone') }}:</label>
                <p class="text-gray-800">{{ user.phone }}</p>
            </div>

            <div class="mb-3">
                <label class="block text-gray-600 font-medium">{{ $t('Address') }}:</label>
                <p class="text-gray-800">{{ user.address }}</p>
            </div>
            </div>

            <!-- Payment Information -->
            <div>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ $t('Payment Method') }}</h2>

            <!-- Payment Methods as Boxes -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div

                    @click="PaymentMethod = 'pay_on_deliver'"
                    :class="{'ring-2 ring-pink-500': PaymentMethod === 'pay_on_deliver'}"
                    class="flex items-center p-4 rounded-lg shadow-md border cursor-pointer transition-colors duration-300 bg-white"
                >
                <span class="text-gray-700 font-semibold">{{ $t('Pay on Delivery') }}</span>
                <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_on_deliver"
                    v-model="PaymentMethod"
                    class="hidden"
                />
                </div>
                <div
                    @click="PaymentMethod = 'localBankCards'"
                    :class="{'ring-2 ring-pink-500': PaymentMethod === 'localBankCards'}"
                    class="flex items-center p-4 rounded-lg shadow-md border cursor-pointer transition-colors duration-300 bg-white"
                >
                <span class="text-gray-700 font-semibold">{{ $t('localBankCards') }}</span>
                <input
                    type="radio"
                    name="paymentMethod"
                    value="localBankCards"
                    v-model="PaymentMethod"
                    class="hidden"
                />
                </div>

                <div
                    @click="PaymentMethod = 'Adfali'"
                    :class="{'ring-2 ring-pink-500': PaymentMethod === 'Adfali'}"
                    class="flex items-center p-4 rounded-lg shadow-md border cursor-pointer transition-colors duration-300 bg-white"
                >
                <span class="text-gray-700 font-semibold">{{ $t('Adfali') }}</span>
                <input
                    type="radio"
                    name="paymentMethod"
                    value="Adfali"
                    v-model="PaymentMethod"
                    class="hidden"
                />
                </div>

                <div
                    @click="PaymentMethod = 'Sadad'"
                    :class="{'ring-2 ring-pink-500': PaymentMethod === 'Sadad'}"
                    class="flex items-center p-4 rounded-lg shadow-md border cursor-pointer transition-colors duration-300 bg-white"
                >
                <span class="text-gray-700 font-semibold">{{ $t('Sadad') }}</span>
                <input
                    type="radio"
                    name="paymentMethod"
                    value="Sadad"
                    v-model="PaymentMethod"
                    class="hidden"
                />
                </div>


            </div>

            <hr class="my-6">

            <!-- Mobile Number Input for Adfali/Sadad -->
            <div v-if="PaymentMethod === 'Adfali' || PaymentMethod==='Sadad'" class="mt-4">
                <header class="mb-8 text-center">
                <h1 class="text-2xl font-bold mb-1">{{ $t('Mobile Number') }}</h1>
                <p class="text-[15px] text-slate-500">Enter Your {{ PaymentMethod }} Phone </p>
                </header>
                <input
                    v-model="Phone"
                    type="tel"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your mobile number"
                    pattern="09[0-9]{8}"
                    maxlength="10"
                    title="Phone number must be 10 digits long"
                />
            </div>
            </div>

            <!-- Buttons -->
            <div class="mt-8 flex justify-end">
            <router-link to="/cart">
                <button
                    type="submit"
                    class="bg-white text-gray-900 border-pink-400 border-2 px-4 py-2 rounded-3xl hover:bg-pink-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-300"
                >
                {{ $t('Back') }}
                </button>
            </router-link>
            <button
                type="submit"
                class="bg-pink-600 text-white mx-2 px-4 py-2 rounded-3xl hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300"
            >
                {{ $t('Place Order') }}
            </button>
            </div>
        </div>
        </div>



    </form>

    </div>
</div>




</template>

<script>
import axiosClient from '@/axios'
import {mapState} from "vuex";
import store from "@/store";

        export default {
        data(){
            return{
            orderResponse: {},
            message: '',
            errMsg: '',
            otpCode: '',
            showOtpInput: false,
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
            code: ['', '', '', ''],
            code2: ['', '', '', '', '', ''],
            variations:[]
        }
    },
        computed:{
        ...mapState('auth',['user']),
        },
    created() {
        this.fetchProducts();
        store.dispatch('fetchUser');

    }
    ,
    methods: {

    async sendOrder() {
        if (!this.PaymentMethod) {
        this.errMsg = 'Please select a payment method.';
        return;
        }

        if ((this.PaymentMethod === 'Adfali' || this.PaymentMethod === 'Sadad') && !this.Phone) {
        this.errMsg = 'Please enter your mobile number.';
        return;
        }

        const order = {
        payment_method: this.PaymentMethod,
        mobile_number: this.Phone,
        products: this.products.map(product => ({
            product_id: product.id,
            quantity: this.qt[product.id],
            variations: this.variations
        })),
        };

        try {
        const response = await axiosClient.post('api/customer/orders', order);
        this.message = response.data.message;
        this.orderResponse = response.data;

        if (this.PaymentMethod === 'localBankCards') {
            const redirectUrl = response.data.data.result.redirect_url;
            window.location.href = redirectUrl;
            this.removeAllFromCart();
            return;
        }

        if (this.PaymentMethod === 'Adfali' || this.PaymentMethod === 'Sadad') {
            this.showOtpInput = true;
        } else {
            this.removeAllFromCart();
            this.$router.push('/thanks');
        }
        } catch (error) {
        this.errMsg = error.response.data.message || 'Failed to send OTP.';
        console.error(error);
        }
    },

    async confirmPayment() {
        const paymentData = {
        process_id: this.orderResponse.processId.toString(),
        amount: this.finalTotal(),
        code: this.otpCode,
        };

        try {
        const confirmResponse = await axiosClient.post(`api/customer/payment/${this.PaymentMethod.toLowerCase()}/confirm`, paymentData);
        this.message = confirmResponse.data.message;
        this.showOtpInput = false;
        this.removeAllFromCart();
        this.$router.push('/thanks');
        } catch (error) {
        this.errMsg = error.response.data.error || 'An error occurred. Please try again.';

        console.error('Error confirming payment:', error);
        }
    },

    async placeOrder(otpCode = null) {
        const order = {
            payment_method: this.PaymentMethod,
            products: this.products.map(product => ({
                product_id: product.id,
                quantity: this.qt[product.id],
                variations: this.variations
            })),
        };


        try {
            const response = await axiosClient.post('api/customer/orders', order);
            console.log(response);

            if (this.PaymentMethod == 'localBankCards'){
                const redirectUrl = response.data.data.result.redirect_url;                ;
                window.location.href = redirectUrl;
                this.removeAllFromCart();
                return
            }

            if (otpCode) {
                const paymentData = {
                    process_id: response.data.processId.toString(),
                    amount: this.finalTotal(),
                    code: otpCode,
                };

                try {
                    const confirmResponse = await axiosClient.post(`api/customer/payment/${this.PaymentMethod.toLowerCase()}/confirm`, paymentData);
                    console.log(confirmResponse);
                    alert(confirmResponse.data.data.message);
                } catch (error) {
                    console.error('Error confirming payment:', error);
                }
            }

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
            for (let item of cart) {
                let productId = item.id;
                this.variations = item.variations;
                console.log(productId)
                console.log(this.variations)
                console.log("hi")
                try {
                    let response = await axiosClient.get(`api/products/${productId}`);
                    this.products.push(response.data.data);
                } catch (error) {
                    console.error("Error fetching products:", error);
                    localStorage.setItem('cart', null); // Set cart to null in case of an error
                    return; // Exit the function early
                }
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
            let index = cart.findIndex(item => item.id === productId);
            if (index > -1) {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            let productIndex = this.products.findIndex(product => product.id === productId);
            if (productIndex > -1) {
                this.products.splice(productIndex, 1);
                delete this.totals[productId]; // Remove the product's total from the totals object
                delete this.qt[productId]; // Remove the product's quantity from the qt object
            }
            this.finalTotal();
        },
        removeAllFromCart() {
        localStorage.removeItem('cart'); // remove 'cart' from localStorage
        this.products = []; // remove all products from the products array
        this.totals = {}; // reset totals
        },
        finalTotal() {
            return Object.values(this.totals).reduce((a, b) => a + b, 0).toFixed(2);
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