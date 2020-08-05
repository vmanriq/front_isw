import axios from 'axios';

const endpoints = {
    development: '/api/v1/',
};

export const api = axios.create({
    baseURL: endpoints['development'],
    timeout: 20000,
});