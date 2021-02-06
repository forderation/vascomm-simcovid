import axios from 'axios';

const $axios = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default $axios;