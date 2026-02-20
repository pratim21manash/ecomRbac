import axios, { HttpStatusCode } from "axios"

const httpInterceptor = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true
})

export default HttpStatusCode