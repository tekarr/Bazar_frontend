import {ref} from "vue";
import axiosClient from "@/axios";
import {useRouter} from "vue-router";

export default function useProducts() {
    const products = ref([]);
    const product = ref([]);
    const errors = ref({});
    const router = useRouter();
    const getProducts = async (count) => {
        await axiosClient.get('/products?page=${count}').then(response => {
            products.value = response.data.data;
            console.log('res:', response)
        })};
    const getProduct = async (id) => {
        const response = await axiosClient.get(`/products/`+id);
        product.value = response.data;
    };

    const storeProduct = async (product) => {
        try {
            await axiosClient.post('/products', product);
            return router.push({name:'index-vue'})
        }catch (e) {
            if (e.response.status === 422){
                errors.value = e.response.data.errors;

            }
            console.log(e)
        }
    }

    const updateProduct = async (id) => {
        try {
            await axiosClient.put(`/products/`+id, product.value);
            return router.push({name:'index-vue'})
        }catch (e) {
            if (e.response.status === 422){
                errors.value = e.response.data.errors;
            }
            console.log(e)
        }
    }

    const deleteProduct = async (id) => {
        if(!confirm('Are you sure you want to delete this product?')) return;
        await axiosClient.delete(`/products/${id}`);
        await getProducts();
    }

    return {
        products,
        product,
        errors,
        getProducts,
        getProduct,
        storeProduct,
        updateProduct,
        deleteProduct
    }
}