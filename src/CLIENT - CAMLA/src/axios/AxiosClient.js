import axios from 'axios';
import { AlertHelper } from '../utilities/AlertHelper';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export const AxiosCLient = axios.create({
    baseURL: SERVER_URL,
    withCredentials: false
});

AxiosCLient.interceptors.request.use(
    (request)  => {
        request.headers['Content-Type'] = 'application/json';
        request.headers['Accept'] = 'application/json';
        request.headers['Access-Control-Allow-Origin'] = '*'; // cambiar esto para produccion

        const session = JSON.parse(localStorage.getItem('token')) || null;
        if (session){
            request.headers['Authorization'] = `Bearer ${session}`;
        }
        return request;
    },
    (error) => {
        AlertHelper.showAlert('Error in request: ' + error.message, 'error');
        return Promise.reject(error);
    }
);

AxiosCLient.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            AlertHelper.showAlert('Request successful', 'success');
        }
        return response;
    },
    (error) => {
        //TODO
    }
);