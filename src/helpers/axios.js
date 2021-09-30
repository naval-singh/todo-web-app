import axios from 'axios'
import { baseUrl } from '../env.json'

const token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: token ? `Bearer ${token}` : null
    }
})

export default axiosInstance