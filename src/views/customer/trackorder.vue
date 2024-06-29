<template>


    <div class="flex justify-center">
        <div class="flex justify-between w-3/4 my-5 mt-60 mx-72">
            <h1 class="text-2xl font-bold ">Track Order  #{{ order.id }}</h1>
            <p class=" text-pink-600">Order placed {{ order.created_at }}</p>
        </div>
    </div>
    

    <div class="flex justify-center">
        <div class="  grid grid-cols-1 w-3/4 gap-2  rounded-3xl py-4">
            

            <div class="text-start pt-4 mx-32 bg-white ">
                
                <div class="bg-gray-200 rounded-3xl h-2 ">
                    <div :class="getWidthClass(order.order_status)"  class="bg-pink-600 rounded-3xl text-pink-600 text-xs  h-2 flex justify-start items-center 
                    transform translate-x-100 translate-y-0 ">
                    </div>
                </div>


                <div class="py-6 flex justify-between">
                    <p>pending</p>
                    <p>processing</p>
                    <p>ready_for_shipment</p>
                    <p>shipped</p>
                    <p>delivered</p>
                </div>
            </div>
        </div>
    </div>


    <div class="flex justify-center p-10 ">
        <p class="text-xl font-bold pb-5 "> Order Status  <span class="p-2">|</span>  <span class=" text-pink-600">{{ order.order_status }}</span></p>
        <p class="text-xl font-bold pl-10"> Subtotal : {{ order.order_total }}</p>
    </div>

    <div class="flex justify-center cursor-pointer hover:text-pink-600">
        <router-link to="/customer/orders">Back</router-link>
    </div>

</template>

<script>
import axiosClient from '@/axios';

    export default {
        data(){
            return{
                order:[],
            }
        },
        async created() {
            const id = this.$route.params.id;
            try {
            const response = await axiosClient.get(`api/customer/orders/${id}`);
            this.order = response.data.data;
            console.log(this.order);
            //this.order.order_status = 'delivered'
            } catch (error) {
            console.error(`There was an error fetching the order: ${error}`);
            }
    },
    methods: {
    getWidthClass(status) {
        switch (status) {
            case 'pending':
            return 'w-[4%]';
            case 'processing':
            return 'w-[25%]';
            case 'ready_for_shipment':
            return 'w-[50%]';
            case 'shipped':
            return 'w-[75%]';
            case 'delivered':
            return 'w-[100%]';
            default:
            return 'w-[4%]';
        }
        },
    },
    }
</script>

<style lang="scss" scoped>

</style>