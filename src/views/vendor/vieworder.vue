<template>

  <p class="text-2xl font-bold pt-16 m-2  pl-6 text-start ">{{$t('Order')}} : #{{ order.id }}<br></p>

  <div class="grid grid-cols-1">
    <!-- print -->
    <button @click="printTableAsPDF" class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-1 px-6 my-4 w-80 h-10 ml-20 rounded-md">
      {{ $t('print') }}
    </button>

  </div>

  <div ref="tableContainer" class="relative overflow-x-auto rounded-3xl sm:rounded-lg mt-2  mx-5 z-10 ">
    <table class="w-full text-base py-6 text-gray-500 rounded-3xl  " >
      <thead class="bg-gray-800">
      <tr class="text-gray-50 text-center">
        <td></td>
        <td class="font-bold pt-5 w-10">{{ $t('ID') }}</td>
        <td class="font-bold pt-5 w-60">{{ $t('customer') }}</td>
        <td class="font-bold pt-5 w-80">{{ $t('Date placed') }}</td>
        <td class="font-bold pt-5 w-80">{{ $t('Total amount') }}</td>
        <td class="font-bold pt-5 w-60">{{ $t('order status') }}</td>
        <td class="w-4"></td>
      </tr>
      <tr class="text-gray-50 text-center">
        <td></td>
        <td class="font-normal pb-5">{{ order.id }}</td>
        <td class="font-normal pb-5">{{ order.user_phone }}</td>
        <td class="font-normal pb-5">{{ order.created_at }}</td>
        <td class="font-normal pb-5">${{ order.order_total }}</td>
        <td class="font-normal pb-5">{{ order.status }}</td>
        <td class="font-normal pb-5"></td>
      </tr>
      </thead>

      <tbody>
      <tr class="text-center">
        <th scope="col" class="px-6 py-3 w-10">
          {{ $t('ID') }}
        </th>
        <th scope="col" class="px-6 py-3 bg-gray-50">
          {{ $t('Product') }}
        </th>
        <th scope="col" class="px-6 py-3 w-80">
          {{ $t('Quantity') }}
        </th>
        <th scope="col" class="px-6 py-3">
          {{ $t('price') }}
        </th>
        <th scope="col" class="px-6 py-3 bg-gray-50">
          {{ $t('Total amount') }}
        </th>
        <th scope="col" class="px-6 py-3 bg-gray-50">
          {{ $t('Status') }}
        </th>
        <th scope="col" class="px-6 py-3">
          {{ $t('Variations') }}
        </th>
      </tr>

      <tr v-for="(product, index) in order.products" :key="product.product_id" class="border-b border-gray-200 text-center">
        <td class="font-normal pb-5">
          <router-link :to="{ name: 'EditProduct', params: { id: product.product_id } }" class='text-blue-500 hover:text-pink-700 hover:underline'>
            {{ product.product_id }}
          </router-link>
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
          {{ product.name }}
        </th>
        <td class="px-6 py-4">
          {{ product.quantity }}
        </td>
        <td class="px-8 py-4 bg-gray-50">
          ${{ product.price }}
        </td>
        <td class="px-8 py-4">
          ${{ product.quantity * product.price }}
        </td>
        <td class="px-6 py-4 bg-gray-50">
          {{ product.status }}
        </td>
        <td class="px-6 py-4">
          <div v-if="product.variations && product.variations.length">
            <ul>
              <li v-for="(variation, idx) in product.variations" :key="idx">
                <strong>{{ variation.name }}:</strong> {{ variation.value }}
              </li>
            </ul>
          </div>
          <div v-else>
            No variations
          </div>
        </td>
      </tr>
      </tbody>


    </table>
  </div>



</template>

<script>
import axiosClient from '@/axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {mapState} from "vuex";

export default {
  data() {
    return {
      // order: [],
      products: [],
      status: [
        'pending', 'ready_for_shipment', 'in_the_way', 'delivered', 'cancelled'
      ],
      product_status: ['pending', 'in_stock']
    }
  },
  computed: {
    ...mapState('vendor', ['order'])
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await axiosClient.get(`api/vendor/orders/${id}`);
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
  },
  mounted() {
  this.$store.dispatch('vendor/fetchOrder', this.$route.params.id);

  }
}

</script>

<style lang="scss" scoped>

</style>
