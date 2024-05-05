<template>
    
        <form @submit.prevent="submitForm" class="bg-gray-100">
    <div class="w-full max-w-3xl mx-auto lg:p-28 md:p-28 sm:p-28">
        <div class="bg-white p-4 sm:p-8 rounded-3xl shadow-md border text-start">

        <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

        <!-- Shipping Address -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h2>

            <div class="mt-4">
            <label for="address" class="block text-gray-700 mb-1">Address</label>
            <input type="text" id="address" v-model="address" class="w-full rounded-lg border py-2 px-3">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
                <label for="Phone" class="block text-gray-700 mb-1">Phone number</label>
                <input type="text" id="Phone" v-model="Phone" class="w-full rounded-lg border py-2 px-3">
            </div>
            <div class="mt-4 sm:mt-0">
                <label for="city" class="block text-gray-700 mb-1">City</label>
                <input type="text" id="city" v-model="city" class="w-full rounded-lg border py-2 px-3">
            </div>
            </div>
        </div>

        <!-- Payment Information -->
        <div>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Payment Method</h2>

            <div class="flex items-center mb-4">
            <input type="radio" name="paymentMethod" value="creditCard" v-model="PaymentMethod"
                class="mr-2 text-pink-600 w-5 h-5 rounded-full">
            <label for="creditCard" class="text-gray-700">Credit Card</label>
            </div>

            <div class="flex items-center">
            <input type="radio" name="paymentMethod" value="payOnDelivery" v-model="PaymentMethod"
                class="mr-2 text-pink-600 w-5 h-5 rounded-full">
            <label for="payOnDelivery" class="text-gray-700">Pay on Delivery</label>
            </div>

            <div v-if="PaymentMethod === 'creditCard'" class="mt-4">
            <div>
                <label for="card_number" class="block text-gray-700 mb-1">Card Number</label>
                <input type="text" id="card_number" class="w-full rounded-lg border py-2 px-3">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                <label for="exp_date" class="block text-gray-700 mb-1">Expiration Date</label>
                <input type="text" id="exp_date" class="w-full rounded-lg border py-2 px-3">
                </div>
                <div class="mt-4 sm:mt-0">
                <label for="cvv" class="block text-gray-700 mb-1">CVV</label>
                <input type="text" id="cvv" class="w-full rounded-lg border py-2 px-3">
                </div>
            </div>
            </div>
        </div>

        <div class="mt-8 flex justify-end">
            <router-link to="/cart" ><button type="submit" class="bg-white text-gray-900 border-pink-400 border-2  px-4 py-2 rounded-3xl hover:bg-pink-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-300">Back</button></router-link>
            <button type="submit" class="bg-pink-600 text-white ml-2 px-4 py-2 rounded-3xl hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300">Place Order</button>
        </div>
        </div>
    </div>
    </form>


</template>

<script>
    export default {
        data(){
            return{
                PaymentMethod: '',
                address:'',
                Phone:'',
                city:''
            }
        },
        methods: {
        submitForm() {
        // Perform form submission logic here
        console.log('order placed');
        console.log('address:', this.address);
        console.log('Phone:', this.Phone);
        console.log('city:', this.city);
        console.log('PaymentMethod:', this.PaymentMethod);
        
        }
    }
    }
</script>

<style lang="scss" scoped>

</style>