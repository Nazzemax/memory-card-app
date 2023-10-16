import axios,
     { AxiosInstance } from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const apiUrl =
    process.env.NODE_ENV
    ? process.env.REACT_APP_API_URL_HEROKU
    : process.env.REACT_APP_API_URL_LOCAL

export const apiService: AxiosInstance = axios.create({
    baseURL:apiUrl,
    withCredentials:true
})