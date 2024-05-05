import Axios from 'axios';

const axiosClient = Axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers:{
        // "x-Requested-With":"XMLHttpRequest",
        // "XSRF-TOKEN": Axios.get('http://localhost:8000/sanctum/csrf-cookie')
    },
    // withCredentials:true,
})
axiosClient.defaults.withCredentials = true;
axiosClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosClient.defaults.headers.common['XSRF-TOKEN'] = Axios.get('http://localhost:8000/sanctum/csrf-cookie');
axiosClient.defaults.headers.common['Content-Type'] = 'application/json';
axiosClient.defaults.headers.common['Accept'] = 'application/json';

export default axiosClient;