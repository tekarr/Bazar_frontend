import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import axiosClient from "@/axios";

export default function  useUser() {
    const user = ref([]);
    const errors = ref({});
    const router = useRouter();

    const getCsrfToken = async () => {
        const response = await axiosClient.get('sanctum/csrf-cookie');
        return response.data.csrf_token;
    };


    const getUser = async (id) => {
        const response = await axios.get(`http://localhost:8000/user/`+id);
        user.value = response.data;
    };

    const storeUser = async (user) => {
        try {
            // Fetch CSRF token
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');


            // Make the POST request with the CSRF token included in headers
            await axios.post('http://localhost:8000/register', user.value);

            // Redirect to index
            return router.push({ name: 'index-vue' });
        } catch (e) {
            console.error(e);
        }
    };


    return {
        user,
        errors,
        getUser,
        storeUser
    }

}