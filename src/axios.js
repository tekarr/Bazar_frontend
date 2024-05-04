import Axios from 'axios';
import {csrf} from "@/store";

const axiosClient = Axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers:{
        // "x-Requested-With":"XMLHttpRequest",
        // "XSRF-TOKEN": Axios.get('http://localhost:8000/sanctum/csrf-cookie')
    },
    // withCredentials:true,
})
export default axiosClient;