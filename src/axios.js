import Axios from 'axios';

const axiosClient = Axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',


    },
    withCredentials:true,
    
})

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access - redirecting to login.');
            localStorage.removeItem('token');
        } else if (error.response && error.response.status === 403) {
            console.error('Forbidden access.');
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }


        return Promise.reject(error);
    }
);

export default axiosClient;