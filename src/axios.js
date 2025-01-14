import axios from "axios";

export const jsonApi = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`
})