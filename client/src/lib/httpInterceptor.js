import axios from "axios"

const httpInterceptor = axios.create({
    baseURL: 'http://localhost:8080/api', // Make sure this matches your backend port
    withCredentials: true
})

export default httpInterceptor