import { resetStoreAction } from '../actions/studentActions';
import store from '../store';
import * as httpRequest from '../utils/httpRequest';

export const login = async (usernameOrEmail, password) => {
    cleanUpSessionAndStorageData();
    store.dispatch(resetStoreAction());
    try {
        const res = await httpRequest.post('/api/auth/login', { usernameOrEmail, password });
        return res;
    } catch (error) {
        console.log('login errors!');
    }
};

export const loginBySNS = async ({ name, provider, photoUrl, usernameOrEmail }) => {
    cleanUpSessionAndStorageData();
    store.dispatch(resetStoreAction());

    try {
        const res = await httpRequest.post('/api/auth/loginBySNS', {
            name,
            provider,
            photoUrl,
            usernameOrEmail,
        });
        return res;
    } catch (error) {
        console.log('login errors!');
    }
};

export const registerAPICall = async (registerParamObj) => {
    cleanUpSessionAndStorageData();
    try {
        const res = await httpRequest.post('/api/auth/register', registerParamObj);
        return res;
    } catch (error) {
        console.log('register errors!');
    }
};

export const storeToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem('authenticatedUser', username);
    sessionStorage.setItem('role', role);
};

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem('authenticatedUser');

    if (username == null) {
        return false;
    } else {
        return true;
    }
};

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem('authenticatedUser');
    return username;
};

export const cleanUpSessionAndStorageData = () => {
    localStorage.clear();
    sessionStorage.clear();
};

export const isAdminUser = () => {
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const role = sessionStorage.getItem('role');
    if (role && role === ROLE_ADMIN) {
        return true;
    } else {
        return false;
    }
};
