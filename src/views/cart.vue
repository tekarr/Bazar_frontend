<template>


    <navbarr/>

    <div class="relative overflow-x-auto flex justify-center bg-gray-300 pt-28 " >
        <table class="w-3/4 text-sm overflow-hidden  text-left rtl:text-right text-gray-500  border-8 rounded-3xl m-10  bg-gray-50">
            <thead class="text-xs text-gray-800 rounded-3xl ">
                <tr>
                    <th scope="col" class="px-10 py-3 text-3xl p-5 font-semibold">
                        Shopping Cart
                    </th>
                </tr>
            </thead>
            <tbody v-for="product in products" :key="product.id" class="hover:shadow-md">
                <tr class="bg-white border-b" @click="increaseQuantity(product)" >
                    <div class="flex justify-start items-center">
                        <td class="p-4">
                            <img :src="product.imageSrc" :alt="product.imageAlt" class="w-28 md:w-32 max-w-full max-h-full rounded-3xl" >
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-base font-medium text-gray-700 text-start ">{{ product.name }}</span><br>
                            <span class="text-gray-400 text-lg">{{ product.store }}</span>
                        </td>
                    </div>
                    <td>
                        <p class="flex justify-start p-10">{{product.stock}} available</p>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <div>
                                <input type="number" min="1" :max="product.stock" id="first_product" class="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-base rounded-xl focus:outline-none focus:ring focus:ring-pink-500 block px-2.5 py-1"
                                v-model="product.quantity" @click="increaseQuantity(product)"  placeholder="Qt" required />
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-700 ">
                        ${{ product.total }}
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-base text-pink-600 no-underline">Remove</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

        <div class="flex justify-center pb-10 p-5 ">
            <table>
                <tr>
                    <td class="text-lg text-start font-medium text-gray-900 p-5 "> 
                        Subtotal : <span>${{ totalPrice }}</span>
                        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    </td>
                </tr>
                <tr class="flex justify-center">
                    <td class="">
                        <router-link to="/" class="flex items-center mr-5 rounded-3xl border-2 border-pink-300 bg-white px-10 py-3 text-base font-medium  text-gray-800 shadow-sm hover:bg-pink-600 hover:text-white">Continue Shopping</router-link>
                    </td>
                    <td class="">
                        <router-link to="/checkout" class="flex items-center rounded-3xl border border-transparent bg-pink-600 px-10 py-3 mr-5 text-base font-medium text-white shadow-sm hover:bg-pink-700">Checkout</router-link>
                    </td>
                </tr>
            </table>
        </div>


</template>

<script>
import Navbarr from '@/components/Navbarr.vue'
import Footer2 from '@/components/footer2.vue'
        export default {
        components: { Navbarr, Footer2 },
        data(){
            return{
            total: 0,
            quantity: 0,
            selectedQuantity:0,
            unit:1,
            products:[
            {
                id: 1 ,
                name: 'Throwback Hip Bag',
                href: '#',
                store: 'Store name',
                price: 90.00,
                total:90.00,
                quantity: 1,
                stock:10,
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
                imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
            },
            {
                id: 2,
                name: 'Medium Stuff Satchel',
                href: '#',
                store: 'Store name',
                price: 32.00,
                total:32.00,
                quantity: 1,
                stock:5,
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
                imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            },
            {
                id: 3,
                name: 'Medium Stuff Satchel',
                href: '#',
                store: 'Store name',
                price: 32.00,
                quantity: 1,
                stock:3,
                total:32.00,
                imageSrc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
                imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            },
            {
                id: 4,
                name: 'Medium Stuff Satchel',
                href: '#',
                store: 'Store name',
                price: 32.00,
                quantity: 1,
                stock:6,
                total:32.00,
                imageSrc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
                imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            },
            {
                id: 5,
                name: 'Medium Stuff Satchel',
                href: '#',
                store: 'Store name',
                price: 32.00,
                quantity: 1,
                stock:9,
                total:32.00,
                imageSrc: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
                imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
            },
            ]
        }
    },
    methods: {
        increaseQuantity(product) { 
            if (product.quantity == 0 )
            { product.quantity = 1 }
            if ( product.quantity > product.stock)
            { product.quantity = product.stock }
            product.total = product.quantity * product.price
        },
    },
    computed: {
        totalPrice() {
        return this.products.reduce((total, product) => total + product.total, 0);
        },
    }
}
</script>

<style lang="scss" scoped>

</style>