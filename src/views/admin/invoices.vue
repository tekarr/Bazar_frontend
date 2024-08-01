<template>



    <p class="text-2xl font-bold pt-16  pl-24 text-start ">Order : #{{ orders.id }}<br></p>


    <div ref="tableContainer" class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-10  mx-20 z-10 ">
        <table class="w-full text-base  text-gray-500 rounded-3xl  " >
            <thead class="bg-gray-800 " >
                <tr class="text-gray-50 text-center">
                    <td class="font-bold pt-5 w-60">Date placed</td>
                    <td class="font-bold pt-5  w-10">ID</td>
                    <td class="font-bold pt-5 w-40">Total amount</td>
                    <td class="w-4"></td>
                    <td class="font-bold pt-5 w-40">Order status</td>
                </tr>
                <tr class="text-gray-50 text-center">
                    <td class="font-normal  pb-5">{{ orders.created_at }}</td>
                    <td class="font-normal pb-5 ">{{ orders.id }}</td>
                    <td class="font-normal pb-5">${{ orders.order_total }}</td>
                    <td class="w-4"></td>
                    <td class="font-normal pb-5 text-white ">
                        {{ orders.order_status }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <div class="my-4 text-center font-bold text-lg"></div>   
                <tr class="text-center">
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3 w-80">
                        Store name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                        Status
                    </th>
                </tr>
                <tr class="border-b border-gray-200 text-center" v-for="product in orders.products" :key="product.id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                        {{ product.product_name }}
                    </th>
                    <td>
                        {{ product.store_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ product.price }}
                    </td>
                    <td class="px-6 py-4 bg-gray-50">
                        {{ product.quantity }}
                    </td>
                    <td>
                        {{product.product_status}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="flex justify-start">
    <!-- print -->
    <button @click="printTableAsPDF" class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-1 px-6 m-8 rounded-md">
        Print
    </button>
    
    </div>


</template>

<script>
import axiosClient from '@/axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
    export default {
        data(){
            return{
                orders:[],
                products:[],
                status:[
                'pending','ready_for_shipment', 'in_the_way' , 'delivered' , 'cancelled'
                ],
                product_status :['pending','in_stock']
            }
        },
        async created() {
            const id = this.$route.params.id;
            try {
            const response = await axiosClient.get(`api/admin/orders/${id}`);
            this.products = response.data.products;
            this.orders = response.data.data;
            //console.log(this.products);
            console.log(this.orders);
            //console.log(response.data);
            } catch (error) {
            console.error(`There was an error fetching the order: ${error}`);
            }
        },
        methods: {
        printTableAsPDF() {
        const tableContainer = this.$refs.tableContainer;
        const tableWidth = tableContainer.offsetWidth;
        const tableHeight = tableContainer.offsetHeight;

        const pdf = new jsPDF({
            orientation: 'portrait', // Set orientation to portrait
            unit: 'px',
            format: [tableWidth, tableHeight] // Set page size to match table size
        });

        html2canvas(tableContainer).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate the number of pages needed
            const pagesNeeded = Math.ceil(tableHeight / pdfHeight);

            for (let i = 0; i < pagesNeeded; i++) {
            // Add the image to the PDF, splitting it into multiple pages if necessary
            pdf.addImage(imgData, 'PNG', 0, i * pdfHeight, pdfWidth, pdfHeight);

            // Add a new page if necessary
            if (i < pagesNeeded - 1) {
                pdf.addPage();
            }
            }

            pdf.save("invoice.pdf");
        }).catch(error => {
            console.error("Error generating PDF", error);
        });
        }
    }
}

</script>

<style lang="scss" scoped>

</style>
