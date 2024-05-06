<template>


    <div class="flex justify-between p-10 mx-20 my-5">
        <h1 class="text-2xl font-bold ">Track Order #54879</h1>
        <p>Order placed March 22, 2021</p> 
    </div>

    <div class="  grid grid-cols-1 w-full gap-2  rounded-3xl py-4 ">
        <table class="w-fulll text-sm overflow-hidden  text-left rtl:text-right text-gray-500 rounded-3xl mx-20 bg-gray-100">
            <tr class="flex justify-between bg-gray-100 p-10  border-white" v-for="product in products" :key="product.id">
                <td>
                    <img :src="product.image" alt="" class="w-56 rounded-3xl" >
                </td>
                <td>
                    <p class="text-lg font-bold text-gray-700">{{product.name}}</p>
                    <p class="text-base  text-gray-700" >Store name</p><br>
                    <p class="w-32">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, iusto?</p>
                </td>
                <td>
                    <p class="text-lg font-bold text-gray-700">${{product.price}}</p><br>
                </td>
                <td>
                    <p class="text-lg font-bold text-gray-400">{{ product.state }}</p><br>
                </td>
                <td class="px-10" v-for="user in users" :key="user.id" >
                    <p class="text-lg font-bold text-gray-700 ">Delivery address</p>
                    <p>{{ user.Address }}</p>
                </td>
            </tr>
        </table>
        <div class="text-start p-1 mx-32 bg-white ">
            <div class="py-6"> Preparing to ship on March 24, 2021</div>

            <div class="bg-gray-200 rounded-3xl ">
                <div id="Processing" class="bg-pink-600 rounded-3xl text-pink-600 h-4 text-xs w-1/2 hidden ">.</div>
                <div id="Order placed" class="bg-pink-600 rounded-3xl text-pink-600 h-4 text-xs w-24  ">.</div>
                <div id="Order placed" class="bg-pink-600 rounded-3xl text-pink-600 h-4 text-xs w-full hidden ">.</div>
            </div>

            <div class="py-6 flex justify-between">
                <p class="font-bold">Order placed</p>
                <p class="">Processing</p>
                <p class="">Delivered</p>
            </div>
        </div>
    </div>

    <div class="flex justify-between p-20" >
        <p class="text-xl font-bold">Billing address</p>
        <p class="text-xl font-bold">Subtotal : 70</p>
    </div>


</template>

<script>
    export default {
        data(){
            return{
            products:[
                {
                    id:1,
                    name:'product name',
                    price:'35',
                    image:'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
                    desc:'',
                    state:'Order Placed'
                },
                    {
                    id:2,
                    name:'product name',
                    price:'35',
                    image:'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
                    desc:'',
                    state:'Order Placed'
                }
            ],
            users:[
                {
                    id:1,
                    Address:'tripoli , street ...',

                }
            ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>