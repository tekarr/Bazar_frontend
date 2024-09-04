<template>



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
    <form v-if="$route.path === '/customer/checkout'" @submit.prevent="submitForm" class="bg-gray-100 pt-20">
        <div class="w-full max-w-3xl mx-auto lg:p-28 md:p-28 sm:p-28">
        <div class="bg-white p-4 sm:p-8 rounded-3xl shadow-md border text-start">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            {{ $t('Checkout') }}
            </h1>

            <!-- Payment Information -->
            <div>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">{{ $t('Payment Method') }}</h2>

            <!-- <div class="flex items-center mb-4">
                <input type="radio" name="paymentMethod" value="creditCard" v-model="PaymentMethod" class="mr-2 text-pink-600 w-5 h-5 rounded-full"/>
                <label for="creditCard" class="text-gray-700">Credit Card</label>
            </div> -->

            <div class="flex items-center mb-4">
                <input type="radio" name="localBankCards" value="localBankCards" v-model="PaymentMethod" class="mx-2 text-pink-600 w-5 h-5 rounded-full"/>
                <label for="localBankCards" class="text-gray-700">localBankCards</label>
            </div>

            <div class="flex items-center mb-4">
                <input type="radio" name="Adfali" value="Adfali" v-model="PaymentMethod" class="mx-2 text-pink-600 w-5 h-5 rounded-full"/>
                <label for="Adfali" class="text-gray-700">Adfali</label>
            </div>


            <div class="flex items-center mb-4">
                <input type="radio" name="Sadad" value="Sadad" v-model="PaymentMethod" class="mx-2 text-pink-600 w-5 h-5 rounded-full"/>
                <label for="Sadad" class="text-gray-700">Sadad</label>
            </div>

            <div class="flex items-center">
                <input type="radio" name="paymentMethod" value="pay_on_deliver" v-model="PaymentMethod" class="mx-2 text-pink-600 w-5 h-5 rounded-full"/>
                <label for="pay_on_deliver" class="text-gray-700">Pay on Delivery</label>
            </div>

            <hr class="my-6">

            <div v-if="PaymentMethod === 'Adfali'" class="mt-4">
                <header class="mb-8 text-center">
                    <h1 class="text-2xl font-bold mb-1">OTP Code</h1>
                    <p class="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
                </header>
                <div class="flex items-center justify-center gap-3">
                    <input v-model="code[0]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        pattern="\d*" maxlength="1" />
                    <input v-model="code[1]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />
                    <input v-model="code[2]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />
                    <input v-model="code[3]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />
                </div>
            </div>

            <div v-if="PaymentMethod === 'Sadad'" class="mt-4">
                <header class="mb-8 text-center">
                    <h1 class="text-2xl font-bold mb-1">OTP Code</h1>
                    <p class="text-[15px] text-slate-500">Enter the 6-digit verification code that was sent to your phone number.</p>
                </header>
                <div class="flex items-center justify-center gap-3">
                    <input v-model="code2[0]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        pattern="\d*" maxlength="1" />
                    <input v-model="code2[1]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />
                    <input v-model="code2[2]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />
                    <input v-model="code2[3]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />
                    <input v-model="code2[4]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />    
                    <input v-model="code2[5]"
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        maxlength="1" />  
                </div>
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
                        {{ $t('Back') }}
                    </button>
                </router-link>
            <button type="submit" @click="sendOrder" class="bg-pink-600 text-white mx-2 px-4 py-2 rounded-3xl hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300">
                {{ $t('Place Order') }}
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
    created() {
        this.fetchProducts();
    },
    methods: {

    async sendOrder() {
        let otpCode;
        console.log(this.PaymentMethod);
        if (this.PaymentMethod != 'pay_on_deliver' && this.PaymentMethod != 'localBankCards') {
            if (this.PaymentMethod == 'Adfali') {
                otpCode = this.code.join('');
                if (otpCode != 1111) {
                    alert('Invalid OTP code');
                    return;
                }
            } else {
                otpCode = this.code2.join('');
                if (otpCode != 111111) {
                    alert('Invalid OTP code');
                    return;
                }
            }
            this.placeOrder(otpCode);
        } else {
            this.placeOrder();
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
            }
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