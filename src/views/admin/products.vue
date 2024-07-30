<template>


    <!-- products table -->
    <div class="relative overflow-x-auto p-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-700  rounded-3xl overflow-hidden">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3 text-start">
                        id
                    </th>
                    <th scope="col" class="px-6 py-3 text-start">
                        name
                    </th>
                    <th scope="col" class=" py-3 text-center">
                        Store
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        category
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        price
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id" class="bg-white " >
                    <td scope="row" class="px-6 py-8 font-medium text-base w-20">
                        {{product.id}}
                    </td>
                    <td scope="row" class="px-6 py-8  text-base w-60">
                        {{product.name}}
                    </td>
                    <td scope="row" class=" font-normal text-sm text-center">
                        {{product.store}}
                    </td>
                    <td class="px-6 text-center ">
                        {{ product.category }}
                    </td>
                    <td class="px-6 text-center ">
                        {{ product.price }} $
                    </td>
                </tr>
            </tbody>
        </table>


    </div>



</template>

<script>
import axiosClient from "@/axios";
export default {
data() {
    return {
        products:[],
    };
},
async created() {
try {
    const response = await axiosClient.get('api/admin/products');

    this.products = response.data.data;
    console.log(this.products);
    } catch (error) {
    console.error(error);
    }
},
methods: {
}
};
</script>

<style lang="scss" scoped>

</style>