<template>

    <navbarr/>

    <p class="text-2xl font-bold pt-48 pl-24 text-start ">Order history<br>
    </p>

<div class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-10  mx-20 ">
    <table class="w-full text-base text-left rtl:text-right text-gray-500 rounded-3xl mb-20 " v-for="order in orders" :key="order.id">
        <thead class="bg-gray-50 h-32" >
            <tr class="text-gray-700">
                <td class="font-bold pl-10 pt-5">Date placed</td>
                <td class="font-bold pt-5">Order number</td>
                <td class="font-bold pt-5">Total amount</td>
                <button rowspan="2" class="font-bold hover:bg-pink-700 bg-pink-600 text-white rounded-3xl mt-10 px-10 py-2">view invoice</button>
            </tr>
            <tr>
                <td class="font-normal pl-10 pb-5">{{ order.Dateplaced }}</td>
                <td class="font-normal pb-5 ">{{ order.number }}</td>
                <td class="font-normal pb-5">${{ order.Total }}</td>
                <td></td>
            </tr>
            <tr class="bg-white">.</tr>
        </thead>
        <thead class="text-base text-gray-700 uppercase">
            <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    info
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b border-gray-200"  v-for="product in products" :key="product.id">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                    {{ product.name }}
                </th>
                <td class="px-6 py-4">
                    {{ product.Price }}
                </td>
                <td class="px-6 py-4 bg-gray-50">
                    {{ product.Status }}
                </td>
                <td class="px-6 py-4" >
                    <router-link to="/product/:id" class="text-pink-600">view</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<script>
import Navbarr from '@/components/Navbarr.vue'
    export default {
    components: { Navbarr },
        data(){
            return{
                products:[
                    {
                        id:1,
                        name:'Apple MacBook Pro 17',
                        Price:'$2999',
                        Status:'Delivered Jan 25, 2021',
                    },
                    {
                        id:2,
                        name:'IPhone max pro',
                        Price:'$1999',
                        Status:'Delivered Jan 25, 2021',
                    }
                ],
                orders:[
                    {
                        id:1,
                        number:'WU88191111',
                        Dateplaced:'January 22, 2021',
                        Total:'238.00'
                    },
                    {
                        id:2,
                        number:'XGFH1234',
                        Dateplaced:'January 22, 2021',
                        Total:'100'
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>