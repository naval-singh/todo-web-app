import axios from 'axios'
import store from '../redux/store'
import { baseUrl } from '../env.json'

const token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: token ? `Bearer ${token}` : null
    }
})

axiosInstance.interceptors.request.use((req) => {
    const { userDetails } = store.getState();
    if (userDetails.token) {
        req.headers.Authorization = `Bearer ${userDetails.token}`;
    }
    return req;
});

export default axiosInstance