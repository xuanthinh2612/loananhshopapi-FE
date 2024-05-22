import axios from 'axios';
import { getToken } from '../service/authService';

// method will only be called once when the axios.create() function is executed.
const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

// Add a request interceptor
request.interceptors.request.use(
    (config) => {
        // Check if token exists in local storage
        const token = getToken();

        // If token exists, add it to the request headers
        if (token) {
            config.headers['Authorization'] = token;
        } else {
            // If token does not exist, remove the Authorization header
            delete config.headers['Authorization'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const get = async (path, options = {}) => {
    const responeData = await request.get(path, options);
    return responeData.data;
};
export const post = async (path, payload = {}) => {
    const responeData = await request.post(path, payload);
    return responeData.data;
};
export const updateRequest = async (path, payload = {}) => {
    const responeData = await request.put(path, payload);
    return responeData.data;
};
export const deleteRequest = async (path, payload = {}) => {
    const responeData = await request.delete(path, payload);
    return responeData.data;
};

export default request;
