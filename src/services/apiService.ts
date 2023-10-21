import axios,
{ AxiosInstance } from 'axios'

const apiUrl = import.meta.env.PROD
        ? import.meta.env.VITE_APP_API_URL_HEROKU
        : import.meta.env.VITE_APP_API_URL_LOCAL

console.log(import.meta.env.VITE_APP_API_URL_HEROKU)

export const apiService: AxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})