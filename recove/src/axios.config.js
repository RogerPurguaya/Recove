import axios from 'axios';

export const DOMAIN_API = 'http://localhost:8000/'

const instance = axios.create({
    baseURL:  DOMAIN_API + 'api',
    headers: {'Access-Control-Allow-Origin': '*'}
});

export default instance;