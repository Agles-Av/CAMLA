import axios from 'axios';
import { AlertHelper } from '../utilities/AlertHelper';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export const AxiosClient = axios.create({
    baseURL: SERVER_URL,
    withCredentials: false
});

AxiosClient.interceptors.request.use(
    (request)  => {
        if (request.data instanceof FormData) {
            console.log("Ano");
            
      // Axios va a poner el Content-Type correcto, incluyendo el boundary
    } else {
      // Si es un objeto normal, ponelo a mano
      console.log("JSON");
      
      request.headers['Content-Type'] = 'application/json';
    }
        request.headers['Accept'] = 'application/json';
        request.headers['Access-Control-Allow-Origin'] = '*'; // cambiar esto para produccion

        const session = localStorage.getItem('token') || null;
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

AxiosClient.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            AlertHelper.showAlert('Request successful', 'success');
        }
        return response;
    },
    (error) => {
         console.log("log en axios",error);
         
    const message = error.response?.data || 'Ocurrió un error inesperado.';
    AlertHelper.showAlert(message, 'error');
    return Promise.reject(error);
    }
);

export default AxiosClient