import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_ADDRESS,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error).then(function () {
            // not called
        }, function (error) {
            console.error(error); // Stacktrace
        });
    },
);

api.interceptors.response.use(function (response) {
        return response;
}, function (error) {
        return Promise.reject(error);
});
